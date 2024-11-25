import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="w-full flex justify-evenly h-14 shadow-md">
            <div className="flex items-center">
               <Link href={'/'}><span className="font-bold text-md cursor-pointer">myBlog</span></Link>
            </div>
            <div className="flex justify-center items-center gap-8 text-sm">
                <Link className=" hover:text-gray-200 border-l border-gray-800 pl-3" href={'/'}>Home</Link>
                <Link className="hover:text-gray-200" href={'/blog'}>Blog</Link>
                <Link className="hover:text-gray-200" href={'/about'}>About</Link>
            </div>
        </nav>
    )
}