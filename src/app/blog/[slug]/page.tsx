import { createClient } from "next-sanity";
import React from "react";
// import { useRouter } from "next/navigation";
import Head from "next/head";
import NavBar from "@/components/navbar";
import PortableText from "react-portable-text";
import { Blog } from "../../types/blogTypes";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from '@sanity/image-url'
import Link from "next/link";
// import Link from "next/link";
// import { AuthorSchema, ImageField } from "@/app/types/authorTypes";



interface Profile {
  name: string;
}

const client = createClient({
  projectId: "oxubsq9i",
  dataset: "production",
  apiVersion: '2023-01-01',
  useCdn: false,
});


async function fetchBlog(slug:string): Promise<Blog> {
  const query = `
  *[_type == "blog" && slug.current == $slug][0] {
      title,
      content,
      createdAt,
      blogImage,
      author
  }`; 
  
  return client.fetch(query, {slug});
}   

// async function fetchProfile(): Promise<Profile> {
//   const profileQuery = `*[_type == "profile"][0]`;
//   return client.fetch(profileQuery); 
// }

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}


export default async function BlogPage({ params }: { params: {slug : string} }) {
  const slug  = params.slug;

  const [blog] = await Promise.all([fetchBlog(slug)]);

    // console.log("blog", blog);
    // console.log("Blog content:", blog.content);
    // console.log("profile", profile);
    // console.log("author", blog.author);

   

    
  return (
    <>
  <Head>
    <meta charSet="utf-8" />
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport" />
    <title>{blog.title}</title>
    <meta property="og:title" content="How to become a frontend developer | Atom Template" />
    <meta property="og:locale" content="en_US" />
    <link rel="canonical" href="//post" />
    <meta property="og:url" content="//post" />
    <meta name="description"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
    <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
    <meta name="theme-color" content="#5540af" />
    <meta property="og:site_name" content="Atom Template" />
    <meta property="og:image" content="//assets/img/social.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@tailwindmade" />
    <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
    <link as="style"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Raleway:wght@400;500;600;700&display=swap"
      rel="preload" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Raleway:wght@400;500;600;700&display=swap"
      rel="stylesheet" />
    <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <link crossOrigin="anonymous" href="/assets/styles/main.min.css" media="screen" rel="stylesheet" />
    <script defer src="https://unpkg.com/@alpine-collective/toolkit@1.0.0/dist/cdn.min.js"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/atom-one-dark.min.css" />
  </Head>

  <NavBar />

  <div className="container mx-auto py-6 md:py-10">
    <div className="max-w-4xl mx-auto">
      <div>
        <h1 className="pt-5 font-body text-3xl font-semibold text-primary sm:text-4xl md:text-5xl xl:text-6xl">
          {blog.title}
        </h1>
        <div className="flex items-center pt-5 md:pt-10">
          <div>
            <img src="/assets/img/blog-author.jpg"
              className="h-20 w-20 rounded-full border-2 border-grey-70 shadow"
              alt="author image" />
          </div>
          <div className="pl-5">
            <span className="block font-body text-xl font-bold text-grey-10">By Preetam Devji</span>
            <span className="block pt-1 font-body text-xl font-bold text-grey-30">Janunary 1,
              2025</span>
          </div>
        </div>
      </div>
      <div className="prose max-w-none pt-8">
        <PortableText
          content={blog.content}
          projectId="oxubsq9i"
          dataset="production"
        />
      </div>
      <div className="mt-10 flex justify-between border-t border-lila py-12">
        <Link href="/" className="flex items-center">
          <i className="bx bx-left-arrow-alt text-2xl text-primary"></i>
          <span className="block pl-2 font-body text-lg font-bold uppercase text-primary md:pl-5">Previous
            Post</span>
        </Link>
        <Link href="/" className="flex items-center">
          <span className="block pr-2 font-body text-lg font-bold uppercase text-primary md:pr-5">Next
            Post</span>
          <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
        </Link>
      </div>
    </div>
  
    <div className="bg-primary">
  <div className="container flex flex-col justify-between py-6 sm:flex-row">
    <p className="text-center font-body text-black md:text-left">
      © Copyright 2022. All right reserved, ATOM.
    </p>
    <div className="flex items-center justify-center pt-5 sm:justify-start sm:pt-0">
      <Link href="/">
        <i className="bx bxl-facebook-square text-2xl text-black hover:text-yellow">fb</i>
      </Link>
      <Link href="/" className="pl-4">
        <i className="bx bxl-twitter text-2xl text-black hover:text-yellow">twitter</i>
      </Link>
      <Link href="/" className="pl-4">
        <i className="bx bxl-linkedin text-2xl text-black hover:text-yellow">linkedin</i>
      </Link>
      <Link href="/" className="pl-4">
        <i className="bx bxl-instagram text-2xl text-black hover:text-yellow">instagram</i>
      </Link>
    </div>
  </div>
</div>
</div>
</>
)}
