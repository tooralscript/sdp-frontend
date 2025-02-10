import React from "react";
import s from "./navbar.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={s.container}>
      <Link to={"/companies"}>
        <Button variant="contained">Companies</Button>
      </Link>
      <Link to={"/"}>
        <Button variant="contained">Home</Button>
      </Link>
    </div>
  );
}
