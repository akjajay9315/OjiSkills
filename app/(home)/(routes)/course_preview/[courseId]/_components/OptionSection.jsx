import React from 'react'
import { ExternalLink, LibraryBig, NotebookText } from 'lucide-react'
import Image from 'next/image'

function OptionSection() {
    const optionsList = [
        {
            id:1,
            name:'Notes',
            icon:NotebookText,
        },
        {
            id:2,
            name:'Books',
            icon:LibraryBig,
        },
        {
            id:3,
            name:'Website',
            icon:ExternalLink,
        },
    ]
  return (
    <div className="flex items-center gap-3">
      {optionsList.map((option, index) => (
        <div
          key={index}
          className="p-2 border-2 rounded-lg flex flex-col items-center w-full cursor-pointer "
        >
          <option.icon />
          <h2 className="text-[14px] text-gray-500 ">{option.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default OptionSection