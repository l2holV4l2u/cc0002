import { AppSidebar } from "@components/custom/appsidebar";
import FloatingActionButton from "@components/custom/fab";
import Timetable from "@components/custom/timetable";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@components/ui/resizable";

export default function Index() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={75}>
        <Timetable />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <AppSidebar />
      </ResizablePanel>
      <FloatingActionButton />
    </ResizablePanelGroup>
  );
}
