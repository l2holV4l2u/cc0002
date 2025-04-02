import Timetable from "@components/custom/timetable";
import {
  facilityCategories,
  facilityLocations,
  FacilType,
  mockFacilities,
} from "@components/data/facilities";
import { TimetableType } from "@components/types";
import { Card } from "@components/ui/card";
import { Combobox } from "@components/ui/combobox";
import { Input } from "@components/ui/input";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";

export function FacilityTab() {
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [capacity, setCapacity] = useState<string>("");
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<TimetableType[] | null>(null);
  const [day, setDay] = useState<string | null>(null);

  return (
    <TabsContent
      value="facil"
      className="flex flex-col gap-4 w-full overflow-visible"
    >
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
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Capacity
        </label>
        <Input
          type="number"
          placeholder="Enter Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      {category && location && (
        <>
          <h3 className="text-lg font-semibold">Facility Details:</h3>
          {mockFacilities.map((fac, index) => (
            <Card
              key={index}
              className="p-2 hover:scale-[1.02] transition-all cursor-pointer"
              onClick={() => {
                setPopoverOpen(true);
                const prepFacil: TimetableType[] = [];
              }}
            >
              <div>Status: {fac.status}</div>
              <div>Available From: {fac.from}</div>
              <div>Available To: {fac.to}</div>
              <div>Remarks: {fac.remarks}</div>
              <div>Access: {fac.access}</div>
            </Card>
          ))}
        </>
      )}

      {isPopoverOpen && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full h-full bg-white flex justify-center items-center">
            <button
              className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded"
              onClick={() => setPopoverOpen(false)}
            >
              Close
            </button>
            <Timetable selected={selected} />
          </div>
        </div>
      )}
    </TabsContent>
  );
}
