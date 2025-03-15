import { useEffect } from "react";

export default function LightTheme() {
  useEffect(() => {
    
    document.body.classList.add("light-theme");
    return () => {
      document.body.classList.remove("light-theme");
    };
  }, []);

  return null;
}
