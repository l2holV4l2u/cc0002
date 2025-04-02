import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/ui/sidebar";
import { Tabs, TabsList } from "@components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { FacilityTab } from "@components/page/facility";
import { CourseTab } from "@components/page/course";

export function AppSidebar() {
  return (
    <SidebarContent className="py-6 px-4 overflow-auto max-h-screen">
      <Tabs defaultValue="course" className="space-y-4">
        <TabsList className="grid w-full h-fit grid-cols-2 gap-2">
          <TabsTrigger value="course">
            <Button className="w-full bg-gray-600">Courses</Button>
          </TabsTrigger>
          <TabsTrigger value="facil">
            <Button className="w-full bg-gray-600">Facility</Button>
          </TabsTrigger>
        </TabsList>
        <CourseTab />
        <FacilityTab />
      </Tabs>
    </SidebarContent>
  );
}
