"use client"
import { PauseCircle, PlayCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";

function ChapterNav({ course, userCourse,setActiveChapter }) {
    const [activeIndex,setActiveIndex]=useState(0);
    useEffect(()=>{
        setActiveChapter(course?.chapters[0])
    },[])
  return (
    <div>
      <div className="border-b p-5">
        <h2 className="font-medium text-[20px]">{course?.name}</h2>
        <h2 className="text-gray-500 text-[14px]">By {course?.author}</h2>
      </div>
      <div>
        {course?.chapters && course.chapters.length > 0 ? (
          course.chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => {setActiveIndex(index);
              setActiveChapter(chapter)}}
              className={`flex text-gray-500 gap-2 
            text-[16px] p-4 px-5 cursor-pointer
            hover:bg-gray-200 
            ${activeIndex == index ? "bg-green-200 text-green-700 " : null}`}
            >
              {activeIndex == index ? (
                <PauseCircle />
              ) : (
                <PlayCircle />
              )}
              <h2 className="text-[16px]">{chapter.name}</h2>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No chapters available.</div>
        )}
      </div>
    </div>
  );
}

export default ChapterNav;
