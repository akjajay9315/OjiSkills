"use client"
import React, { useEffect, useState } from 'react'
import ChapterNav from './_components/ChapterNav'
import FullVideoPlayer from './_components/FullVideoPlayer'
import { UserButton, useUser } from '@clerk/nextjs'
import { getCourseById,course,userCourse } from '@/app/_services';


function ViewCourse({params}){
    const {user} = useUser();
    const [course,setCourse]=useState([]);
    const [userCourse,setUserCourse] = useState();
    const [activeChapter,setActiveChapter]=useState();

    useEffect(()=>{
        user? getCourse():null;
    },[user])

    const getCourse=async()=>{
        await getCourseById(params?.courseId,
            user.primaryEmailAddress.emailAddress)
            .then(resp=>{
                console.log(resp);
                setCourse(resp.courseList);
                setUserCourse(resp.userEnrollCourses);
            })
        
    }
  return (
    course?.name && (
      <div className="flex">
        <div className="w-80 border shadow-sm h-screen">
          {course ? (
            <ChapterNav
              course={course}
              userCourse={userCourse}
              setActiveChapter={(chapter) => setActiveChapter(chapter)}
            />
          ) : null}
        </div>
        <div>
          <FullVideoPlayer activeChapter={activeChapter} />
        </div>
        <div className="p-4">
          <UserButton />
        </div>
      </div>
    )
  );
}

export default ViewCourse