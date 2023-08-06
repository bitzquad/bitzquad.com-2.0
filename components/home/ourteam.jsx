import Link from "next/link";
const people = [
    {
        name: "Kesara Karannagoda",
        role: "Founder",
        imageUrl: "/assets/img/squad/kesara.webp",
        twitterUrl: "#",
        linkedinUrl: "#",
        link: "/squad/1",
    },
    {
        name: "Hasindu Lanka",
        role: "Co-Founder",
        imageUrl: "/assets/img/squad/hasindu.webp",
        twitterUrl: "#",
        linkedinUrl: "#",
        link: "/squad/4",
    },
    {
        name: "Harindu Wijesinghe",
        role: "Co-Founder",
        imageUrl: "/assets/img/squad/harindu.webp",
        twitterUrl: "#",
        linkedinUrl: "#",
        link: "/squad/2",
    },
    {
        name: "Akash Geethanjana",
        role: "Co-Founder",
        imageUrl: "/assets/img/squad/akash.webp",
        twitterUrl: "#",
        linkedinUrl: "#",
        link: "/squad/3",
    },

    // More people...
];

export default function Example() {
    return (
        <div className="project-section-wrapper">
            <div className="project-section-content mb-0 pb-0">
                <div className="bz-container mt-0">
                    <h2>Our Founders</h2>
                    <p>
                        Without bits, there won&apos;t be bytes. So does Bitzquad. This quad is simply the set of dreamers and commanders who made Bitzquad a reality.
                        <br /> Meet the bit+z+quad behind the terrific story of Bitzquad.
                    </p>
                </div>
            </div>
            <div className="bz-container mb-10 2xl:mt-16 2xl:mb-10">
                <ul role="list" className="mx-auto mt-5 grid grid-cols-2 sm:grid-cols-2 sm:gap-16 lg:max-w-5xl lg:grid-cols-4 2xl:max-w-7xl">
                    {people.map((person) => (
                        <li key={person.name}>
                            <Link href={person.link}>
                                <div className="space-y-6">
                                    <img className="mx-auto aspect-square rounded-full object-cover" src={person.imageUrl} alt={person.name} />
                                    <div className="space-y-2">
                                        <div className="space-y-1 text-center text-lg font-medium leading-6">
                                            <h3>{person.name}</h3>
                                            <p className="text-purple-600">{person.role}</p>
                                        </div>
                                        {/* <ul role="list" className="flex justify-center space-x-5">
                      <li>
                        <a
                          href={person.twitterUrl}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={person.linkedinUrl}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul> */}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        // <div className="bg-white">
        //   <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        //     <div className="space-y-12">
        //       <div className="bz-container mt-0">
        //         <h2>Projects</h2>
        //         <p>
        //           Portrayed here are the work that we are proud to have carried out
        //           for our invaluable customers. These projects will help you to have
        //           a better understanding of what we do and how we do things.
        //         </p>
        //       </div>
        //   <ul
        //     role="list"
        //     className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-4"
        //   >
        //     {people.map((person) => (
        //       <li key={person.name}>
        //         <div className="space-y-6">
        //           <img
        //             className="mx-auto aspect-square w-40 rounded-full  xl:w-56"
        //             src={person.imageUrl}
        //             alt=""
        //           />
        //           <div className="space-y-2">
        //             <div className="space-y-1 text-lg font-medium leading-6">
        //               <h3>{person.name}</h3>
        //               <p className="text-indigo-600">{person.role}</p>
        //             </div>
        //             {/* <ul role="list" className="flex justify-center space-x-5">
        //               <li>
        //                 <a
        //                   href={person.twitterUrl}
        //                   className="text-gray-400 hover:text-gray-500"
        //                 >
        //                   <span className="sr-only">Twitter</span>
        //                   <svg
        //                     className="h-5 w-5"
        //                     aria-hidden="true"
        //                     fill="currentColor"
        //                     viewBox="0 0 20 20"
        //                   >
        //                     <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        //                   </svg>
        //                 </a>
        //               </li>
        //               <li>
        //                 <a
        //                   href={person.linkedinUrl}
        //                   className="text-gray-400 hover:text-gray-500"
        //                 >
        //                   <span className="sr-only">LinkedIn</span>
        //                   <svg
        //                     className="h-5 w-5"
        //                     aria-hidden="true"
        //                     fill="currentColor"
        //                     viewBox="0 0 20 20"
        //                   >
        //                     <path
        //                       fillRule="evenodd"
        //                       d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
        //                       clipRule="evenodd"
        //                     />
        //                   </svg>
        //                 </a>
        //               </li>
        //             </ul> */}
        //           </div>
        //         </div>
        //       </li>
        //     ))}
        //   </ul>
        //     </div>
        //   </div>
        // </div>
    );
}
