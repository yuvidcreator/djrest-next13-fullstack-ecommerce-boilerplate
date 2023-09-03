import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useConfirmLoginOtpMutation } from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useConfirmLoginOTP() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [confirmLoginOtp, { isLoading }] = useConfirmLoginOtpMutation();

	const [formData, setFormData] = useState({
		otp: '',
	});

	const { otp } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// console.log(formData);
		confirmLoginOtp({ otp })
			.unwrap()
			.then(() => {
				dispatch(setAuth());
				router.push('/accounts/profile');
				toast.success('OTP Verified Successfully');
			})
			.catch(() => {
				toast.error('Something went wrong');
			});
	};

	return {
		otp,
		isLoading,
		onChange,
		onSubmit,
	};
}
