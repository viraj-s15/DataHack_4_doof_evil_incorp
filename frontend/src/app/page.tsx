"use client"
import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";
import Image from "next/image"
import DragAndDrop from "./DD";
// import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



export default function HomePage() {


// Your code using useState and useEffect
const[inputdata, setInputData] = useState(" ")
const[items, setItems] = useState([" "]);

const addItem = () => {
if (!inputdata) {
alert("pls fill the data");
}
else {
setItems([...items,inputdata]);
}
};

return (


  
// Server-side rendering or fallback content

<div>

<div className="fixed top-0 left-0 right-0 bg-white shadow-lg p-7">
<nav className="flex items-center justify-between bg-blue-200">
<Image
src="/logo.jpeg"
width={45}
height={45}
alt="logo" />
<div className="text-4xl font-bold">
𝙻𝚎𝚐𝚊𝚕𝙻𝚒𝚗𝚐𝚘
</div>
<ul className="flex space-x-4">

<li><a href="#"></a></li>
<li><a href="#"> </a></li>
<li><a href="#"> </a></li>
<li><a href="#"> </a></li>
</ul>
</nav>





<div className="flex h-screen">
<div className="w-1/2 h-full overflow-y-auto bg-light blue">





<DragAndDrop/>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Upload Document(s)
</button>
</div>








</div>
<div className="w-1/2 h-full bg-grey overflow-y-auto relative">
hello blah blah blah blah ,just for testing stuff,viraj ka laptop superb hai btw ,yess thats true,blah blah bhkjsjjdnsjwusnwjswnsnjsjwsnjswnjsnswjn
<div className="sticky bottom-0 left-8 right-0">
<div className="bg-white border-t border-gray-300 p-1">
{/* Chatbox Content */}
<div className="flex items-center">
<input
type="text"
placeholder="Type your prompt..."
className="w-full px-2 py-1 focus:outline-none"
color="white"

value={inputdata}
onChange={(event) => setInputData(event.target.value)}
/>
<button className="bg-blue-500 text-white px-4 py-1 rounded-full ml-2" onClick={addItem}>
Search
</button>
</div>
</div>
</div>
</div>
</div>
</div>


)
}






