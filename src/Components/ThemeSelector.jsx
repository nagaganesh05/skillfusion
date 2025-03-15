import React, { Suspense, useEffect, useState } from "react";


const LightTheme = React.lazy(() => import("./Themes/LightTheme"));
const DarkTheme = React.lazy(() => import("./Themes/Darktheme"));

export default function ThemeSelector({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("skill-theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("skill-theme", "light");
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}
