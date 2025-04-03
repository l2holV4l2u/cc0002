import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone, MessageSquare } from "lucide-react";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-12 h-12 flex justify-center items-center"
            onClick={() =>
              (window.location.href =
                "https://docs.google.com/forms/d/e/1FAIpQLSeRruwXSS3wnTIMNQDa8eARZogFIGxEyFfK31C4RjVYkFim9g/viewform?usp=header")
            }
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            className="w-12 h-12 flex justify-center items-center"
            onClick={() =>
              (window.location.href =
                "https://ntulearn.ntu.edu.sg/ultra/institution-page")
            }
          >
            <Megaphone className="w-6 h-6" />
          </Button>
        </div>
      )}
      <button
        className={`w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center shadow-lg transition-transform duration-200 ${
          isOpen ? "rotate-45" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
