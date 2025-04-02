import { CourseType } from "@components/types";

export const courses: CourseType[] = [
  {
    code: "SC1005",
    name: "Digital Logic",
    index: "10017",
    au: 3,
    color: "bg-blue-200",
    schedule: [
      { type: "Lecture", date: "Monday", from: 9, to: 10 },
      { type: "Tutorial", date: "Wednesday", from: 13, to: 13 },
      { type: "Lab", date: "Friday", from: 15, to: 16 },
    ],
  },
  {
    code: "SC1006",
    name: "Computer Organization & Architecture",
    index: "10017",
    au: 3,
    color: "bg-green-300",
    schedule: [
      { type: "Lecture", date: "Tuesday", from: 10, to: 11 },
      { type: "Tutorial", date: "Thursday", from: 14, to: 14 },
      { type: "Lab", date: "Friday", from: 16, to: 16 },
    ],
  },
  {
    code: "SC1007",
    name: "Data Structure and Algorithm",
    index: "10017",
    au: 3,
    color: "bg-red-300",
    schedule: [
      { type: "Lecture", date: "Monday", from: 11, to: 12 },
      { type: "Tutorial", date: "Wednesday", from: 15, to: 15 },
    ],
  },
  {
    code: "SC1008",
    name: "C & C++ Programming",
    index: "10017",
    au: 3,
    color: "bg-yellow-300",
    schedule: [
      { type: "Lecture", date: "Tuesday", from: 9, to: 10 },
      { type: "Tutorial", date: "Thursday", from: 11, to: 11 },
    ],
  },
  {
    code: "SC2000",
    name: "Prob & Stat for Computing",
    index: "10017",
    au: 3,
    color: "bg-purple-300",
    schedule: [
      { type: "Lecture", date: "Wednesday", from: 10, to: 11 },
      { type: "Tutorial", date: "Friday", from: 14, to: 14 },
    ],
  },
];
