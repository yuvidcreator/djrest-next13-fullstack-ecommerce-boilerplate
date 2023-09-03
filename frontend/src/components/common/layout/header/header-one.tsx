"use client"

import React, { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

import SearchIcon from '@/components/icons/search-icon'
import { siteSettings } from '@/settings/site-settings'
import HeaderMenu from './header-menu'
import Logo from '@/components/ui/logo'
import { useUI } from '@/contexts/ui.context'
import { AddActiveScroll } from '@/components/utils/add-active-scroll'
import dynamic from 'next/dynamic'
// import LanguageSwitcher from '@components/ui/language-switcher'

const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false })
const CartButton = dynamic(() => import('@/components/common/cart/cart-button'), {
    ssr: false,
})

type DivElementRef = React.MutableRefObject<HTMLDivElement>
const { site_header } = siteSettings

const HeaderOne: React.FC = () => {
    const {
        openSidebar,
        setDrawerView,
        openSearch,
        openModal,
        setModalView,
        // isAuthorized,
    } = useUI()

    const pathname = usePathname();
	const router = useRouter();

	const { isAuthenticated } = useAppSelector(state => state.auth);

	// const isSelected = (path: string) => (pathname === path ? true : false);

	// console.log(pathname)

	useEffect(() => {
		if ( !isAuthenticated && pathname.startsWith("/accounts/profile")) {
			// window.location.reload()
			router.push("/accounts/login")
		};

		if ( isAuthenticated && pathname.startsWith("/accounts/login")) {
			// window.location.reload("/")
			router.push("/")
		};
		if ( isAuthenticated && pathname.startsWith("/accounts/confirmotp")) {
			// window.location.reload("/")
			router.push("/")
		};
	}, [isAuthenticated, pathname]);
    
    const siteHeaderRef = useRef() as DivElementRef
    AddActiveScroll(siteHeaderRef)

    function handleLogin() {
        setModalView('LOGIN_VIEW')
        return openModal()
    }
    function handleMobileMenu() {
        setDrawerView('MOBILE_MENU')
        return openSidebar()
    }

    return (
        <header
            id='siteHeader'
            ref={siteHeaderRef}
            className='w-full h-16 sm:h-20 lg:h-24 relative z-20'
        >
            <div className='innerSticky text-[#fad591] body-font fixed bg-black w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out'>
                <div className='flex items-center justify-center mx-auto max-w-[1920px] h-full w-full'>
                    <button
                        aria-label='Menu'
                        className='menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none'
                        onClick={handleMobileMenu}
                    >
                        <span className='menuIcon'>
                        <span className='bar' />
                        <span className='bar' />
                        <span className='bar' />
                        </span>
                    </button>
                
                    <Logo />

                    <HeaderMenu
                        data={site_header.menu}
                        className='hidden lg:flex md:ms-6 xl:ms-10'
                    />

                    <div className='hidden md:flex justify-end items-center space-s-6 lg:space-s-6 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0'>
                        <button
                            className='flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform'
                            onClick={openSearch}
                            aria-label='search-button'
                        >
                            <SearchIcon />
                        </button>
                        <div className='-mt-0.5 flex-shrink-0'>
                            {/* @ts-ignore */}
                            <AuthMenu
                                isAuthorized={isAuthenticated}
                                href={"/accounts/profile"}
                                className='text-sm xl:text-base text-[#fad591] font-semibold'
                                btnProps={{
                                    className:
                                        'text-sm xl:text-[#fad591] text-[#fad591] font-semibold focus:outline-none',
                                    children: ('Sign in'),
                                    onClick: handleLogin,
                                }}
                            >
                                {'Account'}
                            </AuthMenu>
                        </div>
                        <CartButton />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderOne
