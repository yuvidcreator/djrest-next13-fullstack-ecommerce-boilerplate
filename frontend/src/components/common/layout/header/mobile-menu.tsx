"use client"

import { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/settings/site-settings";
import Scrollbar from "@/components/ui/scrollbar";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "@/components/ui/logo";
import { useUI } from "@/contexts/ui.context";
import {
	IoLogoInstagram,
	IoLogoTwitter,
	IoLogoFacebook,
	IoLogoYoutube,
	IoClose,
} from "react-icons/io5";


const social = [
	{
		id: 0,
		link: "https://www.facebook.com/gray-100/",
		icon: <IoLogoFacebook />,
		className: "facebook",
		title: "text-facebook",
	},
	{
		id: 1,
		link: "https://twitter.com/gray-100",
		icon: <IoLogoTwitter />,
		className: "twitter",
		title: "text-twitter",
	},
	{
		id: 2,
		link: "https://www.youtube.com/channel/xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
		icon: <IoLogoYoutube />,
		className: "youtube",
		title: "text-youtube",
	},
	{
		id: 3,
		link: "https://www.instagram.com/gray-100/",
		icon: <IoLogoInstagram />,
		className: "instagram",
		title: "text-instagram",
	},
];

export default function MobileMenu() {
	const [activeMenus, setActiveMenus] = useState<any>([]);
	const { site_header } = siteSettings;
	const { closeSidebar } = useUI();
	
	const handleArrowClick = (menuName: string) => {
		let newActiveMenus = [...activeMenus];

		if (newActiveMenus.includes(menuName)) {
			var index = newActiveMenus.indexOf(menuName);
			if (index > -1) {
				newActiveMenus.splice(index, 1);
			}
		} else {
			newActiveMenus.push(menuName);
		}

		setActiveMenus(newActiveMenus);
	};

	const ListMenu = ({
		dept,
		data,
		hasSubMenu,
		menuName,
		menuIndex,
		className = "",
	}: any) =>
		data.label && (
			<li className={`mb-0.5 ${className}`}>
				<div className="flex items-center justify-between relative">
					<Link
						href={data.path}
						className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-6 pe-4 transition duration-300 ease-in-out"
					>
						<span className="block w-full" onClick={closeSidebar}>
							{`${data.label}`}
						</span>
					</Link>
					{hasSubMenu && (
						<div
							className="cursor-pointer w-full h-full text-lg flex items-center justify-end absolute start-0 top-0 pe-5"
							onClick={() => handleArrowClick(menuName)}
						>
							<IoIosArrowDown
								className={`transition duration-200 ease-in-out transform text-gray-100 ${
									activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
								}`}
							/>
						</div>
					)}
				</div>
				{hasSubMenu && (
					<SubMenu
						dept={dept}
						data={data.subMenu}
						toggle={activeMenus.includes(menuName)}
						menuIndex={menuIndex}
					/>
				)}
			</li>
		);

	const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
		if (!toggle) {
			return null;
		}

		dept = dept + 1;

		return (
			<ul className="pt-0.5">
				{data?.map((menu: any, index: number) => {
					const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

					return (
						<ListMenu
							dept={dept}
							data={menu}
							hasSubMenu={menu.subMenu}
							menuName={menuName}
							key={menuName}
							menuIndex={index}
							className={dept > 1 && "ps-4"}
						/>
					);
				})}
			</ul>
		);
	};

	return (
		<>
			<div className="flex flex-col justify-items-start w-full h-full bg-black">
				<div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
					<Logo />

					<button
						className="flex text-2xl items-center justify-center text-gray-100 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
						onClick={closeSidebar}
						aria-label="close"
					>
						<IoClose className="text-gray-100 mt-1 md:mt-0.5" />
					</button>
				</div>

				<Scrollbar className="menu-scrollbar flex-grow">
					<div className="flex flex-col py-7 px-0 lg:px-2 text-gray-100 mb-[438px]">
						{/* <ul className="mobileMenu">
							{site_header.menu.map((menu, index) => {
								const dept: number = 1;
								const menuName: string = `sidebar-menu-${dept}-${index}`;

								return (
									<ListMenu
										dept={dept}
										data={menu}
										hasSubMenu={menu.subMenu}
										menuName={menuName}
										key={menuName}
										menuIndex={index}
									/>
								);
							})}
						</ul> */}
						<ul className="mobileMenu">
							{site_header?.pagesMenu?.map((menu: any, index) => {
								const dept: number = 1;

								return (
									<ListMenu
										dept={dept}
										data={menu}
										hasSubMenu={menu.subMenu}
										menuName={menu.lable}
										key={menu.id}
										menuIndex={index}
									/>
								)
							})}
						</ul>
					</div>
				</Scrollbar>

				<div className="flex items-center justify-center bg-black border-t border-gray-100 px-7 flex-shrink-0 space-s-1">
					{social?.map((item, index) => (
						<a
							href={item.link}
							className={`text-gray-100 p-5 opacity-60 first:-ms-4 transition duration-300 ease-in hover:opacity-100 ${item.className}`}
							target="_blank"
							key={index}
						>
							<span className="sr-only">{`${item.title}`}</span>
							{item.icon}
						</a>
					))}
				</div>
			</div>
		</>
	);
}
