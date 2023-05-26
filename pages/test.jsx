// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// /*   Imports   */

// import client from "../middleware/request";
// import queryparser from "../middleware/queryparser";
// import Transmit from "../constants/Transmit";

// export const getServerSideProps = async (context) => {
//   const resNews = await client.Get(
//     `http://localhost:3000/api/News?${queryparser.Build(
//       { title: { $regex: "1", $options: "i" } },
//       { title: 1 },
//       10,
//       0
//     )}`
//   );
//   if (!resNews) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { news: resNews.data },
//   };
// };

// export default function Home(props) {
//   const SubscribeNewsletter = async () => {
//     const res = await client.Post(
//       `http://localhost:3000/api/Newsletter/Subscribe`,
//       new Transmit("hari@gamail.com")
//     );
//   };
//   const UnsubscribeNewsletter = async () => {
//     const res = await client.Post(
//       `http://localhost:3000/api/Newsletter/Unsubscribe`,
//       new Transmit("hari@gamail.com")
//     );
//   };
//   const ContactUs = async () => {
//     const res = await client.Post(
//       `http://localhost:3000/api/Contact`,
//       new Transmit({
//         name: "Hari",
//         email: "hari@gamail.com",
//         title: "Test",
//         message: "Test 1234",
//       })
//     );
//   };

//   return (
//     <>
//       <button
//         onClick={SubscribeNewsletter}
//         className="m-2 bg-green-700 px-5 py-2 text-white"
//       >
//         Test Subscribe
//       </button>
//       <button
//         onClick={UnsubscribeNewsletter}
//         className="m-2 bg-red-700 px-5 py-2 text-white"
//       >
//         Test Unsubscribe
//       </button>
//       <button
//         onClick={ContactUs}
//         className="m-2 bg-cyan-700 px-5 py-2 text-white"
//       >
//         Test Contact
//       </button>
//       <textarea rows="100" className="w-full">
//         {JSON.stringify(props.news, null, 2)}
//       </textarea>
//     </>
//   );
// }
export default function Test() {
    return <div>Test</div>;
}
