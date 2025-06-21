import React from 'react';
import defaultStyles from "./Header11.module.scss";

const AuthBtns = () => {
    return (
        <div className={defaultStyles.authBtns}>
            <button
                id={signInBtn?.id}
                style={signInBtn?.style}
                className={defaultStyles?.signInBtn}
                onClick={() => toggleAuthMode("sign-in")
                }
            >
                {signInBtn?.text || "Sign In"}
            </button>
            <button
                id={signUpBtn?.id}
                style={signUpBtn?.style}
                className={defaultStyles?.signUpBtn}
                onClick={() => toggleAuthMode("sign-up")}
            >
                {signUpBtn?.text}
            </button>
            {currAuthMode &&
                <div className={defaultStyles.signInModal} ref={signInModalRef}>
                    <div className={defaultStyles.triangle}></div>
                    <form onSubmit={handleSubmitForm}>
                        {currAuthMode === "sign-up" &&
                            <div className={defaultStyles.labelledInput}>
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    required={true}
                                    name="userName"
                                    value={formData?.userName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        }
                        <div className={defaultStyles.labelledInput}>
                            <label>Mobile No</label>
                            <input
                                type="tel"
                                required={true}
                                name="mobile"
                                value={formData?.mobile}
                                onChange={handleInputChange}

                            />
                        </div>
                        {
                            (isOtpSent) &&
                            <>
                                <div className={defaultStyles.labelledInput}>
                                    <label>OTP</label>
                                    <input
                                        type="text"
                                        required={true}
                                        name="otp"
                                        value={formData?.otp}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button className={defaultStyles.resendOtpBtn} type='button' onClick={handleSendOtp}>Didn't recieve OTP, Try Again..</button>
                            </>

                        }
                        <button
                            className={defaultStyles.loginBtn}
                            type='submit'
                            onSubmit={handleSubmitForm}
                        >
                            {isSubmittingForm ?
                                <Loader className={defaultStyles.submittingLoader} /> :
                                <span>
                                    {getCurrBtnText()}
                                </span>
                            }
                        </button>
                        <span
                            className={`${defaultStyles.infoMsg} ${infoMsg?.type == "error" ? defaultStyles.errMsg : defaultStyles.successMsg}`}
                        >
                            {infoMsg?.msg}
                        </span>
                    </form>
                </div>
            }
        </div>
    )
}

export default AuthBtns