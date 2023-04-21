/*    Imports    */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetcher from "../../constants/fetch/job";

import SingleJobCard from "../../components/jobs/singlejobinfoview";
import SingleJobCardLoading from "../../components/jobs/singlejobinfoviewloading";
import SingleJobDetailCard from "../../components/jobs/singlejobdetailview";
import Head from "next/head";
// const requiedFields = { _id: 1, name: 1, description: 1, content: 1, thumbnail: 1, createdAt: 1 };

const requiredProps = {
    name: 1,
    jobtype: 1,
    workplace: 1,
    salary: 1,
    featured: 1,
    vacent: 1,
    urgent: 1,
    candidatescount: 1,
    "place.city": 1,
    "place.state": 1,
    "place.country": 1,
    createdAt: 1,
};

export async function getServerSideProps(context) {
    const cookie = context?.req?.headers?.cookie;
    if (!context.query.id) return { props: { job: null }, notFound: true };
    const job = await fetcher.getById_Public(context.query.id, {}, () => {}, {
        headers: {
            Cookie: cookie,
        },
    });
    return {
        notFound: !job,
        props: { job },
    };
}

const Index = ({ job }) => {
    const router = useRouter();
    const [jobs, setJobs] = useState([]); // jobs object
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // wait until roter.isReady is true
        if (router.isReady) {
            fetchdata();
        }
    }, [router.isReady]);

    // data fetching main function
    const fetchdata = async () => {
        const res = await fetcher.get_Public({}, requiredProps, true, false, 5, 0, { createdAt: -1 }, setLoading);
        if (res != null) {
            setJobs(res.values);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-3 lg:px-10">
            <Head>
                <title>{job?.name}</title>
            </Head>
            <div className="mt-3 lg:mt-10">
                <div className="flex flex-col lg:flex-row lg:gap-x-6 text-gray-500">
                    <div className="mt-5 w-1/3">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${job._id}?key=${job.thumbnail.src}`} alt={job.name} className="object-center object-cover w-full" />
                        </div>
                        <div className="mt-5">
                            <h3 className="text-gray-800 font-bold text-xl">Here are some jobs that you may be interested in</h3>
                            {jobs &&
                                jobs.length > 0 &&
                                jobs?.map((_job, index) => <SingleJobCard key={index} job={_job} selected={false} onClick={() => router.push(`/job/${_job._id}`)}></SingleJobCard>)}

                            {(!jobs || jobs.length == 0) &&
                                loading &&
                                Array(10)
                                    .fill(1)
                                    .map((_, index) => <SingleJobCardLoading key={index}></SingleJobCardLoading>)}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <SingleJobDetailCard job={job} loading={false} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Index;

Index.layout = "main";
