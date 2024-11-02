import React from "react";
import { Link, useLocation } from "react-router-dom";

function BreadScumb() {
  const catogorys = ["thoery", "magic", "hogwart"];
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadscumb-content">
      <ol>
        {catogorys.map((catogory, index) => (
          <li className={index}>
            <a href="#">{catogory}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default BreadScumb;
