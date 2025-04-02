import { TimetableType } from "@components/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const AppContext = createContext<{
  selected: TimetableType[];
  setSelected: Dispatch<SetStateAction<TimetableType[]>>;
}>({
  selected: [],
  setSelected: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<TimetableType[]>([]);
  return (
    <AppContext.Provider value={{ selected, setSelected }}>
      {children}
    </AppContext.Provider>
  );
}
