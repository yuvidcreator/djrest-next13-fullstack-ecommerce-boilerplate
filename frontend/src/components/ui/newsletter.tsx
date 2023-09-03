import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useUI } from "@/contexts/ui.context";

interface NewsLetterFormValues {
	email: string;
}
const defaultValues = {
	email: "",
};

export default function Newsletter() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewsLetterFormValues>({
		defaultValues,
	});
	const { closeModal } = useUI();
	function onSubmit(values: NewsLetterFormValues) {
		// console.log(values, "news letter");
		closeModal();
	}
	
	return (
		<div className="flex items-center justify-center">
			<div className="w-full sm:w-[450px] md:w-[550px] lg:w-[980px] xl:w-[1170px] flex flex-col max-w-full max-h-full bg-white overflow-hidden rounded-md">
				<div className="flex items-center">
					<div className="flex-shrink-0 items-center justify-center bg-gray-200 hidden lg:flex lg:w-[520px] xl:w-auto">
						<Image
							src="/assets/images/newsletter.jpg"
							alt="Thumbnail"
							width={655}
							height={655}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="flex flex-col px-5 py-7 sm:p-10 md:p-12 xl:p-14 text-center w-full">
						<h4 className="uppercase font-semibold text-xs sm:text-sm text-body mb-2 lg:mb-4">
							{"Subscribe Now"}
						</h4>
						<h2 className="text-heading text-lg sm:text-xl md:text-2xl leading-8 font-bold mb-5 sm:mb-7 md:mb-9">
							{"Newsletter"}
						</h2>
						<p className="text-body text-sm leading-6 md:leading-7">
							{"Sub title"}
						</p>
						<form
							className="pt-8 sm:pt-10 md:pt-14 mb-1 sm:mb-0"
							onSubmit={handleSubmit(onSubmit)}
						>
							<Input
								placeholderKey="forms:placeholder-email-subscribe"
								type="email"
								variant="solid"
								className="w-full"
								inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center bg-gray-50"
								{...register("email", {
									required: "forms:email-required",
									pattern: {
										value:
											/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: "forms:email-error",
									},
								})}
								errorKey={errors.email?.message}
							/>
							<Button className="w-full h-12 lg:h-14 mt-3 sm:mt-4">
								{"Subscribe"}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
