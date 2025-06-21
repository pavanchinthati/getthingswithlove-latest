import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Privacypolicy1 from './Privacypolicy1';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.privacyPolicyPageConfig.sections[0]} />
      <Privacypolicy1 {...config.privacyPolicyPageConfig.sections[1]} />
      <Footer1 {...config.privacyPolicyPageConfig.sections[2]} />
    </main>
  );
};

export default Page;