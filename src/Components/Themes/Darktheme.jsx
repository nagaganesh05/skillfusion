import { useEffect } from "react";

export default function DarkTheme() {
  useEffect(() => {
   
    document.body.classList.add("dark-theme");

    
    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, []);

  return null;
}
