import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { tenantAppAPI } from '@api';
import { checkIsLoggedIn, getUserInfo, setUserToken, errorMsg } from "@utils/tenant-site-utils";
import { toast } from 'react-toastify';
import { tenantId } from '@assets/Globals';
import { actionsCreator } from '@redux/actions/actionsCreator';
import { useDispatch } from 'react-redux';

const HeaderContext = createContext(null);

export function HeaderProvider({ children }) {
    const [isSubmittingForm, toggleIsSubmittingForm] = useState(false);
    const [openHamburgerMenu, toggleHamburgerMenu] = useState(false);
    const [isOtpSent, toggleIsOtpSent] = useState(false);
    const [formData, setFormData] = useState({ userName: "", password: "", mobile: "", otp: "", email: "", otpToken: "" });
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [infoMsg, setInfoMsg] = useState({ type: "", msg: "" });
    const userInfo = useRef({});
    const [currAuthMode, setCurrAuthMode] = useState(null);
    const dispatch = useDispatch();

    const getCurrBtnText = () => {
        if (currAuthMode === "sign-up" && isOtpSent) {
            return "Verify OTP";
        }
        if (currAuthMode === "sign-in" && !isOtpSent) {
            return "Get OTP";
        }
        if (currAuthMode === "sign-in" && isOtpSent) {
            return "Sign In";
        }
        return "Sign Up";
    }

    const handleRegisterUser = async () => {
        try {
            toggleIsSubmittingForm(true);
            const payload = {
                name: formData?.userName,
                phone_number: formData?.mobile,
            };
            const { data } = await tenantAppAPI.register(payload);
            setInfoMsg({ type: "success", msg: data?.msg || "OTP Sent" });
            toggleIsOtpSent(true);
            setFormData(prevState => ({
                ...prevState,
                otpToken: data?.otp,
            }));
            setCurrAuthMode("sign-in");
            setTimeout(() => {
                setInfoMsg({ type: "success", msg: data?.msg || "Please verify the OTP" });
            }, 1000);
        } catch (err) {
            console.error("Error while submitting form", err);
            const errMsg = errorMsg(err) || "Something went Wrong";
            setInfoMsg({ type: "error", msg: errMsg });
        } finally {
            toggleIsSubmittingForm(false);
        }
    }

    const handleVerifyOtp = async () => {
        try {
            toggleIsSubmittingForm(true);
            const payload = {
                phone_number: formData?.mobile,
                session_id: formData?.otpToken,
                otp: formData?.otp
            };
            const { data } = await tenantAppAPI.verifyOtp(payload);
            setFormData({ mobile: "", otp: "", otpToken: "" });
            userInfo.current = data?.user;
            if (tenantId) {
                setUserToken(tenantId, data);
            }
            setCurrAuthMode(null);
            setInfoMsg({ type: "success", msg: "OTP Mached Successfully!" });
            setIsloggedIn(true);
            toast.success("You are Logged In..");
        } catch (err) {
            console.error("Error while submitting form", err);
            const errMsg = errorMsg(err) || "OTP Mismatched or Expired.Try Again!";
            setInfoMsg({ type: "error", msg: errMsg });
        } finally {
            toggleIsSubmittingForm(false);
        }
    }

    const handleUserLogOut = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth')) || {};
            if (auth[String(tenantId)]) {
                delete auth[String(tenantId)];
                localStorage.setItem('auth', JSON.stringify(auth));
                setIsloggedIn(false);
            } else {
                console.warn(`No data found for tenant: ${tenantId}`);
            }
        } catch (err) {
            toast.error("Error while logging off");
        }
    }

    const handleSendOtp = async () => {
        try {
            toggleIsSubmittingForm(true);
            const payload = {
                phone_number: formData?.mobile,
            };
            const { data } = await tenantAppAPI.sendOtp(payload);
            setInfoMsg({ type: "success", msg: data?.msg || "OTP Sent" });
            toggleIsOtpSent(true);
            setFormData(prev => ({ ...prev, otpToken: data?.message }));
        } catch (err) {
            console.error("Error while submitting form", err);
            const errMsg = errorMsg(err) || "Something went Wrong";
            setInfoMsg({ type: "error", msg: errMsg });
        } finally {
            toggleIsSubmittingForm(false);
        }
    }

    useEffect(() => {
        const loggedIn = checkIsLoggedIn(tenantId);
        setIsloggedIn(loggedIn);
        const user = getUserInfo(tenantId);
        userInfo.current = user;
    }, [tenantId]);
     useEffect(() => {
        if (isLoggedIn) {
            dispatch(actionsCreator.FETCH_CART_DETAILS());
        }
    }, [dispatch,isLoggedIn]);

    return (
        <HeaderContext.Provider value={{
            isSubmittingForm,
            toggleIsSubmittingForm,
            isOtpSent,
            toggleIsOtpSent,
            currAuthMode,
            setCurrAuthMode,
            userInfo,
            formData,
            setFormData,
            isLoggedIn,
            setIsloggedIn,
            openHamburgerMenu,
            toggleHamburgerMenu,
            infoMsg,
            setInfoMsg,
            handleRegisterUser,
            handleVerifyOtp,
            handleUserLogOut,
            handleSendOtp,
            getCurrBtnText
        }}>
            {children}
        </HeaderContext.Provider>
    );
}

export const useHeaderCustomizer = () => {
    const context = useContext(HeaderContext);
    if (!context) throw new Error('Context not added');
    return context;
}