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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";

function CourseCard({
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

export function CourseTab() {
  const { selected, setSelected } = useContext(AppContext);
  const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.name.toLowerCase().includes(search.toLowerCase())
  );
  const addCourse = (course: CourseType) => {
    if (!selectedCourses.some((c) => c.code === course.code)) {
      setSelectedCourses([...selectedCourses, course]);
    }
    setSearch("");
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    const updatedSelect = [...selected].filter(
      (val) =>
        val.type != "course" ||
        (val.type == "course" &&
          selectedCourses.some((course) => course.code == val.id))
    );
    selectedCourses.map((course) => {
      if (!updatedSelect.some((val) => val.id == course.code)) {
        course.schedule.map((schedule) => {
          const addTimetable: TimetableType = {
            type: "course",
            id: course.code,
            color: course.color,
            label: course.code + " - " + schedule.type,
            date: schedule.date,
            from: schedule.from,
            to: schedule.to,
          };
          updatedSelect.push(addTimetable);
        });
      }
    });
    console.log(updatedSelect);
    setSelected(updatedSelect);
  }, [selectedCourses]);

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
    </TabsContent>
  );
}
