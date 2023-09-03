// import { useEffect, useState } from "react";
// // import { useSignUpConfirmOTPMutation } from "@utils/auth/use-signup-confirm-otp";
// import { Otptype } from "@framework/types";
// import { useForm } from "react-hook-form";
// import { useUI } from "@contexts/ui.context";
// import Button from "@components/ui/button";
// import Input from "@components/ui/input";
// // import Link from "@components/ui/link";
// import Logo from "@components/ui/logo";
// import { useSignUpConfirmOTPMutation } from "@framework/auth/use-signup-confirm-otp";
// import { useTranslation } from "next-i18next";
// import Cookies from "js-cookie";
// import { getLoginOTPTxnID, getSignupOTPTxnID } from "@framework/utils/get-token";
// import { toast } from "react-toastify";
// import { useWindowSize } from "react-use";
// // import { ROUTES } from "@utils/routes";






// const SignUpConfirmOTPForm: React.FC = () => {
//     const { t } = useTranslation();
// 	const { width } = useWindowSize();
// 	const [otpLength, setOtpLength] = useState('');
// 	const loginToken = getLoginOTPTxnID();
// 	const signupToken = getSignupOTPTxnID();
//     const { setModalView, openModal, closeModal } = useUI();
	
//     const handleOTPLengthChange = (e: any) => {
// 		const limit = 6;
//         setOtpLength(e.target.value.slice(0, limit));
//     };

// 	const {mutate: confrimOTP, isLoading, isSuccess, isError, error} = useSignUpConfirmOTPMutation();

// 	// const { isLoding, isSccss, user, userId, isAuthenticated } = useSelector(state => state?.auth);

//     const {handleSubmit, register, formState: { errors },} = useForm<Otptype>();

//     function onSubmit({ otp }: Otptype) {
// 		// console.log(otp);
// 		// dispatch(signupConfirmOtp(otp));
//         // setModalView("SIGNUP_SET_PASSWORD");
// 		// return openModal();
//         confrimOTP({
// 			otp
// 		});
//         if (isSuccess && !isLoading) {
//             return closeModal();
//         }
        
//         if (isError) {
//             setModalView("SIGNUP_CONFIRM_OTP");
//             return openModal();
//         }
// 	}


//     // function otpNotRecievedModal() {
//     //     setModalView('SIGNUP_WITH_OTP');
// 	// 	return openModal();
//     // }

// 	function handleSignup() {
// 		Cookies.remove("signup_otp_token");
// 		Cookies.remove("login_otp_token");
// 		setModalView("SIGN_UP_VIEW");
// 		return openModal();
// 	}

//     function handleLogin() {
// 		Cookies.remove("login_otp_token");
// 		Cookies.remove("signup_otp_token");
//         setModalView("LOGIN_VIEW");
//         return openModal();
//     }

// 	useEffect(()=>{
// 		if (isError) {
// 			// console.log(error?.response?.data?.message)
// 			toast(`${error?.response?.data?.message}`, {
// 				progressClassName: "fancy-progress-bar",
// 				position: width > 768 ? "bottom-right" : "top-right",
// 				autoClose: 2000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 			});
// 		}

// 		// console.log(loginToken);

// 		if (loginToken) {
// 			setModalView("LOGIN_CONFIRM_OTP");
// 			openModal();
// 		}

// 		if (signupToken) {
// 			setModalView("SIGNUP_CONFIRM_OTP");
// 			openModal();
// 		}
// 	}, [error])

//     return (
//         <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
// 			<div className="text-center mb-6 pt-2.5">
// 				<div onClick={closeModal}>
// 					<Logo />
// 				</div>
// 				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
// 					{("We sent Signup OTP on Entered Email/Mobile")}{" "}
// 					{/* <Link
// 						href={ROUTES.TERMS}
// 						className="text-heading underline hover:no-underline focus:outline-none"
// 					>
// 						{("Terms")}
// 					</Link>{" "}
// 					&amp;{" "}
// 					<Link
// 						href={ROUTES.POLICY}
// 						className="text-heading underline hover:no-underline focus:outline-none"
// 					>
// 						{("Privacy Policy")}
// 					</Link> */}
// 				</p>
// 			</div>
// 			<form
// 				onSubmit={handleSubmit(onSubmit)}
// 				className="flex flex-col justify-center"
// 				noValidate
// 			>
// 				<div className="flex flex-col space-y-4 justify-center text-center items-center">
//                     <Input
// 						labelKey="Enter OTP"
// 						type="number"
// 						variant="solid"
// 						{...register("otp", {
// 							required: "OTP required",
// 						})}
// 						errorKey={errors.otp?.message}
// 						max={"999999"}
// 						min={"000001"}
// 						value={otpLength}
// 						onChange={handleOTPLengthChange}
// 					/>
					
// 					<div className="relative">
// 						<Button
// 							type="submit"
// 							loading={isLoading}
// 							disabled={isLoading}
// 							// disabled={<=6}
// 							className="h-11 md:h-12 w-full mt-2"
// 						>
// 							{/* {("Confirm OTP")} */}
// 							{t("text-confirm-signup-otp")}
// 						</Button>
// 					</div>
// 				</div>
// 			</form>
// 			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
// 				<hr className="w-full border-gray-300" />
// 				<span className="absolute -top-2.5 px-2 bg-white">
// 					{t("common:text-or")}
// 				</span>
// 			</div>
			
// 			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
// 				{("Signup OTP Not Recieved?")}{" "}
// 				<button
// 					type="button"
//                     // disabled={true}
// 					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
// 					onClick={handleSignup}
// 				>
// 					{("Request OTP Again")}
// 				</button>
// 			</div>
// 		</div>
//     )
// }


// export default SignUpConfirmOTPForm;