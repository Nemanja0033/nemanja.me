import BlogCard from "./_components/blogCard/BlogCards";
import Heading from "./_components/blogCard/Heading";
import { db } from "@/lib/firebaseconfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { unstable_cache } from "next/cache";
import { PostSchema } from "@/lib/validations";

async function getFeaturedPosts(){
      try{
        const postCollectionRef = collection(db, 'posts');
        const q = query(postCollectionRef, where("feautured", "==", true));
        const data = await getDocs(q);
        const post = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return post.map(post => PostSchema.parse(post));
      }
      catch(err){
        console.log(err);
        return []
      }
}

const getPosts = unstable_cache(getFeaturedPosts, ["feautured posts"], {revalidate: 86400 });

export default async function home(){
  const featuredPosts = await getPosts();

  return(
    <main className='w-full lg:px-64 px-5 flex-row items-center'>
          <section className="w-full mt-12">
            <Heading />
            <div className="flex justify-between mt-16 mb-3 border-b py-2">
              <h1 className="md:text-2xl tex-md font-semibold">Feautured Posts</h1>
              <Link className="flex btn bg-neutral btn-sm items-center hover:bg-white hover:text-black transition-all" href={'/blog'}>View All <ArrowUpRight size={18} /></Link>
            </div>
          </section>
          
          <section className="grid w-full md:grid-cols-2 grid-cols-1">
            {featuredPosts.length !== 0 ?
            (
              featuredPosts.map((p: any, i:any) => (
                <BlogCard title={p.title}
                          date={p.date}
                          tag={p.tag}
                          desc={p.desc}
                          imgUrl={p.imgUrl}
                          blogID={p.blogID}
                          key={i}
                           />
              ))
            )
            :
            (<div>
              <h1>Something went wrong refresh page!</h1>
            </div>)}
          </section>
    </main>
  )
}