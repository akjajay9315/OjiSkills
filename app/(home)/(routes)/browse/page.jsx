"use client";
import React, { useEffect, useState } from "react";
import CatagoryFilter from "./_components/CatagoryFilter";
import { getCourseList } from "@/app/_services";
import CourseList from "./_components/CourseList";

function Browse() {
  const [courses, setCourses] = useState([]);
  const [coursesOrg, setCoursesOrg] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList().then((resp) => {
      console.log(resp);
      setCourses(resp.courseLists);
      setCoursesOrg(resp.courseLists);
    });
  };

  const filterCourse = (catagory) => {
    if (catagory === "all") {
      setCourses(coursesOrg);
      return;
    }

    const filteredList = coursesOrg.filter((course) => {
      if (Array.isArray(course.tags)) {
        return course.tags.includes(catagory);
      } else if (typeof course.tags === "string") {
        return course.tags
          .split(",")
          .map((tags) => tags.trim())
          .includes(catagory);
      }
      return false;
    });
    setCourses(filteredList);
  };

  return (
    <div>
      <CatagoryFilter selectedCatagory={(catagory) => filterCourse(catagory)} />
      {courses ? <CourseList courses={courses} /> : null}
    </div>
  );
}

export default Browse;
