"use client"

import Input from "@/components/ui/input";
// import PasswordInput from "@/components/ui/password-input";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@/components/ui/logo";
import { useUI } from "@/contexts/ui.context";
// import { useLoginUpConfirmOTPMutation } from "@framework/auth/use-login-confirm-otp";
// import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import Link from "next/link";
// import { ROUTES } from "@utils/routes";
import { toast } from "react-toastify";
import { useWindowSize } from "@/components/utils/use-window-size";
import { useEffect, useState } from "react";
import { Otptype } from "@/types";
// import { redirect, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useConfirmLoginOtpMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";



const SignUpForm: React.FC = () => {
	
	const { width } = useWindowSize();
    const [otpLength, setOtpLength] = useState('');

    const handleOTPLengthChange = (e: any) => {
		const limit = 6;
        setOtpLength(e.target.value.slice(0, limit));
    };

	// const router = useRouter();
	const dispatch = useAppDispatch();
	const [confirmLoginOtp, { isLoading }] = useConfirmLoginOtpMutation();

	const { setModalView, openModal, closeModal } = useUI();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Otptype>();

	// function handleSignup() {
	// 	setModalView("SIGN_UP_VIEW");
	// 	return openModal();
	// }

    function handleLogin() {
        setModalView("LOGIN_VIEW");
        return openModal();
    }

	function onSubmit({ otp }: Otptype) {
		
		// console.log(otp);
		confirmLoginOtp({ otp })
			.unwrap()
			.then(() => {
				dispatch(setAuth());
				openModal();
				toast.success('OTP Verified Successfully');
				// redirect("/accounts/profile");
				// router.push('/accounts/profile');
				// setModalView("LOGIN_CONFIRM_OTP");
				closeModal();
			})
			.catch(() => {
				toast.error('Something went wrong');
			});
	}

	useEffect(()=>{
		// if (isError) {
		// 	// console.log(error?.response?.data?.message)
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

		// console.log(loginToken);

		// if (loginToken) {
		// 	setModalView("LOGIN_CONFIRM_OTP");
		// 	openModal();
		// }

		// if (signupToken) {
		// 	setModalView("SIGNUP_CONFIRM_OTP");
		// 	openModal();
		// }
	}, [])

	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				{/* <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("common:registration-helper")}{" "}
					<Link
						href={ROUTES.TERMS}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-terms")}
					</Link>{" "}
					&amp;{" "}
					<Link
						href={ROUTES.POLICY}
						className="text-heading underline hover:no-underline focus:outline-none"
					>
						{t("common:text-policy")}
					</Link>
				</p> */}
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-4 justify-center text-center items-center">
                        <Input
                            labelKey="Enter OTP"
                            type="number"
                            variant="solid"
                            {...register("otp", {
                                required: "OTP required",
                            })}
                            errorKey={errors.otp?.message}
                            max={"999999"}
                            min={"000001"}
                            value={otpLength}
                            onChange={handleOTPLengthChange}
                        />
                        
                        <div className="relative">
                            <Button
                                type="submit"
                                loading={isLoading}
                                disabled={isLoading}
                                // disabled={<=6}
                                className="h-11 md:h-12 w-full mt-2"
                            >
                                {"Confirm Login OTP"}
                            </Button>
                        </div>
                    </div>
					
					{/* <Input
						labelKey="forms:label-mobile"
						type="number"
						variant="solid"
						{...register("mobile", {
							required: `${t("forms:mobile-required")}`,
							// pattern: {
							// 	value:/(\[[0-9]{0,9}\])$/,
							// 	message: t("forms:mobile-error"),
							// },
						})}
						errorKey={errors.mobile?.message}
					/> */}
					{/* <PasswordInput
						labelKey="forms:label-password"
						errorKey={errors.password?.message}
						{...register("password", {
							required: `${t("forms:password-required")}`,
						})}
					/> */}
					{/* <div className="flex items-center">
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
								{t("forms:label-send-otp-on-mobile")}
							</label>
						</div>
					</div> */}
				</div>
			</form>

			{/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{"Or"}
				</span>
			</div>

			<Button
				type="submit"
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
			>
				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
				{("common:text-login-with-facebook")}
			</Button>
			<Button
				type="submit"
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{("common:text-login-with-google")}
			</Button>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{"Dont have an Account"}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignup}
				>
					{"Register"}
				</button>
			</div> */}

            <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{"Or"}
				</span>
			</div>

            <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{"OTP Not Recieved"}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleLogin}
				>
					{"Request New OTP"}
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;
