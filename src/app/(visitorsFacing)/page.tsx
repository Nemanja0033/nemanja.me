import { ArrowDown } from "lucide-react";
import BlogCard from "./_components/blogCard/BlogCards";
import Heading from "./_components/blogCard/Heading";

export default function home(){
  
  return(
    <div className="md:flex flex-row justify-center">
      <div className="md:w-1/2 w-full">
        <Heading />
      </div>
      <div className="h-[420px] w-[410px] overflow-auto mt-20 border-l border-gray-800">
        <h1 className="flex justify-center items-center gap-1 textarea-md">Recent Posts <ArrowDown size={16} /></h1>
        <BlogCard />
      </div>
    </div>
  )
}