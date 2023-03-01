import React from "react";
import Link from "next/link";
import { LayoutSubPages } from "../../components";
import Meta from "../../components/defaults/Meta";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const markDownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );
    const { data: frontmatter } = matter(markDownWithMeta);
    return { slug, frontmatter };
  });
  posts.sort(function (a, b) {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });
  return {
    props: {
      posts: posts,
    },
  };
}

function Index({ posts }) {
  const router = useRouter();
  return (
    <LayoutSubPages>
      <Meta
        title="Bitzquad | Blog"
        description="We are a booming start-up in the tech ecosystem, based in Sri Lanka, focusing on providing diverse solutions in INFORMATION SYSTEMS, BUSINESS PROCESS
                RE-ENGINEERING, BRANDING AND DIGITAL MARKETING and E-BUSINESS services in both local and international markets. Our passionate and competent team is keen to bring futuristic and pragmatic solutions that transcend your expectations. We believe our purpose is to upscale
                the value of ideas of our clients and prospects."
        keywords="Blog Bitzquad, Bitzquad, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
        url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
        imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
        alt="We are a booming start-up in the tech ecosystem, based in Sri Lanka, focusing on providing diverse solutions in information systems, business process
                re-engineering, Branding and Digital Marketing and E-Business services in both local and international markets. Our passionate and competent team is keen to bring futuristic and pragmatic solutions that transcend your expectations. We believe our purpose is to upscale
                the value of ideas of our clients and prospects."
      />
      <div
        className="bz-container relative mx-auto mt-0 h-full w-full bg-gray-50 font-['Raleway'] md:bg-transparent lg:mt-44"
        data-scroll-section
      >
        <div className=" py-10 px-5 lg:py-0">
          <h1 className="text-3xl font-semibold uppercase lg:text-5xl">Blog</h1>
          <p className="mt-4 text-sm  font-semibold tracking-widest text-gray-700 lg:mt-5 lg:text-xl xl:w-10/12">
            At Bitzquad, we are passionate about gathering new knowledge in
            different areas. This is a capstone in optimising our operations
            while sharing new-found knowledge with society, where it shapes the
            future.
            <br />
            <br /> This blog is proof of our minds flowing with mastery and
            experience to give what is best for the future.
          </p>
        </div>
        <div className=" mb-20 grid grid-cols-1 gap-y-16 gap-x-10 pt-10 md:grid-cols-2 lg:pt-20 xl:grid-cols-3 2xl:px-20">
          {posts.slice(0, 1).map(({ frontmatter: blog, slug }, index) => (
            <>
              <Link href={`/blog/${slug}`} key={index}>
                <div className="blog_card_large group">
                  <div className="blog_card_large_img">
                    <img src={blog.main_image} alt={blog.title} className="" />
                  </div>
                  <div className="blog_card_large_content">
                    <div className="sub_details">
                      <div className="category">{blog.category}</div>
                      <div className="duration">{blog.read_duration}</div>
                    </div>

                    <h4 className="title">{blog.title}</h4>
                    <p className="paragraph">{blog.excerpt}</p>
                    <div className="writer">
                      <div className="image">
                        <img src={blog.writer_avatar} alt={blog.writer} />
                      </div>
                      <div>
                        <span className="name">{blog.writer}</span>
                        <span className="publish_date">
                          {new Date(blog.date).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href={`/blog/${slug}`}>
                <div key={index} className="blog_card group lg:hidden">
                  <div className="blog_card_image">
                    <img src={blog.main_image} alt={blog.title} />
                    <div className="duration">{blog.rading_duration}</div>
                  </div>
                  <div className="blog_card_content">
                    <h4 className="title" title={blog.title}>
                      {blog.title}
                    </h4>
                    <p className="paragraph">{blog.excerpt}</p>
                    <div className="writer">
                      <div className="image">
                        <img src={blog.writer_avatar} alt={blog.writer} />
                      </div>
                      <div>
                        <span className="name">{blog.writer}</span>
                        <span className="publish_date">
                          {new Date(blog.date).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}
          {posts.slice(1).map(({ frontmatter: blog, slug }, index) => (
            <Link key={index} href={`/blog/${slug}`} >
              <div key={index} className="blog_card group">
                <div className="blog_card_image">
                  <img src={blog.main_image} alt={blog.title} />
                  <div className="duration">{blog.read_duration}</div>
                </div>
                <div className="blog_card_content">
                  <h4 className="title" title={blog.title}>
                    {blog.title}
                  </h4>
                  <p className="paragraph">{blog.excerpt}</p>
                  <div className="writer">
                    <div className="image">
                      <img src={blog.writer_avatar} alt={blog.writer} />
                    </div>
                    <div>
                      <span className="name">{blog.writer}</span>
                      <span className="publish_date">
                        {new Date(blog.date).toDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutSubPages>
  );
}

export default Index;
