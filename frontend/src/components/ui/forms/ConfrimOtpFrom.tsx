'use client';

import { useConfirmLoginOTP } from '@/hooks';
import { Form } from '.';

export default function ConfrimOtpFrom() {
	const { otp, isLoading, onChange, onSubmit } = useConfirmLoginOTP();

	const config = [
		{
			labelText: 'Enter OTP',
			labelId: 'otp',
			type: 'number',
			value: otp,
			onChange,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Confirm OTP'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}
