import { ArrowDown } from "lucide-react";
import BlogPost from "./_components/BlogPost";
import { db } from "@/lib/firebaseconfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { PostSchema } from "@/lib/validations";

async function fetchPosts(){
      try{
        const postCollectionRef = collection(db, 'posts');
        const q = query(postCollectionRef, orderBy("createdAt", "desc"));
        const data = await getDocs(q);
        let posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).map((p) => PostSchema.parse(p));
        return posts;
      }
      catch(err){
        console.log(err);
        return [];
      }
}

const getPosts = unstable_cache(fetchPosts, ["posts"], { revalidate: 86400})

export default async function blog() {

  const posts = await getPosts();

    return(
        <div className="h-screens lg:px-64 px-5 w-full flex justify-center">
            <div className="flex-row mt-12 w-full">
                <h1 className="text-center text-xl font-semibold flex justify-center items-center gap-1">Recent Posts <ArrowDown size={18} /></h1>
                {posts.map((p: any) => (
                    <BlogPost 
                    imgUrl={p.imgUrl}
                    date={p.date}
                    title={p.title} 
                    desc={p.desc} 
                    tag={p.tag} 
                    blogID={p.blogID} 
                    />
                ))}
            </div>
        </div>
    )
}