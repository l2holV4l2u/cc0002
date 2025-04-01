import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@types/course";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
];

export default function Timetable({
  selectedCourses,
}: {
  selectedCourses: Course[];
}) {
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
            {timeSlots.map((slot, rowIndex) => (
              <div key={`row-${rowIndex}`} className="contents">
                {/* Time Column */}
                <div className="font-bold p-2 border-r border-gray-300">
                  {slot}
                </div>

                {/* Day Columns */}
                {days.map((day, colIndex) => {
                  const courseSession = selectedCourses.find((course) =>
                    course.schedule.some(
                      (session) =>
                        session.day === day && session.timeSlots.includes(slot)
                    )
                  );

                  // If this slot is the start of a session, calculate rowSpan
                  if (
                    courseSession &&
                    courseSession.schedule.some(
                      (session) =>
                        session.day === day && session.timeSlots[0] === slot // Start of a block
                    )
                  ) {
                    const session = courseSession.schedule.find(
                      (s) => s.day === day && s.timeSlots[0] === slot
                    );
                    const rowSpan = session ? session.timeSlots.length : 1;

                    return (
                      <div
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={`border p-2 rounded-md cursor-pointer flex items-center justify-center ${courseSession.color}`}
                        style={{ gridRow: `span ${rowSpan}` }}
                      >
                        {session?.type} - {courseSession.name}
                      </div>
                    );
                  }

                  // If this slot is within a merged session, return null (don't render duplicate cells)
                  if (
                    selectedCourses.some((course) =>
                      course.schedule.some(
                        (session) =>
                          session.day === day &&
                          session.timeSlots.includes(slot) &&
                          session.timeSlots[0] !== slot
                      )
                    )
                  ) {
                    return null;
                  }

                  return (
                    <div
                      key={`cell-${rowIndex}-${colIndex}`}
                      className="border p-2 h-24 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                      -
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
