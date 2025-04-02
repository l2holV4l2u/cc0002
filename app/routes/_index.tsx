import { AppSidebar } from "@components/custom/appsidebar";
import Timetable from "@components/custom/timetable";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@components/ui/resizable";
import { AppContext } from "@contexts/app";
import { useContext } from "react";

export default function Index() {
  const { selected, setSelected } = useContext(AppContext);
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={80}>
        <Timetable selected={selected} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20}>
        <AppSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
