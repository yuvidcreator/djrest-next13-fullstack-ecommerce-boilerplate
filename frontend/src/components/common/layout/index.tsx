import {FC, ReactNode} from "react";
import Header from "./header";
import Footer from "./footer";
import BottomNavigation from "./mobile-navigation/mobile-navigation";
import HeaderTwo from "./header/header-two";

interface AboutLayoutProps {
	children: ReactNode;
}

const HeaderLayout: FC<AboutLayoutProps> = ({ children }) => {
    return (
        <div>
            {/* <Header /> */}
            <HeaderTwo />
            {children}
            <BottomNavigation />
            <Footer />
        </div>
    )
}

export default HeaderLayout