export default function Meta(props) {
    return (
        <>
            <link rel="canonical" href={props.url}></link>

            {/* Google */}
            <meta name="title" content={props.title} />
            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keywords} />

            {/* Facebook */}
            <meta property="og:type" content={props.type ? props.type : "website"} />
            <meta property="og:site_name" content="DEInclusive"></meta>
            <meta property="og:url" content={props.url} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.imagefb ? props.imagefb : props.imagetw} />
            <meta property="og:image:width" content={props.width ? props.width : "1200"}></meta>
            <meta property="og:image:height" content={props.height ? props.height : "630"}></meta>
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="article:publisher" content="https://twitter.com/DEInclusive"></meta>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@DEInclusive" />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.imagetw ? props.imagetw : props.imagefb} />
            <meta name="twitter:image:alt" content={props.alt} />
        </>
    );
}
