import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, intitalValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof intitalValue === "function") {
      return (intitalValue as () => T)();
    } else {
      return intitalValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue] as [typeof value, typeof setValue];
}
