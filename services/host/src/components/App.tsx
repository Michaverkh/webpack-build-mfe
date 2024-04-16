import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Link to="/about">about</Link>
      <Link to="/shop">shop</Link>
      <div>{count}</div>
      <button
        data-testid="button-id"
        className={classes.button}
        onClick={() => setCount((prevState) => prevState + 1)}
      >
        plus
      </button>
      <div>{__PLATFORM__}</div>
      <Outlet />
    </>
  );
};
