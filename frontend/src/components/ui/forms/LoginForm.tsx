'use client';

import { useLogin } from '@/hooks';
import { Form } from '.';
import { useEffect } from 'react';
// import { useVerifyMutation } from '@/redux/features/authApiSlice';


export default function LoginForm() {
	// const {isAuthenticated} = useVerifyMutation();
	const { email_or_mobile, send_otp_on_mobile, checkout, isLoading, onChange, onSubmit } = useLogin();
	// console.log(isAuthenticated);
	const config = [
		{
			labelText: 'Enter Email Or Mobile No',
			labelId: 'email_or_mobile',
			type: 'text',
			value: email_or_mobile,
			onChange,
			required: true,
			sendOtpOnMobile: send_otp_on_mobile,
			isFromCheckoutPage: checkout
		},
	];

	useEffect(() => {

	}, []);

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Sign in'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
