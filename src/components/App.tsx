import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import Image from "@/assets/test_asset_1.png";
import Image_2 from "@/assets/test_asset_2.jpg";
import Image_3 from "@/assets/test_asset_3.svg";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  function TestFunc_1() {
    TestFunc_2();
  }

  function TestFunc_2() {
    throw new Error("GGGGGGG");
  }

  return (
    <>
      <Link to="/about">about</Link>
      <Link to="/shop">shop</Link>
      <div>{count}</div>
      <button
        data-testid="button-id"
        className={classes.button}
        // onClick={() => setCount((prevState) => prevState + 1)}
        onClick={() => TestFunc_1()}
      >
        plus
      </button>
      <img width={200} src={Image} data-testid="imageSpecialId" />
      <img width={300} src={Image_2} />
      <Image_3 width={100} height={100} color="green" />
      <div>{__PLATFORM__}</div>
      <Outlet />
    </>
  );
};
