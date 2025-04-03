import {
  facilityCategories,
  facilityLocations,
  mockFacilityBookings,
} from "@components/data/facilities";
import { FacilType, BookType, TimetableType } from "@components/types";
import { Combobox } from "@components/ui/combobox";
import { Card } from "@/components/ui/card";
import { AppContext } from "@contexts/app";
import { TabsContent } from "@radix-ui/react-tabs";
import { useContext, useEffect, useState } from "react";

export function FacilityTab() {
  const { setShowBook, setCurShow, book } = useContext(AppContext);
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const temp = category && location ? mockFacilityBookings : [];
    setShowBook(temp);
    setCurShow(temp);
  }, [category, location]);

  useEffect(() => {
    setCategory("");
    setLocation("");
  }, [book]);

  function handleShowBook() {
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
    setShowBook(update);
    setCurShow(update);
  }

  return (
    <TabsContent
      value="facil"
      className="flex flex-col gap-4 w-full overflow-visible"
    >
      {/* Form Inputs */}
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Combobox
          options={facilityCategories}
          selected={category}
          setSelected={setCategory}
          placeholder="Select Category"
        />
      </div>
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <Combobox
          options={
            facilityLocations.filter(
              (location) => location.link === category
            ) as FacilType[]
          }
          selected={location}
          setSelected={setLocation}
          placeholder="Select Location"
        />
      </div>

      {/* Bookings Display */}
      <div className="w-full space-y-4">
        <h2 className="text-lg font-semibold">Your Bookings</h2>
        {book.length > 0 ? (
          <>
            <div className="text-sm text-gray-600">
              Click to see your booking timetable
            </div>
            {book.map((booking: BookType, index: number) => (
              <Card
                key={index}
                className="p-4 border shadow-md cursor-pointer"
                onClick={handleShowBook}
              >
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
            ))}
          </>
        ) : (
          <p className="text-sm text-gray-500">No bookings yet.</p>
        )}
      </div>
    </TabsContent>
  );
}
