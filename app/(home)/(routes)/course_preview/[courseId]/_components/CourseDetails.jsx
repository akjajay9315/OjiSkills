import { Book } from 'lucide-react';
import React from 'react'

function CourseDetails({courseDetail}) {
  return (
    <div className="mt-5 p-5 rounded-lg border-2">
      <h2 className="text-[20px] font-medium">{courseDetail.name}</h2>
      <div className="flex item-centre gap-2">
        <Book className="h-6 w-6 text-green-800 rounded-full bg-green-200 p-1" />
        <h2 className="text-[14px] text-gray-400 ">
          {courseDetail.totalChapters} Chapters
        </h2>
      </div>
      <p className='line-clamp-4 mt-4 text-gray-400 '>{courseDetail.discription}</p>
    </div>
  );
}

export default CourseDetails