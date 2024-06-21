import React from "react";
import Image from "next/image";
import { Book } from "lucide-react";
import Link from "next/link";
import CoursePreview from "../../course_preview/[courseId]/page";
import CategoryItem from "@/app/(home)/_components/CategoryItem";

function CourseList({ courses }) {
  return (
    <div
      className="mt-5 grid grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-3
    gap-5"
    >
      {courses.map((course, index) => (
        <Link href={'/course_preview/'+ course.id} key={index}> 
        <CategoryItem course={course}/>
        </Link>
      ))}
    </div>
  );
}

export default CourseList;
