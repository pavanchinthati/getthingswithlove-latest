import React from 'react';
import defaultStyles from "./HamBurger.module.scss";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useHeaderCustomizer } from '@headerCustomizer';
import Image from "@customElements/Image/Image";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const HamBurger = React.memo(({ logo, navLinks, handleRedirectToHomePage, handleRedirectCheckoutPage, handleRedirectToRecentOrderPage }) => {
    const { toggleHamburgerMenu,handleUserLogOut } = useHeaderCustomizer();
    const { cartData } = useSelector(state => state.cart) || {};
    const cartItems = cartData?.cartitem || [];

    return (
        <div className={defaultStyles.hamBurgerMenu}>
            <div className={defaultStyles.hamBurgerMenuHeader}>
                <Image
                    id={logo?.id}
                    style={logo?.style}
                    imgSrc={logo?.src}
                    alt={logo?.alt}
                    className={defaultStyles?.logo}
                    elementType={"Logo"}
                    onClick={handleRedirectToHomePage}
                />
                <IoMdClose onClick={() => toggleHamburgerMenu(false)} />
            </div>
            <div className={defaultStyles.hamBurgerNavLinks}>
                {navLinks?.children?.map((link, idx) => {
                    let formattedLinks = `${link?.href}`;
                    return (
                        <p onClick={() => toggleHamburgerMenu(false)}>
                            <Link to={formattedLinks} key={idx} className={defaultStyles.link} >
                                {link?.text}
                            </Link>
                        </p>
                    )
                })}
                <p
                    onClick={() => {
                        toggleHamburgerMenu(false);
                        handleRedirectToRecentOrderPage();
                    }}
                    className={defaultStyles.link}
                >
                    Recent Orders
                </p>
            </div>
            <div className={defaultStyles.authenticatedBtns}>
                <button className={defaultStyles.addToCartBtn} >
                    <FaShoppingCart size={25} onClick={handleRedirectCheckoutPage} />
                    <span className={defaultStyles.noOfItems}>{cartItems?.length || 0}</span>
                </button>
                <button className={defaultStyles.logoutBtn} onClick={handleUserLogOut}>
                    <IoLogOutOutline size={22} />

                </button>
            </div>
        </div>
    )
})

export default HamBurger