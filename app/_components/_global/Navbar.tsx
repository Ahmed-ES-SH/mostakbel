import React from "react";
import NavDiv from "./_navbar/NavDiv";
import Img from "./Img";

export default function Navbar() {
  const currentDetailes = [
    {
      title: "Locate Address:",
      value: "Newyork City, USA",
    },
    {
      title: "Call us any time:",
      value: "+163-3654-7896",
    },
    {
      title: "Email us any time:",
      value: "info@donat.com",
    },
  ];
  return (
    <NavDiv>
      <div className="container h-full py-2 mx-auto flex items-center justify-between">
        {/* logo */}
        <Img src="/logo.png" className="w-40" />

        {/* current detailes */}
        {currentDetailes.map((item, index) => (
          <div
            key={`nav-${index}`}
            className="flex flex-col items-start gap-2 not-last:border-r border-gray-300"
          >
            <p className="text-foreground">{item.title}</p>
            <h3 className="font-bold text-xl">{item.value}</h3>
          </div>
        ))}
      </div>
    </NavDiv>
  );
}
