export type Course = {
  code: string;
  name: string;
  index: string;
  au: number;
  color: string;
  schedule: { type: string; day: string; timeSlots: string[] }[];
};
