import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Categories7 from './Categories7';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.categoriesPageConfig.sections[0]} />
      <Categories7 {...config.categoriesPageConfig.sections[1]} />
      <Footer1 {...config.categoriesPageConfig.sections[2]} />
    </main>
  );
};

export default Page;