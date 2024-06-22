"use client";
import React, { useEffect, useState } from "react";
import { GetUserCourseList } from "@/app/_services";
import { useUser } from "@clerk/nextjs";
import CategoryItem from "../../_components/CategoryItem";
import { useRouter } from "next/navigation"; // Use useRouter from 'next/router' instead of 'next/navigation'
import Welcomeback from "./_components/Welcomeback";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [userCourseList, setUserCourseList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

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
    } finally {
      setLoading(false); // Update loading state regardless of success or failure
    }
  };

  const handleCourseClick = (courseId) => {
    router.push("/view-course/" + courseId);
  };

  return (
    <div>
      <Welcomeback user={user} />
      {error && <div className="text-red-500 text-center mt-10">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          {/* Loading spinner or placeholder */}
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : userCourseList.length > 0 ? (
        <>
          <h2 className="text-2xl font-medium text-center my-5">
            My Enrolled Courses:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {userCourseList.map((course, index) => (
              <div
                key={index}
                onClick={() => handleCourseClick(course?.courseList?.id)}
                className="cursor-pointer border rounded-xl overflow-hidden shadow-md hover:shadow-lg"
              >
                <CategoryItem course={course?.courseList} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-40">
          <h2 className="text-xl text-gray-500">
            You don't have any enrolled courses.
          </h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
