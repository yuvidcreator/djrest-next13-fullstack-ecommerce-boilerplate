// import Input from "@components/ui/input";
// // import PasswordInput from "@components/ui/password-input";
// import Button from "@components/ui/button";
// import { useForm } from "react-hook-form";
// import Logo from "@components/ui/logo";
// import { useUI } from "@contexts/ui.context";
// import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
// // import { ImGoogle2, ImFacebook2 } from "react-icons/im";
// import Link from "@components/ui/link";
// import { ROUTES } from "@utils/routes";
// import { useTranslation } from "next-i18next";
// import Alert from "@components/ui/alert";
// import { toast } from "react-toastify";
// import { useWindowSize } from "@utils/use-window-size";
// import { useEffect, useState } from "react";

// const SignUpForm: React.FC = () => {
// 	const { t } = useTranslation();
// 	const { width } = useWindowSize();
// 	const [mobileLength, setMobileLength] = useState("");
// 	const { mutate: signUp, isLoading, isError, error, isSuccess } = useSignUpMutation();
// 	const { setModalView, openModal, closeModal } = useUI();
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<SignUpInputType>();

// 	function handleSignIn() {
// 		setModalView("LOGIN_VIEW");
// 		return openModal();
// 	}

// 	const handleMobileLengthChange = (e: any) => {
// 		const limit = 10;
//         setMobileLength(e.target.value.slice(0, limit));
//     };

// 	function onSubmit({ first_name, last_name, email, mobile, send_otp_on_mobile }: SignUpInputType) {
// 		// console.log(first_name, last_name, email, mobile, send_otp_on_mobile);
// 		signUp({
// 			first_name,
// 			last_name,
// 			email,
// 			mobile,
// 			send_otp_on_mobile,
// 			address_line_1: "",
// 			pin_code: "",
// 			city: "",
// 			state: "", 
// 			country: "", 
// 			is_customer: true,
// 			checkout: false
// 		});
// 	}

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
// 	}, [error])

// 	return (
// 		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
// 			<div className="text-center mb-6 pt-2.5">
// 				<div onClick={closeModal}>
// 					<Logo />
// 				</div>
// 				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
// 					{t("common:registration-helper")}{" "}
// 					<Link
// 						href={ROUTES.TERMS}
// 						className="text-heading underline hover:no-underline focus:outline-none"
// 					>
// 						{t("common:text-terms")}
// 					</Link>{" "}
// 					&amp;{" "}
// 					<Link
// 						href={ROUTES.POLICY}
// 						className="text-heading underline hover:no-underline focus:outline-none"
// 					>
// 						{t("common:text-policy")}
// 					</Link>
// 				</p>
// 			</div>
// 			<form
// 				onSubmit={handleSubmit(onSubmit)}
// 				className="flex flex-col justify-center"
// 				noValidate
// 			>
// 				<div className="flex flex-col space-y-4">
// 					<Input
// 						labelKey="forms:label-first-name"
// 						type="text"
// 						variant="solid"
// 						{...register("first_name", {
// 							required: "forms:first-name-required",
// 						})}
// 						errorKey={errors.first_name?.message}
// 					/>
// 					<Input
// 						labelKey="forms:label-last-name"
// 						type="text"
// 						variant="solid"
// 						{...register("last_name", {
// 							required: "forms:last-name-required",
// 						})}
// 						errorKey={errors.last_name?.message}
// 					/>
// 					<Input
// 						labelKey="forms:label-email"
// 						type="email"
// 						variant="solid"
// 						{...register("email", {
// 							required: `${t("forms:email-required")}`,
// 							pattern: {
// 								value:
// 									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// 								message: t("forms:email-error"),
// 							},
// 						})}
// 						errorKey={errors.email?.message}
// 					/>
// 					<Input
// 						labelKey="forms:label-mobile"
// 						type="number"
// 						variant="solid"
// 						{...register("mobile", {
// 							required: `${t("forms:mobile-required")}`,
// 							// pattern: {
// 							// 	value:/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/,
// 							// 	message: t("forms:mobile-error"),
// 							// },
// 						})}
// 						errorKey={errors.mobile?.message}
// 						max={"9999999999"}
// 						min={"0000000001"}
// 						value={mobileLength}
// 						onChange={handleMobileLengthChange}
// 					/>
// 					{/* <PasswordInput
// 						labelKey="forms:label-password"
// 						errorKey={errors.password?.message}
// 						{...register("password", {
// 							required: `${t("forms:password-required")}`,
// 						})}
// 					/> */}
// 					<div className="flex items-center">
// 						<div className="flex items-center flex-shrink-0">
// 							<label className="switch relative inline-block w-10 cursor-pointer">
// 								<input
// 									id="sendotponemail"
// 									type="checkbox"
// 									className="opacity-0 w-0 h-0"
// 									{...register("send_otp_on_mobile")}
// 								/>
// 								<span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
// 							</label>
// 							<label
// 								htmlFor="sendotponemail"
// 								className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
// 							>
// 								{t("forms:label-send-otp-on-mobile")}
// 							</label>
// 						</div>
// 					</div>
// 					<div className="relative">
// 						<Button
// 							type="submit"
// 							loading={isLoading}
// 							disabled={isLoading}
// 							className="h-11 md:h-12 w-full mt-2"
// 						>
// 							{t("common:text-request-otp-for-signup")}
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

// 			{/* <Button
// 				type="submit"
// 				loading={isLoading}
// 				disabled={isLoading}
// 				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
// 			>
// 				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
// 				{t("common:text-login-with-facebook")}
// 			</Button>
// 			<Button
// 				type="submit"
// 				loading={isLoading}
// 				disabled={isLoading}
// 				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
// 			>
// 				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
// 				{t("common:text-login-with-google")}
// 			</Button> */}
// 			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
// 				{t("common:text-have-account")}{" "}
// 				<button
// 					type="button"
// 					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
// 					onClick={handleSignIn}
// 				>
// 					{t("common:text-login")}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default SignUpForm;
