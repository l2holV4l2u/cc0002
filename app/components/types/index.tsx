export type TimetableType = {
  type: string;
  id: string; // code for course, and specific id for facility
  color: string;
  label: string;
  date: string;
  from: number;
  to: number;
};

export type CourseType = {
  code: string;
  name: string;
  index: string;
  au: number;
  color: string;
  schedule: {
    type: string;
    date: string;
    from: number;
    to: number;
  }[];
};
