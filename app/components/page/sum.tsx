import { CourseCard } from "@components/custom/coursecard";
import { BookType } from "@components/types";
import { Card } from "@components/ui/card";
import { AppContext } from "@contexts/app";
import { TabsContent } from "@radix-ui/react-tabs";
import { useContext } from "react";

export function SummaryTab() {
  const { book, selectedCourse, setSelectedCourse } = useContext(AppContext);

  return (
    <TabsContent value="summary" className="flex flex-col gap-6 w-full">
      {/* Selected Courses */}
      <div>
        <div className="font-medium text-lg mb-2">Selected Courses</div>
        {selectedCourse.length > 0 ? (
          selectedCourse.map((course) => (
            <CourseCard
              key={course.code}
              course={course}
              selectedCourses={selectedCourse}
              setSelectedCourses={setSelectedCourse}
            />
          ))
        ) : (
          <div className="text-gray-500">No courses selected</div>
        )}
      </div>

      {/* Facility Bookings */}
      <div className="w-full space-y-4">
        <h2 className="text-lg font-semibold">Your Bookings</h2>
        {book.length > 0 ? (
          book.map((booking: BookType, index: number) => (
            <Card key={index} className="p-4 border rounded shadow-md">
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {booking.location || "Unknown"}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {booking.date}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {booking.time}{" "}
                {booking.time >= 12 ? "PM" : "AM"}
              </p>
              <p>
                <span className="font-semibold">Purpose:</span>{" "}
                {booking.purpose}
              </p>
              <p>
                <span className="font-semibold">Remarks:</span>{" "}
                {booking.remarks || "None"}
              </p>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No bookings yet.</p>
        )}
      </div>
    </TabsContent>
  );
}
