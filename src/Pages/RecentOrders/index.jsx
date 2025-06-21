import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Recentorders1 from './Recentorders1';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.recentOrdersPageConfig.sections[0]} />
      <Recentorders1 {...config.recentOrdersPageConfig.sections[1]} />
      <Footer1 {...config.recentOrdersPageConfig.sections[2]} />
    </main>
  );
};

export default Page;