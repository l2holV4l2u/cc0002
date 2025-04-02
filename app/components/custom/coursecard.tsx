import { CourseType } from "@components/types";
import { Button } from "@components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { HiXMark } from "react-icons/hi2";

export function CourseCard({
  course,
  setSelectedCourses,
  selectedCourses,
}: {
  course: CourseType;
  selectedCourses: CourseType[];
  setSelectedCourses: Dispatch<SetStateAction<CourseType[]>>;
}) {
  const removeCourse = (courseCode: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.code !== courseCode));
  };

  return (
    <div
      key={course.index}
      className="flex justify-between items-center p-2 border rounded-lg mb-2 text-sm text-gray-500 bg-white"
    >
      <div>
        <div className="text-base text-gray-800 font-semibold">
          {course.code}
        </div>
        <div>{course.name}</div>
        <div>Index: {course.index}</div>
        <div>AU: {course.au}</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeCourse(course.code)}
      >
        <HiXMark size={16} />
      </Button>
    </div>
  );
}
