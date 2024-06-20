"use client"
import { Book } from 'lucide-react';
import Image from 'next/image';
// import Image from 'next/image';
import React from 'react'

function CategoryItem({course}) {
  return (
    <div>
      <div
        className="border-2 rounded-lg p-3 cursor-pointer hover:border-green-400"
      >
        <Image
          src={course?.banner?.url}
          alt={course?.name}
          width={1000}
          height={500}
          className="rounded-lg"
        />
        <div>
          <h2 className="text-[18px] md:text-[16px] font-medium">
            {course?.name}
          </h2>
          <h2 className="text-gray-400 text-[14px]">{course?.author}</h2>
        </div>
        {course?.totalChapters ? (
          <div className="flex item-centre gap-2">
            <Book  className="h-6 w-6 text-green-800 rounded-full bg-green-200 p-1" />
            <h2 className="text-[14px] text-gray-400 ">
              {course.totalChapters} Chapters
            </h2>
          </div>
        ) : null}
        <h2 className="text-[16px] mt-2">{course?.free ? "Free" : "Paid"}</h2>
      </div>
    </div>
  );
}

export default CategoryItem