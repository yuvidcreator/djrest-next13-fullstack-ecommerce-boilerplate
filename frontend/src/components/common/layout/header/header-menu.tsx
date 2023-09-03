import Link from "next/link";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@/components/ui/mega-menu";
import ListMenu from "@/components/ui/list-menu";


interface MenuProps {
	data: any;
	className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
	
	return (
		<nav className={classNames(`headerMenu flex w-full relative`, className)}>
			{data?.map((item: any) => (
				<div
					className={`menuItem group cursor-pointer py-7 ${
						item.subMenu ? "relative" : ""
					}`}
					key={item.id}
				>
					<Link
						href={item.path}
						className="relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-gray-100 xl:px-4 group-hover:text-gray-200"
					>
						{item.label}
						{(item?.columns || item.subMenu) && (
							<span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
								<FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
							</span>
						)}
					</Link>

					{item?.columns && Array.isArray(item.columns) && (
						<MegaMenu columns={item.columns} />
					)}

					{item?.subMenu && Array.isArray(item.subMenu) && (
						<div className="absolute invisible bg-black opacity-0 group-hover:visible subMenu shadow-header start-0 group-hover:opacity-100">
							<ul className="py-5 text-sm text-gray-100">
								{item.subMenu.map((menu: any, index: number) => {
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
							</ul>
						</div>
					)}
				</div>
			))}
		</nav>
	);
};

export default HeaderMenu;
