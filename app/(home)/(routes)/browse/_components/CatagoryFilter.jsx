"use client"
import React from 'react'
import { useState} from 'react'

function CatagoryFilter({selectedCatagory}) {
    const [activeIndex,setActiveIndex] = useState(0)
    const filterOptions = [
        {
            id:1,
            name:'All',
            value:'all'
        },
        {
            id:2,
            name:'Web Dev',
            value:'webdev'
        },
        {
            id:3,
            name:'UPSC',
            value:'upsc'
        },
        {
            id:4,
            name:'Chess',
            value:'chess'
        },
        {
            id:5,
            name:'SSC CGL',
            value:'ssc'
        },
        {
            id:6,
            name:'Music',
            value:'music'
        },
        {
            id:7,
            name:'JEE/NEET',
            value:'jeeneet'
        }
    ]
  return (
    <div className='flex gap-5 '>
        {filterOptions.map((item,index)=>(
            <button key ={index}
             onClick={()=>{setActiveIndex(index);
             selectedCatagory(item.value)}} 
             className={`border-2 p-2 px-4 text-md rounded-md hover:border-green-600 font-medium hover:bg-gray-50
            ${activeIndex == index?'border-green-600 bg-green-50 text-green-700':null}`}>
            <h2>{item.name}</h2>
            </button>
        ))}
    </div>
  )
}

export default CatagoryFilter