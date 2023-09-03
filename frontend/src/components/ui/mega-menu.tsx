import React from "react";
import Link from "next/link";


interface MenuItem {
	id: number | string;
	path: string;
	label: string;
	columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
	columns: {
		id: number | string;
		columnItems: MenuItem[];
	}[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
	
	return (
		<div className="absolute bg-black megaMenu shadow-header -start-28 xl:start-0">
			<div className="grid grid-cols-5">
				{columns?.map((column, i) => (
					<ul
						className="pt-6 even:bg-heading pb-7 2xl:pb-8 2xl:pt-7"
						key={i}
					>
						{column?.columnItems?.map((columnItem, index) => (
							<React.Fragment key={index}>
								<li className="mb-1.5">
									<Link
										href={columnItem.path}
										className="block text-sm py-1.5 text-gray-100 font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-100"
									>
										{columnItem.label}
									</Link>
								</li>
								{columnItem?.columnItemItems?.map((item: any, itemIndex) => (
									<li
										key={itemIndex}
										className={
											columnItem?.columnItemItems?.length === item.id
												? "border-b border-gray-100 pb-3.5 mb-3"
												: ""
										}
									>
										<Link
											href={item.path}
											className="text-gray-100 text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-100"
										>
											{item.label}
										</Link>
									</li>
								))}
							</React.Fragment>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

export default MegaMenu;
