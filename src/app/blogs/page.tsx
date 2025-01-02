import { createClient } from "next-sanity";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import imageUrlBuilder from '@sanity/image-url'
import styles from '../styles/Home.module.css'
import PortableText from "react-portable-text"
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import NavBar from "@/components/navbar";


const client = createClient({
  projectId: "oxubsq9i",
  dataset: "production",
  apiVersion: '2023-01-01',
  useCdn: false,
});


const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

interface Blog {
  title: string;
  slug: {
    current: string;
  };
  metaDesc: string;
  blogImage?: {
    asset: {
      _type: "reference";
      _ref: string;
    };
    caption?: string;
    attribution?: string;
    _type: "image";
  };
}


export default async function Blogs({content, profile}: {content: any; profile: any}) {

  
  const query = `*[_type == "blog"]`;
  const blogs: Blog[] = await client.fetch(query); // Use the Blog[] type here
  // console.log("Blogs in the browser:", blogs);

  // const builder = imageUrlBuilder(client)

  return (
    <div>
      <NavBar profile={profile} />
      <div className="bg-grey-50 my-12" id="blog">
        <div className="container py-16 md:py-20 mx-auto">
          <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
            I also like to write
          </h2>
          <h4 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            Check out my latest posts!
          </h4>
          <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">



            {blogs.map((item) => { 
              return <Link key={item.slug.current} href={"/blog/" + item.slug.current} className="shadow">
              <div>
                <div style={{
                backgroundImage: `url(${
                  item.blogImage 
                    ? urlFor(item.blogImage) 
                    : "/assets/img/post-01.png"
                })`,
              }}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                <span
                  className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50">
                </span>
                <span
                  className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 bg-purple-700 px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer">Read
                  More
                </span>
              </div>
              <div className="bg-white py-6 px-5 xl:py-8 cursor-pointer">
                <span className="block font-body text-lg font-semibold text-black"> {item.title}</span>
                <span className="block pt-2 font-body text-grey-20">{item.metaDesc}</span>
              </div>
              </div>
            </Link>
             })}
          </div>
        </div>
      </div>
    </div>
  )


}

