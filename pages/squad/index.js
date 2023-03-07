import React, { useState } from "react";
import { motion } from "framer-motion";
import { LayoutSubPages } from "../../components";
import Link from "next/link";
import { members } from "../../constants/members";
import Meta from "../../components/defaults/Meta";
const cardColors = [
  "#9FD0FB",
  "#E6CAA4",
  "#98A8FF",
  "#F5F5F5",
  "#C9DBCC",
  "#F5F5F5",
  "#9FD0FB",
];
import { useRouter } from "next/router";
const types = [
  { name: "All", value: -1 },
  { name: "Management", value: 1 },
  { name: "Development", value: 2 },
  { name: "Design", value: 3 },
];

const Index = () => {
  const router = useRouter();
  const [selCat, setSelCat] = useState(-1);
  return (
    <LayoutSubPages>
      <Meta
        title="Bitzquad | Our Squad"
        description="We admire and respect professionalism, integrity, sportsmanship, transparency and modesty. And we aspire to cultivate these qualities within the work
                environment as we grow.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
        keywords="Bitzquad, Bitzquad Members, Bitzquad Team, Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
        url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
        imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
        alt="We admire and respect professionalism, integrity, sportsmanship, transparency and modesty. And we aspire to cultivate these qualities within the work
                environment as we grow.  We strive to provide sustaining digital solutions in Information Systems, Business Process Re-engineering, Branding and Digital Marketing, and
                            E-Business services that serve our stakeholders' best interests."
      />
      <div
        data-scroll-section
        className="bz-container relative mx-auto mt-0 h-full w-full bg-gray-50 md:bg-transparent lg:mt-44"
      >
        <div className=" py-10 lg:px-5 lg:py-0">
          <h1 className="text-3xl font-semibold lg:text-5xl">Our Squad</h1>
          <p className="mt-4 text-sm  tracking-widest text-gray-700 lg:mt-5 lg:text-xl xl:w-7/12">
            Meet our squad that makes your digital experience better with
            solutions beyond technology. <br></br>
            <br></br>
            We admire and respect professionalism, integrity, sportsmanship,
            transparency and modesty. And we aspire to cultivate these qualities
            within the work environment as we grow.
          </p>
          <div className="mt-16 flex flex-row flex-wrap gap-x-6 text-2xl">
            {types.map((v) => (
              <motion.span
                key={v.value}
                className={v.value == selCat ? "underline" : "underline-link"}
                data-cursor="-opaque"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}
                onClick={() => setSelCat(v.value)}
              >
                {v.name}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.div className="mb-28 grid grid-cols-2 gap-y-3 gap-x-4 md:grid-cols-3  lg:mt-20 lg:grid-cols-4 lg:gap-y-10  lg:gap-x-6 lg:px-10">
          {members
            .filter((f) => (selCat == -1 ? true : f.type.includes(selCat)))
            .map((member, index) => (
              <MemberCard key={index} member={member} index={index} />
            ))}
        </motion.div>
      </div>
    </LayoutSubPages>
  );
};

export const MemberCard = ({ member, index }) => {
  return (
    <Link href={`/squad/${member.id}`}>
      <motion.div className="cursor-pointer group">
        <motion.div
          className="relative  overflow-hidden"
          style={{
            backgroundColor:
              member.bgColor || cardColors[index % cardColors.length],
          }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={member.img}
            className=" w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease:"easeInOut" }}
          />
        </motion.div>
        <div className="">
          <h3 className="mt-1 text-base font-bold uppercase lg:mt-4 lg:text-3xl ">
            {member.firstName}
          </h3>
          <h3 className="mt-0 text-base font-bold uppercase lg:text-xl">
            {member.lastName}
          </h3>

          <h5 className=" text-sm text-gray-700 lg:text-lg">
            {member.role.text}
          </h5>
        </div>
      </motion.div>
    </Link>
  );
};

export default Index;
