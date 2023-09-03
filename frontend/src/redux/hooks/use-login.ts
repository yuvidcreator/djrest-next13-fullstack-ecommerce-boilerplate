import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/redux/hooks';
import { useRequestLoginOtpMutation } from '@/redux/features/authApiSlice';
// import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	// const dispatch = useAppDispatch();
	const [requestLoginOtp, { isLoading }] = useRequestLoginOtpMutation();

	const [formData, setFormData] = useState({
		email_or_mobile: '',
		send_otp_on_mobile: false,
		checkout: false,
	});

	const { email_or_mobile, send_otp_on_mobile, checkout } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// console.log(formData);
		requestLoginOtp({ email_or_mobile, send_otp_on_mobile, checkout })
			.unwrap()
			.then(() => {
				// dispatch(setAuth());
				toast.success('OTP Sent Successfully');
				router.push('/accounts/confirmotp');
				// router.push('/dashboard');
			})
			.catch(() => {
				toast.error('Something went wrong');
			});
	};

	return {
		email_or_mobile,
		send_otp_on_mobile, 
		checkout,
		isLoading,
		onChange,
		onSubmit,
	};
}
