"use client";

import Link from "next/link";
import SearchIcon from "@/components/icons/search-icon";
import UserIcon from "@/components/icons/user-icon";
import MenuIcon from "@/components/icons/menu-icon";
import HomeIcon from "@/components/icons/home-icon";
import { useUI } from "@/contexts/ui.context";
import dynamic from "next/dynamic";
import { Drawer } from "@/components/common/drawer/drawer";
import { useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import { ROUTES } from "@utils/routes";
// import { getDirection } from "@/components/utils/get-direction";


const CartButton = dynamic(() => import("@/components/common/cart/cart-button"), {
	ssr: false,
});
const AuthMenu = dynamic(() => import("@/components/common/layout/header/auth-menu"), {
	ssr: false,
});
const MobileMenu = dynamic(
	() => import("@/components/common/layout/header/mobile-menu")
);

const BottomNavigation: React.FC = () => {
	const {
		openSidebar,
		closeSidebar,
		displaySidebar,
		setDrawerView,
		openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI();

    const { isAuthenticated } = useAppSelector(state => state.auth);

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
	function handleMobileMenu() {
		setDrawerView("MOBILE_MENU");
		return openSidebar();
	}

	// const { locale } = useRouter();
	// const dir = getDirection(locale);
	const contentWrapperCSS = { left: 0 };

	return (
		<>
			<div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-100 body-font bg-black w-full h-14 sm:h-16 px-4">
				<button
					aria-label="Menu"
					className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
					onClick={handleMobileMenu}
				>
					<MenuIcon />
				</button>
				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
					onClick={openSearch}
					aria-label="search-button"
				>
					<SearchIcon />
				</button>
				<Link href="/" className="flex-shrink-0">
					<HomeIcon />
				</Link>
				<CartButton />
                {/* @ts-ignore */}
				<AuthMenu
					isAuthorized={isAuthenticated}
					href={"/accounts/profile"}
					className="flex-shrink-0"
					btnProps={{
						className: "flex-shrink-0 focus:outline-none",
						children: <UserIcon />,
						onClick: handleLogin,
					}}
				>
					<UserIcon />
				</AuthMenu>
			</div>
			<Drawer
				placement={"left"}
				open={displaySidebar}
				onClose={closeSidebar}
                // @ts-ignore
				handler={false}
				showMask={true}
				level={null}
				contentWrapperStyle={contentWrapperCSS}
			>
				<MobileMenu />
			</Drawer>
		</>
	);
};

export default BottomNavigation;
