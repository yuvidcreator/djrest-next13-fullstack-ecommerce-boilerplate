import Link from "next/link";
import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
// import Button from "@/components/ui/button";

interface Props {
	href: string;
	className?: string;
	btnProps: React.ButtonHTMLAttributes<any>;
	isAuthorized: boolean;
}

const AuthMenu: React.FC<Props> = ({
	isAuthorized,
	href,
	className,
	btnProps,
	// @ts-ignore
	children,
}) => {

	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

	return isAuthorized ? (
		<div className="flex justify-center items-center text-center space-x-2">
			<Link href={href} className={`${className}`}>
				{children}
			</Link>
			<button onClick={handleLogout} className="mt-[4px] lg:mt-0">Logout</button>
		</div>
	) : (
		<button {...btnProps} className={className} />
	);
};

export default AuthMenu;
