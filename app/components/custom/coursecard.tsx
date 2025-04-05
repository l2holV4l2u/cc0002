import { CourseType } from "@components/types";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Dispatch, SetStateAction } from "react";
import { HiXMark } from "react-icons/hi2";
import { Link } from "@remix-run/react";

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
      className="flex justify-between items-center p-2 border rounded-lg mb-2 text-sm text-gray-500 bg-white relative"
    >
      <div className="flex flex-col gap-1">
        <div className="text-base text-gray-800 font-semibold">
          {course.code == course.name ? "Custom" : course.code}
        </div>
        <div>{course.name}</div>
        {course.index && <div>Index: {course.index}</div>}
        {course.au != 0 && <div>AU: {course.au}</div>}
        {course.announce && (
          <Link to={course.announce}>
            <Badge className="bg-red-500 text-white">Announcement</Badge>
          </Link>
        )}
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
