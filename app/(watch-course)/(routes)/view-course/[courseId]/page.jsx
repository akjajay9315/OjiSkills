// ViewCourse.js
"use client";
import React, { useEffect, useState } from "react";
import ChapterNav from "./_components/ChapterNav";
import FullVideoPlayer from "./_components/FullVideoPlayer";
import { UserButton, useUser } from "@clerk/nextjs";
import { getCourseById } from "@/app/_services";

function ViewCourse({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [userCourse, setUserCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    if (user) {
      getCourse();
    }
  }, [user]);

  const getCourse = async () => {
    try {
      const resp = await getCourseById(
        params?.courseId,
        user.primaryEmailAddress.emailAddress
      );
      console.log(resp);
      setCourse(resp.courseList);
      setUserCourse(resp.userEnrollCourses);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* UserButton */}
      <div className="p-4">
        <UserButton />
      </div>
      {/* Video Player */}
      <div className="w-full lg:flex-1">
        <FullVideoPlayer activeChapter={activeChapter} />
      </div>

      {/* ChapterNav */}
      <div className="w-full lg:w-80 border shadow-sm lg:h-screen overflow-y-auto">
        {course && (
          <ChapterNav
            course={course}
            userCourse={userCourse}
            setActiveChapter={setActiveChapter}
          />
        )}
      </div>
    </div>
  );
}

export default ViewCourse;
