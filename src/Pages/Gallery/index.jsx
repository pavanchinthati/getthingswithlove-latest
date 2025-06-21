import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Gallery8 from './Gallery8';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.galleryPageConfig.sections[0]} />
      <Gallery8 {...config.galleryPageConfig.sections[1]} />
      <Footer1 {...config.galleryPageConfig.sections[2]} />
    </main>
  );
};

export default Page;