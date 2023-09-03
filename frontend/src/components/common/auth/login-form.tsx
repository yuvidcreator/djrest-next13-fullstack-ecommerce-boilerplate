"use client"

import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
// import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUI } from "@/contexts/ui.context";
import Logo from "@/components/ui/logo";
// import { ImGoogle2, ImFacebook2 } from "react-icons/im";
// import Router from "next/router";
import { useWindowSize } from "@/components/utils/use-window-size";
import { toast } from "react-toastify";
import { LoginInputType } from "@/types";
import { useRequestLoginOtpMutation } from "@/redux/features/authApiSlice";

const LoginForm: React.FC = () => {
	
	const { width } = useWindowSize();
	// const [ mobileLength, setMobileLength ] = useState();
	const { setModalView, openModal, closeModal } = useUI();

	// const router = useRouter();
	const [requestLoginOtp, { isLoading }] = useRequestLoginOtpMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputType>();

	// const handleNumChange = (e: any) => {
	// 	const limit = 10;
    //     setMobileLength(e.target.value.slice(0, limit));
    // };

	function onSubmit({ email_or_mobile, send_otp_on_mobile, checkout }: LoginInputType) {
		// console.log(email_or_mobile, send_otp_on_mobile);
		if (checkout == (undefined || null || false)){ checkout = false};

		// if (send_otp_on_mobile) {
		// 	const num = Number(email_or_mobile);
		// 	console.log(num);
		// }

		requestLoginOtp({ email_or_mobile, send_otp_on_mobile })
			.unwrap()
			.then(() => {
				toast.success('OTP Sent Successfully');
				// router.push('/accounts/confirmotp');
				setModalView("LOGIN_CONFIRM_OTP");
				openModal();
			})
			.catch(() => {
				toast.error('Something went wrong');
				// closeModal();
			});
	}
	// function handelSocialLogin() {
	// 	login({
	// 		email_or_mobile: "demo@demo.com",
	// 		send_otp_on_mobile: false,
	// 		remember_me: true,
	// 	});
	// }

	useEffect(()=>{
		// console.log(loginToken);

		// if (isError) {
		// 	console.log(error?.response?.data?.message)
		// 	toast(`${error?.response?.data?.message}`, {
		// 		progressClassName: "fancy-progress-bar",
		// 		position: width > 768 ? "bottom-right" : "top-right",
		// 		autoClose: 2000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 	});
		// }

		// if (loginToken) {
		// 	setModalView("LOGIN_CONFIRM_OTP");
		// 	openModal();
		// }

		// if (signupToken) {
		// 	setModalView("SIGNUP_CONFIRM_OTP");
		// 	openModal();
		// }
	},[]);

	// function handleSignUp() {
	// 	// Cookies.remove("login_otp_token");
	// 	// Cookies.remove("signup_otp_token");
	// 	setModalView("SIGN_UP_VIEW");
	// 	return openModal();
	// }

	function handleBackToHome() {
		// Cookies.remove("login_otp_token");
		// Cookies.remove("signup_otp_token");
		// setModalView("SIGN_UP_VIEW");
		// Router.push("/");
		closeModal();
	}

	// function handleForgetPassword() {
	// 	setModalView("FORGET_PASSWORD");
	// 	return openModal();
	// }
	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
		{/* <div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8"> */}
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{"Signup / Login With OTP"}
				</p>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					Even if you don't have an Active account you can still use valid email or mobile to get otp.
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
					<Input
						labelKey="Enter Valid Email or Mobile No."
						type={"email"}
						variant="solid"
						{...register("email_or_mobile", {
							required: `${"Email or Mobile"}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s"]+(\.[^<>()\[\]\\.,;:\s"]+)*)|(".+"))((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                // value: /^ $/,
								message: "Enter Valid Email or Mobile Number",
							},
						})}
						errorKey={errors.email_or_mobile?.message}
					/>
					
					{/* <Input
						labelKey="forms:label-email"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${t("forms:email-required")}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t("forms:email-error"),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<PasswordInput
						labelKey="forms:label-password"
						errorKey={errors.password?.message}
						{...register("password", {
							required: `${t("forms:password-required")}`,
						})}
					/> */}
					{/* <div className="flex items-center justify-center">
						<div className="flex items-center flex-shrink-0">
							<label className="switch relative inline-block w-10 cursor-pointer">
								<input
									id="remember"
									type="checkbox"
									className="opacity-0 w-0 h-0"
									{...register("remember_me")}
								/>
								<span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
							</label>
							<label
								htmlFor="remember"
								className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
							>
								{t("forms:label-remember-me")}
							</label>
						</div>
						<div className="flex ms-auto">
							<button
								type="button"
								onClick={handleForgetPassword}
								className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
							>
								{t("common:text-forgot-password")}
							</button>
						</div>
					</div> */}

					<div className="flex items-center">
						<div className="flex items-center flex-shrink-0">
							<label className="switch relative inline-block w-10 cursor-pointer">
								<input
									id="sendotponemail"
									type="checkbox"
									className="opacity-0 w-0 h-0"
									{...register("send_otp_on_mobile")}
								/>
								<span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
							</label>
							<label
								htmlFor="sendotponemail"
								className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
							>
								{"Get otp on mobile"}
							</label>
						</div>
					</div>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							{"Request OTP for Login"}
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{"Or"}
				</span>
			</div>
			{/* <Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
				onClick={handelSocialLogin}
			>
				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-facebook")}
			</Button>
			<Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
				onClick={handelSocialLogin}
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-google")}
			</Button> */}
			{/* <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{"No Account"}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					{"Register"}
				</button>
			</div> */}
			<div className="text-sm sm:text-base text-body text-center mt-6 mb-1">
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleBackToHome}
				>
					{"Back to Home"}
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
