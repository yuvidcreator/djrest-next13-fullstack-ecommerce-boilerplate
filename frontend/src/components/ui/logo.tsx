import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { siteSettings } from "@/settings/site-settings";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {
	return (
		<Link
			href={siteSettings.logo.href}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}
		>
			<Image
				src={siteSettings.logo.url}
				alt={siteSettings.logo.alt}
				height={siteSettings.logo.height}
				width={siteSettings.logo.width}
				loading="eager"
			/>
		</Link>
	);
};

export default Logo;
