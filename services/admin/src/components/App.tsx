import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <h1>about</h1>
      <Outlet />
    </>
  );
};
