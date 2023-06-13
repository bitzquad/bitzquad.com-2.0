import fs from "fs";
import path from "path";

const getBlogPostNames = () => {
    let posts = [];
    let files = null;
    if (fs.existsSync(path.join("posts"))) files = fs.readdirSync(path.join("posts"));
    else if (fs.existsSync(path.join("../posts"))) files = fs.readdirSync(path.join("../posts"));
    if (files)
        posts = files.map((fileName) => {
            const slug = fileName.replace(".md", "");
            return { slug };
        });
    return posts;
};

const toTwoDigit = (num) => {
    return num < 10 ? `0${num}` : num;
};

const generateSiteMap = () => {
    const date = new Date();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    xml += `<url><loc>https://www.bitzquad.com/</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/contact</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/about</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/projects</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;

    xml += `<url><loc>https://www.bitzquad.com/services/information-systems</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/services/business-process-re-engineering</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/services/e-business</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/services/brand-designing-and-digital-marketing</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;

    xml += `<url><loc>https://www.bitzquad.com/squad</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/1</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/2</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/3</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/4</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/5</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/6</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/7</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/8</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/9</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/squad/10</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    xml += `<url><loc>https://www.bitzquad.com/blog</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    const posts = getBlogPostNames();
    posts.forEach((post) => {
        xml += `<url><loc>https://www.bitzquad.com/${post.slug}</loc><lastmod>${toTwoDigit(date.getFullYear())}-${toTwoDigit(date.getMonth() + 1)}-${toTwoDigit(date.getDate())}</lastmod></url>`;
    });
    xml += `</urlset>`;
    return xml;
};

const SiteMap = () => {};

export const getServerSideProps = async ({ res }) => {
    const sitemap = generateSiteMap();
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;
