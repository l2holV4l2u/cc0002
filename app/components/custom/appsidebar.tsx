import { useState, useRef, Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiXMark } from "react-icons/hi2";
import { Course } from "@types/course";

function CourseCard({
  course,
  setSelectedCourses,
  selectedCourses,
}: {
  course: Course;
  selectedCourses: Course[];
  setSelectedCourses: Dispatch<SetStateAction<Course[]>>;
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

const courses: Course[] = [
  {
    code: "SC1005",
    name: "Digital Logic",
    index: "10017",
    au: 3,
    color: "bg-blue-200",
    schedule: [
      { type: "Lecture", day: "Monday", timeSlots: ["9 AM", "10 AM"] },
      { type: "Tutorial", day: "Wednesday", timeSlots: ["1 PM"] },
      { type: "Lab", day: "Friday", timeSlots: ["3 PM", "4 PM"] },
    ],
  },
  {
    code: "SC1006",
    name: "Computer Organization & Architecture",
    index: "10017",
    au: 3,
    color: "bg-green-300",
    schedule: [
      { type: "Lecture", day: "Tuesday", timeSlots: ["10 AM", "11 AM"] },
      { type: "Tutorial", day: "Thursday", timeSlots: ["2 PM"] },
      { type: "Lab", day: "Friday", timeSlots: ["4 PM"] },
    ],
  },
  {
    code: "SC1007",
    name: "Data Structure and Algorithm",
    index: "10017",
    au: 3,
    color: "bg-red-300",
    schedule: [
      { type: "Lecture", day: "Monday", timeSlots: ["11 AM", "12 PM"] },
      { type: "Tutorial", day: "Wednesday", timeSlots: ["3 PM"] },
    ],
  },
  {
    code: "SC1008",
    name: "C & C++ Programming",
    index: "10017",
    au: 3,
    color: "bg-yellow-300",
    schedule: [
      { type: "Lecture", day: "Tuesday", timeSlots: ["9 AM", "10 AM"] },
      { type: "Tutorial", day: "Thursday", timeSlots: ["11 AM"] },
    ],
  },
  {
    code: "SC2000",
    name: "Prob & Stat for Computing",
    index: "10017",
    au: 3,
    color: "bg-purple-300",
    schedule: [
      { type: "Lecture", day: "Wednesday", timeSlots: ["10 AM", "11 AM"] },
      { type: "Tutorial", day: "Friday", timeSlots: ["2 PM"] },
    ],
  },
];

export function AppSidebar({
  selectedCourses,
  setSelectedCourses,
}: {
  selectedCourses: Course[];
  setSelectedCourses: Dispatch<SetStateAction<Course[]>>;
}) {
  const [search, setSearch] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCourse = (course: Course) => {
    if (!selectedCourses.some((c) => c.code === course.code)) {
      setSelectedCourses([...selectedCourses, course]);
    }
    setSearch("");
    setIsPopoverOpen(false);
  };

  return (
    <Sidebar side="right">
      <SidebarContent>
        <div className="flex flex-col p-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b">
            <div className="flex items-center text-primary">2024 Sem 2</div>
          </div>

          {/* Search Bar with Popover */}
          <Popover open={isPopoverOpen}>
            <PopoverTrigger className="w-full">
              <div className="flex items-center mt-4 border rounded-lg overflow-hidden">
                <Input
                  placeholder="Search"
                  className="flex-grow px-2"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsPopoverOpen(e.target.value.length > 0);
                  }}
                />
                <Button variant="ghost" className="p-2">
                  <Search size={18} />
                </Button>
              </div>
            </PopoverTrigger>
            {isPopoverOpen && search && (
              <PopoverContent
                className="w-full p-2 bg-white shadow-lg border rounded-lg"
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
            )}
          </Popover>

          {/* Selected Courses */}
          <div className="mt-4">
            <div className="font-medium text-lg mb-2">Selected Courses</div>
            {selectedCourses.length > 0 ? (
              selectedCourses.map((course) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  selectedCourses={selectedCourses}
                  setSelectedCourses={setSelectedCourses}
                />
              ))
            ) : (
              <div className="text-gray-500">No courses selected</div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
