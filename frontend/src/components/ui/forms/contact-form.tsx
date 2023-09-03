"use client";

import Input from "../input";
import Button from "../button";
import { useForm } from "react-hook-form";
import TextArea from "../text-area";
import { SetStateAction, useState } from "react";
import { useContactUsMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";


interface ContactFormValues {
	name: string;
	email: string;
	mobile: number;
	subject?: string;
	message: string;
}

const initialFormValues: ContactFormValues = {
	name: "",
	email: "",
	mobile: 0,
	subject: "",
	message: "",
}

const ContactForm: React.FC = () => {

	const [ name, setName ] = useState(initialFormValues.name);
	const [ email, setEmail ] = useState(initialFormValues.email);
	const [ mobile, setMobile ] = useState(initialFormValues.mobile);
	const [ message, setMessage ] = useState(initialFormValues.message);
	// const [ mobileLength, setMobileLength ] = useState("");

	const [contactus, {isLoading}] = useContactUsMutation();

    const handleNumChange = (e: any) => {
		const limit = 10;
		setMobile(e.target.value.slice(0, limit));
        // setMobileLength(e.target.value.slice(0, limit));
    };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormValues>();

	async function onSubmit({name, email, mobile, message}: ContactFormValues) {
		// console.log({name, email, mobile, message}, "contact");

		// console.log(mobileLength)

		await contactus({ name, email, mobile, message })
			.unwrap()
			.then(() => {
				toast.success('Enquiry sent successfully.');
				// router.push('/accounts/confirmotp');
				// setModalView("LOGIN_CONFIRM_OTP");
				// openModal();
				setName("");
				setEmail("");
				setMobile(0);
				setMessage("");

			})
			.catch(() => {
				toast.error('Something went wrong');
				// closeModal();
			});
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center "
			noValidate
		>
			<div className="flex flex-col space-y-5">
				<div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
					<Input
						labelKey="Name"
						placeholderKey="Name"
						{...register("name", { required: "Full Name required" })}
						className="w-full"
						errorKey={errors.name?.message}
						variant="solid"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex flex-col md:flex-row md:space-y-0 pl-0">
					<Input
						labelKey="Email"
						type="email"
						placeholderKey="Enter valid Email"
						{...register("email", {
							required: "Email required",
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Valid email required",
							},
						})}
						className="w-full md:w-1/2 mt-2 md:mt-0"
						errorKey={errors.email?.message}
						variant="solid"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						labelKey="Mobile Number"
						type="number"
						placeholderKey="Enter valid Mobile No."
						{...register("mobile", {
							required: "Mobile required",
							pattern: {
								value:
									/^([0|\+[0-9]{1,5})?([0-9]{10})$/,
								message: "Valid Mobile Number required",
							},
						})}
						className="w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0"
						errorKey={errors.email?.message}
						variant="solid"
						max={"9999999999"}
						min={"0000000001"}
						value={mobile}
						onChange={handleNumChange}
					/>
				</div>
				{/* <Input
					labelKey="Subject"
					{...register("subject", { required: "Subject" })}
					className="relative"
					placeholderKey="Subject"
					errorKey={errors.subject?.message}
					variant="solid"
				/> */}
				<TextArea
					labelKey="Message"
					{...register("message")}
					className="relative mb-4"
					placeholderKey="Write Message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className="relative">
					<Button
						type="submit"
						loading={isLoading}
							disabled={isLoading}
						className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
					>
						{"Send message"}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default ContactForm;
