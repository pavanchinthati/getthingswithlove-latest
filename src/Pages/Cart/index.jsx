import React from 'react';
import { config } from "@utils/config";
import Header11 from './Header11';
import Cart1 from './Cart1';
import Footer1 from './Footer1';

const Page = () => {
  return (
    <main>
      <Header11 {...config.cartPageConfig.sections[0]} />
      <Cart1 {...config.cartPageConfig.sections[1]} />
      <Footer1 {...config.cartPageConfig.sections[2]} />
    </main>
  );
};

export default Page;