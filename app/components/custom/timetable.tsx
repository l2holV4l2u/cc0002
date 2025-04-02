import { Card, CardContent } from "@/components/ui/card";
import { TimetableType } from "@components/types";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Timetable({ selected }: { selected: TimetableType[] }) {
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
            {Array.from({ length: 16 - 9 }, (_, i) => i + 9).map(
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
                      const session = selected.find(
                        (val) =>
                          val.date === day && val.from <= time && time <= val.to
                      );

                      // If this slot is the start of a session, calculate rowSpan
                      if (
                        session &&
                        selected.some(
                          (val) => val.date === day && val.from === time
                        )
                      ) {
                        return (
                          <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`border p-2 rounded-md cursor-pointer flex items-center justify-center ${session.color}`}
                            style={{
                              gridRow: `span ${session.to - session.from + 1}`,
                            }}
                          >
                            {session.label}
                          </div>
                        );
                      }

                      // If this slot is within a merged session, return null (don't render duplicate cells)
                      if (
                        session &&
                        selected.some(
                          (val) =>
                            val.date === day &&
                            val.from < time &&
                            time <= val.to
                        )
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={`cell-${rowIndex}-${colIndex}`}
                          className="border p-2 h-20 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
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
    </div>
  );
}
