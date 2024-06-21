import React from "react";
import Image from "next/image";

function WelcomeBanner() {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center rounded-xl border-2 mb-3 bg-green-100 p-4">
      <Image src="/Turtle.png" alt="Turtle" width={180} height={180} />
      <div className="mt-3 md:mt-0">
        <h2 className="font-bold text-[27px]">
          Welcome to the <span className="text-green-600">OjiSkills</span>-by
          The3D
        </h2>
        <h2 className="text-gray-500 mt-2 md:mt-3">
          A single ALL-SKILL platform to learn skills in a planned and better
          way
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
