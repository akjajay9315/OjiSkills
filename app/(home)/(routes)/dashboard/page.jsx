"use client";
import React, { useEffect, useState } from "react";
import { GetUserCourseList } from "@/app/_services";
import { useUser } from "@clerk/nextjs";
import CategoryItem from "../../_components/CategoryItem";
import { useRouter } from "next/navigation";
import Welcomeback from "./_components/Welcomeback";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [userCourseList, setUserCourseList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getUserCourse();
    }
  }, [user]);

  const getUserCourse = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (email) {
        const resp = await GetUserCourseList(email);
        console.log("Response from GetUserCourseList:", resp);
        if (resp && resp.userEnrollCourses) {
          setUserCourseList(resp.userEnrollCourses);
        } else {
          setError("No enrolled courses found.");
        }
      }
    } catch (err) {
      console.error("Error fetching user courses:", err);
      setError("Failed to load user courses.");
    }
  };

  const handleCourseClick = (courseId) => {
    router.push("/view-course/" + courseId);
  };

  return (
    <div>
      <Welcomeback user={user} />
      {userCourseList? 
        <>
          <h2 className="text-[20px] font-medium">My Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
            {userCourseList && userCourseList.map((course) => (
              <div
                key={course?.courseList?.id}
                onClick={() => handleCourseClick(course?.courseList?.id)}
                className="cursor-pointer"
              >
                <CategoryItem course={course?.courseList} />
              </div>
            ))}
          </div>
        </>
       : (
        <div className="flex justify-center items-center text-[20px] mt-20 text-gray-500">
          <h2>You don't have any course enrolled.</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
