import React, { useEffect, useRef, useState } from "react";
import { LayoutSubPages } from "../../components";
import Meta from "../../components/_common/meta";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion, useScroll, useSpring } from "framer-motion";
import Markdown from "markdown-to-jsx";
import axios from "axios";

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"));
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace(".md", ""),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markDownWithMeta = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8");
    const { data: frontmatter, content } = matter(markDownWithMeta);
    const sections = extractHeadings(content);
    return {
        props: {
            frontmatter,
            content,
            slug,
            sections,
        },
    };
}

const extractHeadings = (str) => {
    let h1 = [];
    let h2 = [];
    let obj = [];
    const strarr = str.split("\n");

    for (var i = 0; i < strarr.length; i++) {
        if (strarr[i].match(/(^## )/)) {
            const _str = strarr[i].replace("## ", "");
            h1.push({ text: _str, row: i, id: getidformheading(_str) });
        }
        if (strarr[i].match(/(^### )/)) {
            const _str = strarr[i].replace("### ", "");
            h2.push({ text: _str, row: i, id: getidformheading(_str) });
        }
    }
    obj = h1;
    for (var a = 0; a < h1.length; a++) {
        for (var b = 0; b < h2.length; b++) {
            if (a == h1.length - 1 && h1[a].row < h2[b].row) {
                if (!obj[a].subtexts) obj[a].subtexts = [h2[b]];
                else obj[a].subtexts.push(h2[b]);
            } else if (h1[a].row < h2[b].row && h1[a + 1].row > h2[b].row) {
                if (!obj[a].subtexts) obj[a].subtexts = [h2[b]];
                else obj[a].subtexts.push(h2[b]);
            }
        }
    }

    //console.log("obj : ", JSON.stringify(obj));

    return obj;
    // console.log("h1 : ", h1);
    // console.log("h2 : ", h2);
};

const getidformheading = (str) => {
    return str
        .replace(/[^a-zA-Z0-9 -]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase();
};

const HeadingLink = ({ children }) => <div className="text-red-400">{children}</div>;

function PostPage({ frontmatter: meta, content, slug, sections }) {
    const ref = useRef(null);
    const [analytics, setAnalytics] = useState(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 50,
        restDelta: 0.001,
    });
    const router = useRouter();

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        if (analytics) return;
        const response = await axios.get(`/api/vl/analytics?url=${router.asPath}`);
        if (response.data.status == 200) {
            setAnalytics(response.data.data.data);
            console.log(response.data.data.data);
        }
    };

    const getViewsStr = (views) => {
        if (views / 1000 >= 1) return `${views / 1000}K+`;
        else if (views / 100 >= 1 || views / 10 >= 1) return `${Math.ceil(views / 10) * 10}+`;
        else return `10+`;
    };

    return (
        <LayoutSubPages>
            <Meta title={`Bitzquad | Blog - ${meta.title}`} description={meta.excerpt} keywords="Blog Bitzquad, Bitzquad, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services" url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`} imagefb={`${process.env.NEXT_PUBLIC_API_URL}${meta.main_image}`} alt={meta.excerpt} />
            <div className="mx-auto w-full font-['Raleway'] lg:mt-36 2xl:mt-44 ">
                <motion.div className="progress-bar" style={{ scaleX }} />
                <div className="relative">
                    <img src={meta.cover_image} className="absolute left-0 top-0 -z-10 h-full w-full object-cover" />
                    <div className="h-full w-full  bg-black bg-opacity-70 px-5 md:px-10 lg:px-0">
                        <div className="mx-auto max-w-[1080px]  py-20 lg:w-[57%]">
                            <div className="flex flex-col gap-x-7 gap-y-2 pb-2 text-lg tracking-wider lg:flex-row lg:items-center lg:pb-0">
                                <span className=" rounded py-1 font-semibold text-gray-400 lg:bg-purple-custom lg:px-3 lg:text-gray-700">{meta.category}</span>
                                <span className=" font-semibold text-purple-custom">{meta.date}</span>
                                <span className="text-base font-semibold text-gray-300">{meta.read_duration}</span>
                                {analytics && <span className="text-base text-gray-300">{getViewsStr(analytics.views)} Reads</span>}
                            </div>
                            <h1 className="mt-2 font-semibold leading-snug text-gray-50 lg:mt-4 lg:text-5xl lg:font-bold lg:tracking-wider">{meta.title}</h1>
                            <div className="mb-2 mt-3 flex items-center gap-x-3">
                                <div className="aspect-square w-12 overflow-hidden rounded-full bg-indigo-400">
                                    <img className="h-full w-full object-cover" src={meta.writer_avatar} alt={meta.writer} />
                                </div>
                                <div>
                                    <span className="block text-sm font-semibold uppercase tracking-widest text-gray-300">{meta.writer}</span>
                                    <span className="mt-1 flex gap-x-2 text-gray-300">
                                        {meta.writer_social?.Website && (
                                            <a href={meta.writer_social?.Website}>
                                                <img src="/personal-website.svg" className="w-6" />
                                            </a>
                                        )}
                                        {meta.writer_social?.LinkedIn && (
                                            <a href={meta.writer_social?.LinkedIn}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M416 0H31.9C14.3 0 0 14.5 0 32.3V415.7C0 433.5 14.3 448 31.9 448H416C433.6 448 448 433.5 448 415.7V32.3C448 14.5 433.6 0 416 0ZM135.4 384H69V170.2H135.5V384H135.4ZM102.2 141C80.9 141 63.7 123.7 63.7 102.5C63.7 81.3 80.9 64 102.2 64C123.4 64 140.7 81.3 140.7 102.5C140.7 123.8 123.5 141 102.2 141ZM384.3 384H317.9V280C317.9 255.2 317.4 223.3 283.4 223.3C248.8 223.3 243.5 250.3 243.5 278.2V384H177.1V170.2H240.8V199.4H241.7C250.6 182.6 272.3 164.9 304.6 164.9C371.8 164.9 384.3 209.2 384.3 266.8V384Z" fill="currentColor" />
                                                </svg>
                                            </a>
                                        )}
                                        {meta.writer_social?.Facebook && (
                                            <a href={meta.writer_social?.Facebook}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M400 0H48C35.2696 0 23.0606 5.05713 14.0589 14.0589C5.05713 23.0606 0 35.2696 0 48L0 400C0 412.73 5.05713 424.939 14.0589 433.941C23.0606 442.943 35.2696 448 48 448H185.25V295.69H122.25V224H185.25V169.36C185.25 107.21 222.25 72.88 278.92 72.88C306.06 72.88 334.44 77.72 334.44 77.72V138.72H303.17C272.36 138.72 262.75 157.84 262.75 177.45V224H331.53L320.53 295.69H262.75V448H400C412.73 448 424.939 442.943 433.941 433.941C442.943 424.939 448 412.73 448 400V48C448 35.2696 442.943 23.0606 433.941 14.0589C424.939 5.05713 412.73 0 400 0Z" fill="currentColor" />
                                                </svg>
                                            </a>
                                        )}
                                        {meta.writer_social?.Twitter && (
                                            <a href={meta.writer_social?.Twitter}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M400 0H48C21.5 0 0 21.5 0 48V400C0 426.5 21.5 448 48 448H400C426.5 448 448 426.5 448 400V48C448 21.5 426.5 0 400 0ZM351.1 158.8C351.3 161.6 351.3 164.5 351.3 167.3C351.3 254 285.3 353.9 164.7 353.9C127.5 353.9 93 343.1 64 324.5C69.3 325.1 74.4 325.3 79.8 325.3C110.5 325.3 138.7 314.9 161.2 297.3C132.4 296.7 108.2 277.8 99.9 251.8C110 253.3 119.1 253.3 129.5 250.6C99.5 244.5 77 218.1 77 186.2V185.4C85.7 190.3 95.9 193.3 106.6 193.7C97.6043 187.716 90.2298 179.599 85.1347 170.072C80.0396 160.544 77.3823 149.904 77.4 139.1C77.4 126.9 80.6 115.7 86.3 106C118.6 145.8 167.1 171.8 221.5 174.6C212.2 130.1 245.5 94 285.5 94C304.4 94 321.4 101.9 333.4 114.7C348.2 111.9 362.4 106.4 375 98.9C370.1 114.1 359.8 126.9 346.2 135C359.4 133.6 372.2 129.9 384 124.8C375.1 137.9 363.9 149.5 351.1 158.8Z" fill="currentColor" />
                                                </svg>
                                            </a>
                                        )}
                                        {meta.writer_social?.Instagram && (
                                            <a href={meta.writer_social?.Instagram}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M224 170.66C213.451 170.664 203.14 173.796 194.371 179.659C185.602 185.523 178.769 193.855 174.735 203.602C170.7 213.348 169.647 224.073 171.707 234.418C173.768 244.764 178.849 254.266 186.31 261.724C193.771 269.182 203.275 274.26 213.621 276.317C223.968 278.373 234.691 277.316 244.437 273.278C254.182 269.24 262.512 262.403 268.372 253.632C274.232 244.861 277.36 234.549 277.36 224C277.349 209.853 271.724 196.289 261.718 186.288C251.713 176.286 238.147 170.665 224 170.66ZM348.71 129.66C345.995 122.778 341.894 116.528 336.663 111.297C331.432 106.066 325.182 101.965 318.3 99.25C297.3 90.96 247.3 92.82 224 92.82C200.7 92.82 150.75 90.89 129.69 99.25C122.808 101.965 116.558 106.066 111.327 111.297C106.096 116.528 101.995 122.778 99.28 129.66C91 150.66 92.85 200.71 92.85 223.99C92.85 247.27 91 297.26 99.32 318.33C102.035 325.212 106.136 331.462 111.367 336.693C116.598 341.924 122.848 346.025 129.73 348.74C150.73 357.03 200.73 355.17 224.04 355.17C247.35 355.17 297.28 357.1 318.34 348.74C325.222 346.025 331.472 341.924 336.703 336.693C341.934 331.462 346.035 325.212 348.75 318.33C357.1 297.33 355.18 247.28 355.18 224C355.18 200.72 357.1 150.74 348.75 129.67L348.71 129.66ZM224 306C207.782 306 191.928 301.191 178.443 292.181C164.958 283.17 154.448 270.364 148.242 255.38C142.035 240.396 140.412 223.909 143.576 208.003C146.74 192.096 154.549 177.485 166.017 166.017C177.485 154.549 192.096 146.74 208.003 143.576C223.909 140.412 240.396 142.035 255.38 148.242C270.364 154.448 283.17 164.958 292.181 178.443C301.191 191.928 306 207.782 306 224C306.013 234.772 303.901 245.441 299.785 255.396C295.669 265.35 289.629 274.395 282.012 282.012C274.395 289.629 265.35 295.669 255.396 299.785C245.441 303.901 234.772 306.013 224 306ZM309.38 157.7C305.594 157.702 301.893 156.581 298.744 154.479C295.595 152.377 293.14 149.389 291.69 145.891C290.24 142.394 289.859 138.546 290.597 134.832C291.334 131.119 293.156 127.707 295.832 125.03C298.509 122.352 301.919 120.528 305.632 119.788C309.345 119.049 313.194 119.428 316.692 120.876C320.19 122.324 323.18 124.778 325.284 127.925C327.387 131.073 328.51 134.774 328.51 138.56C328.521 141.074 328.035 143.566 327.08 145.892C326.126 148.217 324.721 150.332 322.948 152.114C321.174 153.896 319.066 155.31 316.745 156.276C314.423 157.241 311.934 157.739 309.42 157.74L309.38 157.7ZM400 0H48C35.2696 0 23.0606 5.05713 14.0589 14.0589C5.05713 23.0606 0 35.2696 0 48L0 400C0 412.73 5.05713 424.939 14.0589 433.941C23.0606 442.943 35.2696 448 48 448H400C412.73 448 424.939 442.943 433.941 433.941C442.943 424.939 448 412.73 448 400V48C448 35.2696 442.943 23.0606 433.941 14.0589C424.939 5.05713 412.73 0 400 0ZM382.88 290C381.59 315.63 375.74 338.34 357.03 357C338.32 375.66 315.63 381.63 290.03 382.85C263.62 384.34 184.44 384.34 158.03 382.85C132.4 381.56 109.77 375.7 91.03 357C72.29 338.3 66.4 315.58 65.18 290C63.69 263.58 63.69 184.39 65.18 158C66.47 132.37 72.25 109.66 91.03 91C109.81 72.34 132.5 66.44 158.03 65.22C184.44 63.73 263.62 63.73 290.03 65.22C315.66 66.51 338.36 72.37 357.03 91.07C375.7 109.77 381.66 132.49 382.88 158.12C384.37 184.44 384.37 263.56 382.88 290Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                        {meta.writer_social?.Github && (
                                            <a href={meta.writer_social?.Github}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M400 0H48C21.5 0 0 21.5 0 48V400C0 426.5 21.5 448 48 448H400C426.5 448 448 426.5 448 400V48C448 21.5 426.5 0 400 0ZM277.3 383.7C268.9 385.2 265.8 380 265.8 375.7C265.8 370.3 266 342.7 266 320.4C266 304.8 260.8 294.9 254.7 289.7C291.7 285.6 330.7 280.5 330.7 216.6C330.7 198.4 324.2 189.3 313.6 177.6C315.3 173.3 321 155.6 311.9 132.6C298 128.3 266.2 150.5 266.2 150.5C253 146.8 238.7 144.9 224.6 144.9C210.5 144.9 196.2 146.8 183 150.5C183 150.5 151.2 128.3 137.3 132.6C128.2 155.5 133.8 173.2 135.6 177.6C125 189.3 120 198.4 120 216.6C120 280.2 157.3 285.6 194.3 289.7C189.5 294 185.2 301.4 183.7 312C174.2 316.3 149.9 323.7 135.4 298.1C126.3 282.3 109.9 281 109.9 281C93.7 280.8 108.8 291.2 108.8 291.2C119.6 296.2 127.2 315.4 127.2 315.4C136.9 345.1 183.3 335.1 183.3 335.1C183.3 349 183.5 371.6 183.5 375.7C183.5 380 180.5 385.2 172 383.7C106 361.6 59.8 298.8 59.8 225.4C59.8 133.6 130 63.9 221.8 63.9C313.6 63.9 388 133.6 388 225.4C388.1 298.8 343.3 361.7 277.3 383.7ZM179.2 322.6C177.3 323 175.5 322.2 175.3 320.9C175.1 319.4 176.4 318.1 178.3 317.7C180.2 317.5 182 318.3 182.2 319.6C182.5 320.9 181.2 322.2 179.2 322.6ZM169.7 321.7C169.7 323 168.2 324.1 166.2 324.1C164 324.3 162.5 323.2 162.5 321.7C162.5 320.4 164 319.3 166 319.3C167.9 319.1 169.7 320.2 169.7 321.7ZM156 320.6C155.6 321.9 153.6 322.5 151.9 321.9C150 321.5 148.7 320 149.1 318.7C149.5 317.4 151.5 316.8 153.2 317.2C155.2 317.8 156.5 319.3 156 320.6ZM143.7 315.2C142.8 316.3 140.9 316.1 139.4 314.6C137.9 313.3 137.5 311.4 138.5 310.5C139.4 309.4 141.3 309.6 142.8 311.1C144.1 312.4 144.6 314.4 143.7 315.2ZM134.6 306.1C133.7 306.7 132 306.1 130.9 304.6C129.8 303.1 129.8 301.4 130.9 300.7C132 299.8 133.7 300.5 134.6 302C135.7 303.5 135.7 305.3 134.6 306.1ZM128.1 296.4C127.2 297.3 125.7 296.8 124.6 295.8C123.5 294.5 123.3 293 124.2 292.3C125.1 291.4 126.6 291.9 127.7 292.9C128.8 294.2 129 295.7 128.1 296.4ZM121.4 289C121 289.9 119.7 290.1 118.6 289.4C117.3 288.8 116.7 287.7 117.1 286.8C117.5 286.2 118.6 285.9 119.9 286.4C121.2 287.1 121.8 288.2 121.4 289Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                        {meta.writer_social?.Behance && (
                                            <a href={meta.writer_social?.Behance}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M186.5 261C186.5 280.3 172.5 286.4 155.3 286.4H110.2V233.5H156.2C174.8 233.6 186.5 241.3 186.5 261ZM178.8 178.7C178.8 161 165.1 156.8 149.9 156.8H110.3V201.6H153C168.1 201.6 178.8 195 178.8 178.7ZM311.1 201.9C292.8 201.9 280.6 213.3 279.4 231.6H341.6C339.9 213.1 330.3 201.9 311.1 201.9ZM448 48V400C448 426.5 426.5 448 400 448H48C21.5 448 0 426.5 0 400V48C0 21.5 21.5 0 48 0H400C426.5 0 448 21.5 448 48ZM271.7 153H349.5V134.1H271.7V153ZM228.7 263.3C228.7 239.2 217.3 218.4 193.7 211.7C210.9 203.5 219.9 194 219.9 174.7C219.9 136.5 191.4 127.2 158.5 127.2H68V319.2H161.1C196 319 228.7 302.3 228.7 263.3ZM380 248.5C380 207.4 355.9 173.1 312.4 173.1C270 173.1 241.3 204.9 241.3 246.7C241.3 290 268.6 319.7 312.4 319.7C345.6 319.7 367.1 304.8 377.5 272.9H343.8C340.1 284.8 325.2 291 313.6 291C291.2 291 279.5 277.9 279.5 255.7H379.7C379.8 253.4 380 250.9 380 248.5Z" fill="currentColor" />
                                                </svg>
                                            </a>
                                        )}
                                        {meta.writer_social?.Youtube && (
                                            <a href={meta.writer_social?.Youtube}>
                                                <svg className="h-6 w-6" width="448" height="448" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M186.8 170.1L282 224.2L186.8 278.3V170.1ZM448 48V400C448 426.5 426.5 448 400 448H48C21.5 448 0 426.5 0 400V48C0 21.5 21.5 0 48 0H400C426.5 0 448 21.5 448 48ZM406 224.3C406 224.3 406 164.7 398.4 136.1C394.2 120.3 381.9 107.9 366.2 103.7C337.9 96 224 96 224 96C224 96 110.1 96 81.8 103.7C66.1 107.9 53.8 120.3 49.6 136.1C42 164.6 42 224.3 42 224.3C42 224.3 42 283.9 49.6 312.5C53.8 328.3 66.1 340.2 81.8 344.4C110.1 352 224 352 224 352C224 352 337.9 352 366.2 344.3C381.9 340.1 394.2 328.2 398.4 312.4C406 283.9 406 224.3 406 224.3Z" fill="currentColor" />
                                                </svg>
                                            </a>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10  md:block lg:w-10/12">
                                <blockquote className=" text-2xl italic text-slate-300">{meta.quote}</blockquote>
                                <div className="mx-auto mt-3 text-right text-2xl  text-gray-300">- {meta.quote_owner}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bz-container mb-20 mt-0 flex justify-center gap-x-5">
                    <article ref={ref} className=" text-[#181B3C]  lg:w-3/4">
                        <Markdown>{content}</Markdown>
                    </article>
                    <div className="hidden w-1/4 pt-16 lg:block">
                        <span className="block text-lg font-semibold uppercase">In This Article</span>
                        <div className="mt-3">
                            {sections.map((section, index) => (
                                <div key={index} className="pb-1">
                                    <a href={`#${section.id}`} className="mr-1  text-base text-gray-500">
                                        {index + 1}. {section.text.split(". ") > 1 ? section.text.split(". ")[1] : section.text}
                                    </a>

                                    {section.subtexts?.map((ssection, index1) => (
                                        <div key={index} className="ml-5">
                                            <span className="mr-1 text-lg text-gray-500">
                                                {index + 1}.{index1 + 1}.
                                            </span>
                                            {ssection.text}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutSubPages>
    );
}

const Section = ({ children, title, index }) => {
    return (
        <section className="mt-6 flex items-center justify-center">
            <div className="relative">
                <div className="sticky top-0 z-10 bg-white px-5 py-4 text-2xl font-semibold">
                    <h3 className="">
                        <span className="px-1 text-5xl font-thin">{index}.</span>
                        {title}
                    </h3>
                </div>

                <div className="section_content">{children}</div>
            </div>
        </section>
    );
};

export default PostPage;
