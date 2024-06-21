import React from 'react'
import Image from 'next/image'; 

function Welcomeback({user}) {
  return (
    <div className="flex gap-5 items-center rounded-xl border-2 mb-3 bg-green-100 ">
      <Image
        src="/Turtlehello.png"
        alt="Turtle"
        width={140}
        height={50}
        className="ml-4"
      />
      <div>
        <h2 className="font-bold text-[27px]">
          Welcome back,
          <span className="text-green-600"> {user?.fullName}</span>
        </h2>
        <h2 className="text-gray-500">
          Keep learning and exploring yourself with OjiSkills.
        </h2>
      </div>
    </div>
  );
}

export default Welcomeback