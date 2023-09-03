import { ChangeEvent, FormEvent } from 'react';
import { Spinner } from '..';
import Input from "./Input";
import { CheckBox } from '../checkbox';

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
	sendOtpOnMobile?: boolean;
	isFromCheckoutPage?: boolean;
}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
}: Props) {

	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{config.map((input, i) => (
				<div key={i} className='space-y-2'>
					<Input
						key={input.labelId}
						labelId={input.labelId}
						type={input.type}
						onChange={onChange}
						value={input.value}
						link={input.link}
						required={input.required}
	
					>
						{input.labelText}
					</Input>
					{/* <CheckBox label={"Request OTP On mobile?"} value={input.value} onChange={onChange} /> */}
				</div>
			))}


			<div>
				<button
					type='submit'
					className='flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-[#ffee90] shadow-lg hover:bg-[#ffee90] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffee90] transition-all ease-in-out duration-200'
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `${btnText}`}
				</button>
			</div>
		</form>
	);
}
