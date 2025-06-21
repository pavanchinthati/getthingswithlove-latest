import React, { useState, useRef, useEffect } from 'react'
import Container from '@customElements/Container/Container';
import Image from "@customElements/Image/Image";
import defaultStyles from "./Header11.module.scss";
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from "react-router-dom";
import Loader from "@components/Loader";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useHeaderCustomizer } from '@headerCustomizer';
import HamBurger from './HamBurger';
import SearchBar from './SearchBar/SearchBar';

const Header11 = React.memo((props) => {
    const { currAuthMode, isLoggedIn, setCurrAuthMode, formData, setInfoMsg, setFormData, handleSendOtp, handleRegisterUser, handleVerifyOtp, isOtpSent, toggleHamburgerMenu, isSubmittingForm, getCurrBtnText, infoMsg, userInfo, handleUserLogOut, openHamburgerMenu } = useHeaderCustomizer();
    // console.log(userInfo)
    const { logo, navLinks, signInBtn, signUpBtn } = props?.children;
    // console.log(navLinks)
    const [openProfileModal, toggleOpenProfileModal] = useState(false);
    const { cartData } = useSelector(state => state.tenantSiteCart) || {};
    const cartItems = cartData?.cartitem || [];

    const signInModalRef = useRef(null);
    const profileModalRef = useRef(null);
    const history = useHistory();
    // const isBuilding = useSelector(state => state.animationDetails.isBuilding);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (signInModalRef.current && !signInModalRef.current.contains(event.target)) {
                setCurrAuthMode(null);
            }
        };
        if (currAuthMode) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [currAuthMode]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileModalRef.current && !profileModalRef.current.contains(event.target)) {
                toggleOpenProfileModal(false);
            }
        };
        if (openProfileModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openProfileModal]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (!isOtpSent && currAuthMode === "sign-in") {
            await handleSendOtp();
        } else if (currAuthMode === "sign-up") {
            await handleRegisterUser();
        } else if (isOtpSent && currAuthMode === "sign-in") {
            await handleVerifyOtp();
        }
    }

    const toggleAuthMode = (newMode) => {
        setCurrAuthMode(newMode);
        setInfoMsg({ type: "", msg: "" });
    }
    const handleRedirectCheckoutPage = () => {
        history.push(`/cart`);
    }
    const handleRedirectToRecentOrderPage = () => {
        history.push(`/recent-order`);
    }
    const handleRedirectToHomePage = () => {
        history.push(`/`)
    }
    // console.log(currPage)
    return (
        <Container
            id={props?.id}
            style={props?.style}
            sectionIdx={props?.index}
            className={`${defaultStyles.headerWrapper}`}
            isWrapper={true}
            htmlElement={"header"}
            elementType={"Header"}
        // positionType = {currPage === "home" ? "absolute" : "static"}
        >
            <Image
                id={logo?.id}
                style={logo?.style}
                sectionIdx={props?.index}
                imgSrc={logo?.src}
                alt={logo?.alt}
                className={defaultStyles?.logo}
                elementType={"Logo"}
                onClick={handleRedirectToHomePage}
            />
            <Container
                id={navLinks?.id}
                style={navLinks?.style}
                sectionIdx={props?.index}
                className={defaultStyles?.navLinks}
                elementType={"Nav Links"}
                htmlElement={"nav"}
            >
                {navLinks?.children?.map((link, idx) => {
                    let formattedLinks = `${link?.href}`;
                    return (
                        <Link to={formattedLinks} key={idx} className={defaultStyles.link}>
                            {link?.text}
                        </Link>
                    )
                })}
            </Container>

            <SearchBar />
            <div className={`flex items-center`}>
                {isLoggedIn ? (
                    <div className={defaultStyles.authenticatedBtns}>
                        <button className={defaultStyles.addToCartBtn} >
                            <FaShoppingCart size={25} onClick={handleRedirectCheckoutPage} />
                            <span className={defaultStyles.noOfItems}>{cartItems?.length || 0}</span>
                        </button>
                        <button className={defaultStyles.profileIcon} >
                            <CgProfile size={25} onClick={() => toggleOpenProfileModal(prev => !prev)} />
                            {openProfileModal && (
                                <div className={defaultStyles.profileModal} ref={profileModalRef}>
                                    <span>{`Hey, ${String(userInfo.current?.name).split(" ")[0] || "User"}`}</span>
                                    <button className={defaultStyles.recentOrdersBtn} onClick={handleRedirectToRecentOrderPage}>
                                        Recent Orders
                                    </button>
                                    <button className={defaultStyles.logoutBtn} onClick={handleUserLogOut}>
                                        <IoLogOutOutline size={22} />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            )}
                        </button>
                    </div>
                ) : null}
            </div>
            {
                openHamburgerMenu &&
                <HamBurger
                    logo={logo}
                    navLinks={navLinks}
                    handleRedirectToHomePage={handleRedirectToHomePage}
                    handleRedirectCheckoutPage={handleRedirectCheckoutPage}
                    handleRedirectToRecentOrderPage={handleRedirectToRecentOrderPage}
                />
            }

        </Container>
    )
});

export default Header11