import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Contactus4 from './Contactus4';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.contactUsPageConfig.sections[0]} />
      <Contactus4 {...config.contactUsPageConfig.sections[1]} />
      <Footer1 {...config.contactUsPageConfig.sections[2]} />
    </main>
  );
};

export default Page;