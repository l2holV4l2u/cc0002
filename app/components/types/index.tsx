export type TimetableType = {
  id: string;
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
  announce?: string;
};

export type BookType = {
  location: string;
  color: string;
  date: string;
  time: number;
  purpose: string;
  remarks: string;
};

export type FacilType = { value: string; link?: string; label: string };
