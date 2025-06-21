import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Herobanner39 from './Herobanner39';
import Categoryshowcase7 from './Categoryshowcase7';
import Ecommercecatalogue3 from './Ecommercecatalogue3';
import Aboutus3 from './Aboutus3';
import Ourservices5 from './Ourservices5';
import Companyshowcase6 from './Companyshowcase6';
import Companyshowcase5 from './Companyshowcase5';
import Testimonial1 from './Testimonial1';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.homePageConfig.sections[0]} />
      <Herobanner39 {...config.homePageConfig.sections[1]} />
      <Categoryshowcase7 {...config.homePageConfig.sections[2]} />
      {/* <Ecommercecatalogue3 {...config.homePageConfig.sections[3]} /> */}
      <Aboutus3 {...config.homePageConfig.sections[4]} />
      {/* <Ourservices5 {...config.homePageConfig.sections[5]} /> */}
      <Companyshowcase6 {...config.homePageConfig.sections[6]} />
      {/* <Companyshowcase5 {...config.homePageConfig.sections[7]} /> */}
      <Testimonial1 {...config.homePageConfig.sections[8]} />
      <Footer1 {...config.homePageConfig.sections[9]} />
    </main>
  );
};

export default Page;