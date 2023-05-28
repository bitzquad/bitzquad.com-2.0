import React from "react";
import { LayoutSubPages } from "../../../components";
import Meta from "../../../components/defaults/Meta";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <>
      <LayoutSubPages>
        <Meta
          title="Bitzquad | Contact Us"
          description="Want to inquire about your new project or get to know us better? Contact us directly or write to us."
          keywords="Bitzquad, Contact Bitzquad,  Solutions Beyond Technology, Software Company, Information Systems, Business Process Re-engineering, Branding, Digital Marketing, E-Business services"
          url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
          imagefb={`${process.env.NEXT_PUBLIC_API_URL}/og-img.webp`}
          alt="Want to inquire about your new project or get to know us better? Contact us directly or write to us."
        />
        <div className="bz-container relative mx-auto mt-0 h-full w-full bg-transparent lg:mt-44">
          <div className="mx-0 py-10 md:mx-5  lg:py-0">
            <h1 className="text-3xl font-semibold uppercase lg:text-5xl">
              E-Business
            </h1>
            <p className="mt-4 text-sm tracking-widest text-gray-700 lg:mt-5 lg:text-xl xl:w-8/12">
              Information Systems are dominating the automation of routine work.
              Not only everyday work but also enterprise decision-making.
              Let&lsquo;s harvest the best out of your stake with Bitzquad.{" "}
              <br></br>
              It was well worth the wait. Let&lsquo;s get started.
            </p>
            <p className="mt-4 text-sm tracking-widest text-gray-700 lg:mt-5 lg:text-xl">
              We specially develop bespoke EdTech Platforms such as Learning
              Management Systems, Human Resource Management Systems and Customer
              Relationship Management Systems. These systems benefit enterprises
              in their decision-making and customer handling. Bitzquad has a
              well-defined methodology for connecting with the project
              stakeholders to ensure the promised product is delivered. Our
              competent team is ready to take you through a digital journey
              beyond your expectations.
              <p>
                Feugiat in ante metus dictum at tempor commodo ullamcorper a.
                Faucibus interdum posuere lorem ipsum dolor sit. Augue eget arcu
                dictum varius duis at. Lectus vestibulum mattis ullamcorper
                velit sed. Tempus urna et pharetra pharetra massa. Dictumst
                quisque sagittis purus sit amet volutpat consequat. Cursus
                mattis molestie a iaculis at erat pellentesque adipiscing.
                Semper eget duis at tellus at urna condimentum mattis
                pellentesque. Nec ultrices dui sapien eget mi proin sed.
                Tristique senectus et netus et malesuada fames ac turpis
                egestas. Ut eu sem integer vitae justo eget magna fermentum
                iaculis. Amet purus gravida quis blandit turpis. Nibh venenatis
                cras sed felis eget velit. Nisl suscipit adipiscing bibendum
                est. Odio facilisis mauris sit amet massa vitae tortor
                condimentum. In nibh mauris cursus mattis molestie a iaculis.
                Ultrices neque ornare aenean euismod. Aenean pharetra magna ac
                placerat vestibulum lectus. Aenean pharetra magna ac placerat
                vestibulum lectus. Interdum consectetur libero id faucibus nisl.
                Nisl vel pretium lectus quam. Purus sit amet volutpat consequat.
                Enim nec dui nunc mattis enim ut tellus elementum. Quis eleifend
                quam adipiscing vitae proin sagittis. Quisque sagittis purus sit
                amet volutpat consequat mauris nunc. Risus at ultrices mi tempus
                imperdiet nulla malesuada.
              </p>
              Enim nunc faucibus a pellentesque sit. Mattis molestie a iaculis
              at erat pellentesque adipiscing commodo. Egestas diam in arcu
              cursus euismod quis viverra nibh cras. Diam vulputate ut pharetra
              sit. Gravida dictum fusce ut placerat. Suspendisse interdum
              consectetur libero id. Eget felis eget nunc lobortis mattis
              aliquam. Et leo duis ut diam quam nulla porttitor massa. Odio ut
              enim blandit volutpat maecenas volutpat blandit. Curabitur vitae
              nunc sed velit dignissim sodales ut. Habitant morbi tristique
              senectus et netus et malesuada. Gravida arcu ac tortor dignissim
              convallis aenean et tortor at. Facilisis gravida neque convallis
              a. Tristique risus nec feugiat in fermentum posuere urna nec.
              Ullamcorper sit amet risus nullam eget felis eget nunc. Purus sit
              amet luctus venenatis lectus. Massa id neque aliquam vestibulum
              morbi blandit cursus. Adipiscing diam donec adipiscing tristique
              risus nec. Fermentum iaculis eu non diam. Risus nullam eget felis
              eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi
              tincidunt. Pretium lectus quam id leo in vitae turpis massa sed.
              Sapien nec sagittis aliquam malesuada bibendum arcu vitae
              elementum. Mi in nulla posuere sollicitudin aliquam ultrices
              sagittis orci a. Gravida cum sociis natoque penatibus et magnis
              dis parturient montes. Nibh praesent tristique magna sit amet
              purus gravida quis blandit. Non odio euismod lacinia at quis risus
              sed vulputate odio. Blandit turpis cursus in hac habitasse platea.
              Enim ut tellus elementum sagittis. Gravida cum sociis natoque
              penatibus et magnis dis. Semper viverra nam libero justo. Enim
              diam vulputate ut pharetra sit. Diam in arcu cursus euismod quis
              viverra nibh cras. Nunc vel risus commodo viverra maecenas
              accumsan lacus vel. Rhoncus urna neque viverra justo nec ultrices
              dui sapien eget.
            </p>
          </div>
        </div>
      </LayoutSubPages>
    </>
  );
};

export default Index;
