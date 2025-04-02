import { BookType, CourseType, TimetableType } from "@components/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const AppContext = createContext<{
  curShow: TimetableType[];
  setCurShow: Dispatch<SetStateAction<TimetableType[]>>;
  showCourse: TimetableType[];
  setShowCourse: Dispatch<SetStateAction<TimetableType[]>>;
  showBook: TimetableType[];
  setShowBook: Dispatch<SetStateAction<TimetableType[]>>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  book: BookType[];
  setBook: Dispatch<SetStateAction<BookType[]>>;
  selectedCourse: CourseType[];
  setSelectedCourse: Dispatch<SetStateAction<CourseType[]>>;
}>({
  curShow: [],
  setCurShow: () => {},
  showCourse: [],
  setShowCourse: () => {},
  showBook: [],
  setShowBook: () => {},
  tab: "course",
  setTab: () => {},
  book: [],
  setBook: () => {},
  selectedCourse: [],
  setSelectedCourse: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [curShow, setCurShow] = useState<TimetableType[]>([]);
  const [showCourse, setShowCourse] = useState<TimetableType[]>([]);
  const [showBook, setShowBook] = useState<TimetableType[]>([]);
  const [tab, setTab] = useState<string>("course");
  const [book, setBook] = useState<BookType[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseType[]>([]);

  return (
    <AppContext.Provider
      value={{
        curShow,
        setCurShow,
        showCourse,
        setShowCourse,
        showBook,
        setShowBook,
        tab,
        setTab,
        book,
        setBook,
        selectedCourse,
        setSelectedCourse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
