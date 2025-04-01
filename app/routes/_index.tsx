import { AppSidebar } from "@components/custom/appsidebar";
import Timetable from "@components/custom/timetable";
import { Course } from "@types/course";
import { useState } from "react";

export default function Index() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  return (
    <div className="flex w-full h-screen">
      <Timetable selectedCourses={selectedCourses} />
      <AppSidebar
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
      />
    </div>
  );
}
