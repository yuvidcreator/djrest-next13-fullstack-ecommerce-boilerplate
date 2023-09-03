"use client";

import { useUI } from "@/contexts/ui.context";
import Modal from "./modal";
import Newsletter from "@/components/ui/newsletter";
import dynamic from "next/dynamic";


const LoginForm = dynamic(() => import("@/components/common/auth/login-form"));
const LoginConfirmOTPForm = dynamic(() => import("@/components/common/auth/login-confirm-otp"));
// const SignUpForm = dynamic(() => import("@components/auth/sign-up-form"));
// const SignUpConfirmOTPForm = dynamic(() => import("@components/auth/sign-up-confirm-otp"));
// const ForgetPasswordForm = dynamic(
// 	() => import("@components/auth/forget-password-form")
// );
// const ProductPopup = dynamic(() => import("@components/product/product-popup"));


const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView === "LOGIN_VIEW" && <LoginForm />}
			{modalView === "LOGIN_CONFIRM_OTP" && <LoginConfirmOTPForm />}
			{/* {modalView === "SIGN_UP_VIEW" && <SignUpForm />}
			{modalView === "SIGNUP_CONFIRM_OTP" && <SignUpConfirmOTPForm />}
			{modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
			{modalView === "PRODUCT_VIEW" && <ProductPopup />} */}
			{modalView === "NEWSLETTER_VIEW" && <Newsletter />}
		</Modal>
	);
};

export default ManagedModal;
