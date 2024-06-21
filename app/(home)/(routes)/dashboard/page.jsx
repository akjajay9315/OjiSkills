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

  useEffect(() => {
    if (user) {
      getUserCourse();
    }
  }, [user]);

  const getUserCourse = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      const resp = await GetUserCourseList(email);
      if (resp) {
        setUserCourseList(resp?.userEnrollCourses || []);
      }
    }
  };

  return (
    <div>
    <Welcomeback user={user}/>
      {userCourseList.length > 0 ? (
        <>
          <h2 className="text-[20px] font-medium">My Enrolled Courses:</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {userCourseList.map((course) => (
              <div
                key={course.courseList.id}
                onClick={() =>
                  router.push("/view-course/" + course.courseList.id)
                }
                className="cursor-pointer"
              >
                <CategoryItem course={course.courseList} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="flex justify-center items-center text-[22px] mt-[14rem] text-gray-500">
            You don't have any enrolled course.
          </h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
