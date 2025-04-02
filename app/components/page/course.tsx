import { CourseCard } from "@components/custom/coursecard";
import { courses } from "@components/data/courses";
import { CourseType, TimetableType } from "@components/types";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { AppContext } from "@contexts/app";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { TabsContent } from "@radix-ui/react-tabs";
import { Search } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

export function CourseTab() {
  const { selectedCourse, setSelectedCourse, setCurShow, setShowCourse } =
    useContext(AppContext);
  const [search, setSearch] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.name.toLowerCase().includes(search.toLowerCase())
  );
  const addCourse = (course: CourseType) => {
    if (!selectedCourse.some((c) => c.code === course.code)) {
      setSelectedCourse([...selectedCourse, course]);
    }
    setSearch("");
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    let update: TimetableType[] = [];
    selectedCourse.map((course) => {
      course.schedule.map((schedule) => {
        const addTimetable: TimetableType = {
          id: course.code,
          color: course.color,
          label: course.code + " - " + schedule.type,
          date: schedule.date,
          from: schedule.from,
          to: schedule.to,
        };
        update.push(addTimetable);
      });
    });
    setShowCourse(update);
    setCurShow(update);
  }, [selectedCourse]);

  return (
    <TabsContent value="course">
      <div className="flex flex-col gap-4">
        {/* Search Bar with Popover */}
        <Popover open={isPopoverOpen}>
          <PopoverTrigger className="w-full">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Input
                placeholder="Search"
                className="flex-grow px-2 outline-none focus:ring-0 focus:border-transparent"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsPopoverOpen(true);
                }}
              />
              <Button variant="ghost" className="p-2">
                <Search size={18} />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className={`w-full p-2 bg-white shadow-lg border rounded-lg ${
              !isPopoverOpen ? "hidden" : ""
            }`}
            ref={popoverRef}
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course.code}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => addCourse(course)}
                >
                  {course.code} - {course.name}
                </div>
              ))
            ) : (
              <div className="text-gray-500 p-2">No courses found</div>
            )}
          </PopoverContent>
        </Popover>

        {/* Selected Courses */}
        <div>
          <div className="font-medium text-lg mb-2">Selected Courses</div>
          {selectedCourse.length > 0 ? (
            selectedCourse.map((course) => (
              <CourseCard
                key={course.code}
                course={course}
                selectedCourses={selectedCourse}
                setSelectedCourses={setSelectedCourse}
              />
            ))
          ) : (
            <div className="text-gray-500">No courses selected</div>
          )}
        </div>
      </div>
    </TabsContent>
  );
}
