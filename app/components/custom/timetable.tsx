import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { days } from "@components/data/date";
import { AppContext } from "@contexts/app";
import { useContext } from "react";
import { BookType, CourseType, TimetableType } from "@components/types";

export default function Timetable() {
  const { curShow, setBook, book, tab, selectedCourse, setSelectedCourse } =
    useContext(AppContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [courseOverlay, setCourseOverlay] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TimetableType | null>(
    null
  );
  const [custom, setCustom] = useState<TimetableType | null>(null);
  const [purpose, setPurpose] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const handleFacilClick = (session: TimetableType) => {
    setSelectedSession(session);
    setOverlayVisible(true);
  };

  const handleCourseClick = (session: TimetableType) => {
    setCustom(session);
    setCourseOverlay(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;
    const newBooking: BookType = {
      location: selectedSession.label,
      color: selectedSession.color,
      date: selectedSession.date,
      time: selectedSession.from,
      purpose,
      remarks,
    };
    setPurpose("");
    setRemarks("");
    setBook([...book, newBooking]);
    setOverlayVisible(false);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseOverlay(false);
    if (!custom) return;
    const newEvent: CourseType = {
      code: custom.label,
      name: custom.label,
      index: "",
      au: 0,
      color: custom.color,
      schedule: [
        {
          type: "Custom",
          date: custom.date,
          from: custom.from,
          to: custom.to,
        },
      ],
    };
    setSelectedCourse([...selectedCourse, newEvent]);
  };

  return (
    <div className="p-6 w-full h-full overflow-auto">
      <Card>
        <CardContent>
          <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-2 text-center w-full">
            {/* Header Row */}
            <div className="font-bold p-2 border-b">Time</div>
            {days.map((day, index) => (
              <div key={index} className="font-bold p-2 border-b">
                {day}
              </div>
            ))}

            {/* Timetable Rows */}
            {Array.from({ length: 17 - 9 }, (_, i) => i + 9).map(
              (time, rowIndex) => {
                const displayTime = time > 12 ? time - 12 : time;
                const period = time >= 12 ? "PM" : "AM";

                return (
                  <div key={`row-${rowIndex}`} className="contents">
                    {/* Time Column */}
                    <div className="font-bold p-2 border-r border-gray-300">
                      {displayTime}
                      {period}
                    </div>

                    {/* Day Columns */}
                    {days.map((day, colIndex) => {
                      const session = curShow.find(
                        (val) =>
                          val.date === day && val.from <= time && time <= val.to
                      );

                      if (
                        session &&
                        curShow.some(
                          (val) => val.date === day && val.from === time
                        )
                      ) {
                        return (
                          <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`border p-2 rounded-md cursor-pointer flex items-center justify-center ${
                              session.color
                            } ${
                              tab == "facil" &&
                              "hover:opacity-90 hover:border-2 hover:border-black"
                            }`}
                            style={{
                              gridRow: `span ${session.to - session.from + 1}`,
                            }}
                            onClick={() =>
                              tab == "facil" && handleFacilClick(session)
                            }
                          >
                            {session.label}
                          </div>
                        );
                      }

                      if (
                        session &&
                        curShow.some(
                          (val) =>
                            val.date === day &&
                            val.from < time &&
                            time <= val.to
                        )
                      ) {
                        return null;
                      }

                      const customEvent: TimetableType = {
                        id: "custom" + rowIndex + colIndex,
                        color: "bg-teal-300",
                        label: "Custom Event",
                        date: days[colIndex],
                        from: time,
                        to: time,
                      };

                      return (
                        <div
                          key={`cell-${rowIndex}-${colIndex}`}
                          className="border p-2 h-20 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            tab == "course" && handleCourseClick(customEvent)
                          }
                        />
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>

      {/* Facil Overlay */}
      {overlayVisible && selectedSession && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-opacity-50 bg-black flex items-center justify-center"
          onClick={() => setOverlayVisible(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className="font-semibold">Purpose*</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-white"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="font-semibold">Booked For*</span>
                <p className="p-2 bg-gray-100 rounded">
                  PRABPON NARUESORN (naruesor001@e.ntu.edu.sg)
                </p>
              </label>

              <label className="block">
                <span className="font-semibold">Email*</span>
                <input
                  type="email"
                  className="w-full p-2 border rounded bg-gray-100"
                  value="naruesor001@e.ntu.edu.sg"
                  disabled
                />
              </label>

              <label className="block">
                <span className="font-semibold">Remarks</span>
                <textarea
                  className="w-full p-2 border rounded bg-white"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </label>

              <div className="space-y-2">
                <p className="font-semibold">Location:</p>
                <p>{selectedSession.label || "Unknown"}</p>
                <p className="mt-2">
                  {selectedSession?.date} {selectedSession.from}{" "}
                  {selectedSession.from > 12 ? "PM" : "AM"}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                  onClick={() => setOverlayVisible(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Overlay */}
      {courseOverlay && custom && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-opacity-50 bg-black flex items-center justify-center"
          onClick={() => setCourseOverlay(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create Custom Event</h2>
            <form onSubmit={handleEventSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className="font-semibold">Event Name*</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-white"
                  value={custom?.label}
                  onChange={(e) =>
                    setCustom({
                      ...custom,
                      label: e.target.value,
                    } as TimetableType)
                  }
                  required
                />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                  onClick={() => setCourseOverlay(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
