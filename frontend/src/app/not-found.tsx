// import Image from "next/image";
// import { IoHomeSharp } from "react-icons/io5";
// import Text from "@/components/ui/text";
// import Link from "next/link";
import NotFoundComponent from "@/components/ui/not-found-component";



const ErrorInformation = async({ 
	params,
	searchParams
}: {
	params: { slug: string },
	searchParams: { [key: string]: string | undefined } 
}) => {
	return (
		<NotFoundComponent description="Something went wrong ...." />
	);
};

export default ErrorInformation;
