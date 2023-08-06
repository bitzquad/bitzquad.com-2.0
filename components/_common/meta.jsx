import Head from "next/head";
export default function Meta(props) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="canonical" href={props.url}></link>
            <link href="/favicon.ico" rel="icon shortcut" type="image/x-icon"></link>
            <link rel="apple-touch-icon" href="/favicon.ico"></link>
            <title>{props.title}</title>

            {/* Google */}
            <meta name="title" content={props.title} />
            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keywords} />

            {/* Facebook */}
            <meta property="og:type" content={props.type ? props.type : "website"} />
            <meta property="og:site_name" content="Bitzquad"></meta>
            <meta property="og:url" content={props.url} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.imagefb ? props.imagefb : props.imagetw} />
            <meta property="og:image:width" content={props.width ? props.width : "1200"}></meta>
            <meta property="og:image:height" content={props.height ? props.height : "630"}></meta>
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="article:publisher" content="https://twitter.com/Bitzquad"></meta>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@bitzquad" />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.imagetw ? props.imagetw : props.imagefb} />
            <meta name="twitter:image:alt" content={props.alt} />
        </Head>
    );
}
