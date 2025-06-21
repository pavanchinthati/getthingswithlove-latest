import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Aboutus1 from './Aboutus1';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.aboutUsPageConfig.sections[0]} />
      <Aboutus1 {...config.aboutUsPageConfig.sections[1]} />
      <Footer1 {...config.aboutUsPageConfig.sections[2]} />
    </main>
  );
};

export default Page;