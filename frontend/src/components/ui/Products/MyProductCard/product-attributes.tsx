import cn from "classnames";
interface Props {
	className?: string;
	title: string;
	// attributes: {
	// 	id: number | string;
	// 	name: string;
	// 	code: string;
	// }[];
	attributes: {
		id: number | string;
		name: string;
		code: string;
	};
	active: string;
	onClick: any;
	onMouseOver: any,
}

export const ProductAttributes: React.FC<Props> = ({
	className = "mb-4",
	title,
	attributes,
	active,
	onClick,
	onMouseOver,
}) => {
	
	return (
		<div className={className}>
			<h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
				{title}
			</h3>
			<ul className="colors flex flex-wrap -me-3">
				{/* {attributes?.map(({ id, name, code }) => (
					<li
						key={`${name}-${id}`}
						className={cn(
							"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
							{
								"border-black": code === active,
							}
						)}
						onClick={() => onClick({ [title]: name })}
					>
						{title === "color" ? (
							<span
								className="h-full w-full rounded block"
								style={{ backgroundColor: code }}
							/>
						) : (
							name
						)}
					</li>
				))} */}

				{attributes.code !== null &&  (
					<li
						key={`${attributes.id}`}
						className={cn(
							"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
							{
								"border-black": attributes.code === active,
							}
						)}
						onClick={() => onClick({ [title]: attributes.name })}
					>
						<span
							className="h-full w-full rounded block"
							style={{ backgroundColor: attributes.code }}
							onMouseOver={onMouseOver}
						/>
					</li>
				)}
			</ul>
		</div>
	);
};
