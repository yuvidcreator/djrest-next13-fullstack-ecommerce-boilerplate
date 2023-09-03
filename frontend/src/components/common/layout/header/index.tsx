"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import SearchIcon from '@/components/icons/search-icon'
import { siteSettings } from '@/settings/site-settings'
// import HeaderMenu from '@/components/common/layout/header/header-menu'
// import { HiMenu } from "react-icons/hi";
import Logo from '@/components/ui/logo'
import { useUI } from '@/contexts/ui.context'
// import { ROUTES } from '@utils/routes'
import { AddActiveScroll } from '@/components/utils/add-active-scroll'
import dynamic from 'next/dynamic'
// import LanguageSwitcher from '@/components/ui/language-switcher'
import WishButton from '@/components/ui/wish-button'
import CategoryMenu from '@/components/ui/category-menu'
import { UserLineIcon } from '@/components/icons/UserLineIcon'
// import ListMenu from "@/components/ui/list-menu";
// import { useGetUserMutation } from '@framework/customer/use-get-user'
// import { isError } from 'lodash'
import useWindowSize from 'react-use/lib/useWindowSize'
import { toast } from 'react-toastify'
// import { useVerifyTokenMutation } from '@framework/customer/use-verify-token'
// import { useLogoutMutation } from '@framework/auth/use-logout'
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';


const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false })
const CartButton = dynamic(() => import('@/components/common/cart/cart-button'), {
    ssr: false,
})

