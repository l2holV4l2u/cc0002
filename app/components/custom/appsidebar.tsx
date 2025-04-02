import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/ui/sidebar";
import { Tabs, TabsList } from "@components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { FacilityTab } from "@components/page/facility";
import { CourseTab } from "@components/page/course";
import { useContext } from "react";
import { AppContext } from "@contexts/app";
import { SummaryTab } from "@components/page/sum";
import { TimetableType } from "@components/types";

export function AppSidebar() {
  const { setTab, setCurShow, showCourse, showBook, book, selectedCourse } =
    useContext(AppContext);

  function handleCombine() {
    let update: TimetableType[] = [];
    book.map((item) => {
      const addTimetable: TimetableType = {
        id: item.location,
        color: item.color,
        label: item.location + " - " + item.purpose,
        date: item.date,
        from: item.time,
        to: item.time,
      };
      update.push(addTimetable);
    });
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
    setCurShow(update);
  }

  return (
    <SidebarContent className="py-6 px-4 overflow-auto max-h-screen">
      <Tabs defaultValue="course" className="space-y-4">
        <TabsList className="grid w-full h-fit grid-cols-3 gap-2">
          <TabsTrigger value="summary">
            <Button
              className="w-full bg-gray-600"
              onClick={() => {
                setTab("summary");
                handleCombine();
              }}
            >
              Summary
            </Button>
          </TabsTrigger>
          <TabsTrigger value="course">
            <Button
              className="w-full bg-gray-600"
              onClick={() => {
                setTab("course");
                setCurShow(showCourse);
              }}
            >
              Courses
            </Button>
          </TabsTrigger>
          <TabsTrigger value="facil">
            <Button
              className="w-full bg-gray-600"
              onClick={() => {
                setTab("facil");
                setCurShow(showBook);
              }}
            >
              Facility
            </Button>
          </TabsTrigger>
        </TabsList>
        <SummaryTab />
        <CourseTab />
        <FacilityTab />
      </Tabs>
    </SidebarContent>
  );
}
