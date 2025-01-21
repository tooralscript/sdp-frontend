import React from "react";
import s from "./homepage.module.css";
import Navbar from "../components/navbar/Navbar";

export default function HomePage() {
  return (
    <div className={s.container}>
      <Navbar />
    </div>
  );
}