type DivElementRef = React.MutableRefObject<HTMLDivElement>
const { site_header } = siteSettings
const Header: React.FC = () => {
    const {
        openSidebar,
        setDrawerView,
        openSearch,
        openModal,
        setModalView,
        isAuthorized,
    } = useUI()

    const { width } = useWindowSize();

    const pathname = usePathname();
	const router = useRouter();

    const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector(state => state.auth);
	const [logout] = useLogoutMutation();
    
    const siteHeaderRef = useRef() as DivElementRef
    AddActiveScroll(siteHeaderRef)


  // console.log(userToken);
  // console.log(isAuthorized);

    function checkUser() {
        // getUser();
        // // console.log(data);
        // if (data === undefined) {
        //     verifyToken();
        // }
        // let user = data;
        // // console.log(user);
        // return data;
    }

    useEffect(()=>{
        // if (isAuthenticated) {
        //     checkUser();
        // }
        
        // if (isError) {
        //     // console.log(error?.response?.data?.message)
        //     toast(`${error?.response?.data.detail}`, {
        //         progressClassName: "fancy-progress-bar",
        //         position: width > 768 ? "bottom-right" : "top-right",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        // }

        // if (isSuccess) {
        //     console.log(data);
        //     toast(`${data?.response?.data.message}`, {
        //         progressClassName: "fancy-progress-bar",
        //         position: width > 768 ? "bottom-right" : "top-right",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        // }
    }, [isAuthenticated]);

    function handleLogin() {
        setModalView('LOGIN_VIEW')
        return openModal()
    }
    function handleLogout() {
        logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
    }
    function handleMobileMenu() {
        setDrawerView('MOBILE_MENU')
        return openSidebar()
    }

    return (
        <header
            id='siteHeader'
            ref={siteHeaderRef}
            className='relative z-20 w-full h-16 sm:h-20 headerThree'
        >
            <div className='fixed z-20 w-full h-16 text-gray-100 transition duration-200 ease-in-out bg-black innerSticky body-font sm:h-20 px-4 2xl:px-16'>
                <div className='flex items-center justify-center md:justify-around mx-auto max-w-[1920px] h-full lg:h-20 w-full relative before:absolute before:w-screen before:h-px before:bg-gray-100 before:bottom-0'>
                    <button
                        aria-label='Menu'
                        className='flex-col items-center justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none'
                        onClick={handleMobileMenu}
                    >
                        <span className='menuIcon'>
                            <span className='bar' />
                            <span className='bar' />
                            <span className='bar' />
                        </span>
                    </button>
                    <div className='flex items-center 2xl:me-12 3xl:me-20'>
                        <Logo />
                        <div className='hidden transition-all duration-100 ease-in-out lg:flex ms-7 xl:ms-9 pe-2 headerTopMenu'>
                            {site_header?.pagesMenu?.map((item: any) => (
                                <Link
                                    href={item.path}
                                    className='relative flex items-center px-3 lg:px-2.5 py-0 text-sm font-normal xl:text-base text-gray-100 xl:px-6 hover:text-gray-200'
                                    key={`pages-menu-${item.id}`}
                                >
                                    {`${item.label}`}
                                    {item.icon && (
                                        <span className='ms-1.5 xl:ms-2 fill-gray-100 stroke-gray-100 bg-gray-100'>{item.icon}</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='relative hidden w-2/6 me-auto lg:block'>
                        <form
                            className='relative w-full overflow-hidden rounded-md bg-borderBottom'
                            noValidate
                            role='search'
                        >
                            <label htmlFor='search' className='flex items-center'>
                                <span className='absolute top-0 left-0 flex items-center justify-center flex-shrink-0 w-12 h-full cursor-pointer md:w-14 focus:outline-none'>
                                <SearchIcon
                                    color='text-heading'
                                    className='w-[18px] h-[18px]'
                                />
                                </span>
                                <input
                                    id='search'
                                    className='w-full text-sm placeholder-gray-400 bg-transparent rounded-md outline-none focus:border-2 focus:border-gray-100 pe-4 ps-14 h-14 text-heading lg:text-base'
                                    placeholder={'Search Anything...'}
                                    aria-label='Search'
                                    autoComplete='off'
                                />
                            </label>
                        </form>
                    </div>

                    {/* <div className='flex flex-shrink-0 transition-all duration-200 ease-in-out transform ms-auto md:me-auto lg:me-5 xl:me-8 2xl:me-10 languageSwitcher lg:hidden md:pe-16'>
                        <LanguageSwitcher />
                    </div> */}
                    <div className='flex items-center justify-end flex-shrink-0'>
                        <div className='items-center text-gray-100 justify-end gap-6 flex-shrink-0 hidden transition-all duration-200 ease-in-out md:flex space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 me-6 lg:me-5 xl:me-8 2xl:me-10 ms-auto searchSignIn lg:hidden'>
                        {/* for Tab View */}
                            <button
                                className='relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none'
                                onClick={openSearch}
                                aria-label='search-button'
                            >
                                <SearchIcon />
                            </button>
                            {/* @ts-ignore */}
                            <AuthMenu
                                isAuthorized={isAuthenticated}
                                href={"/accounts/profile"}
                                className='text-sm font-semibold xl:text-base text-gray-100'
                                btnProps={{
                                    className:
                                        'text-sm xl:text-base text-gray-100 font-semibold focus:outline-none',
                                    children: 'Login',
                                    onClick: handleLogin,
                                }}
                            >
                                {'User Profile'}
                            </AuthMenu>
                        </div>

                        <div className='items-center hidden transition-all md:flex wishlistShopping space-x-7 lg:space-s-6 xl:space-x-8 2xl:space-x-10 ps-3 text-gray-100'>
                            <div className='flex md:gap-x-4 align-center'>
                                <WishButton />
                                <span className='hidden text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base'>
                                    {'Wishlist'}
                                </span>
                            </div>

                            <div className='flex md:gap-x-4 align-center'>
                                <CartButton />
                                <span className='hidden text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base'>
                                    {'Cart'}
                                </span>
                            </div>

                            <div>
                                {/* @ts-ignore */}
                                <AuthMenu
                                    isAuthorized={isAuthorized}
                                    href={"/acccounts/profile"}
                                    className='flex-shrink-0 hidden text-sm xl:text-base lg:flex focus:outline-none text-gray-100 gap-x-3'
                                    btnProps={{
                                        children: (
                                            <>
                                                <UserLineIcon className='w-4 xl:w-[17px] h-auto text-gray-100' />
                                                {'Login'}
                                            </>
                                        ),
                                        onClick: handleLogin,
                                    }}
                                >
                                    {"User Profile"}
                                </AuthMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
