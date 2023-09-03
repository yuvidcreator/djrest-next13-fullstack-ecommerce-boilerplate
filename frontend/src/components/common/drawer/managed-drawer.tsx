"use client"

import Cart from "@/components/common/cart/cart";
import { useUI } from "@/contexts/ui.context";
import { Drawer } from "@/components/common/drawer/drawer";
import { getDirection } from "@/components/utils/get-direction";

const ManagedDrawer = () => {
	const { displayCart, closeCart } = useUI();
	const dir = getDirection(undefined);
	const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };

	return (
		<Drawer
			open={displayCart}
			placement={dir === "rtl" ? "left" : "right"}
			onClose={closeCart}
			// @ts-ignore
			handler={false}
			showMask={true}
			level={null}
			contentWrapperStyle={contentWrapperCSS}
		>
			<Cart />
		</Drawer>
	);
};

export default ManagedDrawer;
