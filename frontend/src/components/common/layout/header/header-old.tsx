'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { HiMiniXMark, HiMiniBars3CenterLeft } from "react-icons/hi2";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import NavLink from './NavLink';
import Image from 'next/image';

export default function Header() {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const { isAuthenticated } = useAppSelector(state => state.auth);

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

	const isSelected = (path: string) => (pathname === path ? true : false);

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

	const authLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/accounts/profile')}
				isMobile={isMobile}
				href='/accounts/profile'
			>
				User Profile
			</NavLink>
			<NavLink isMobile={isMobile} onClick={handleLogout}>
				Logout
			</NavLink>
		</>
	);

	const guestLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/accounts/login')}
				isMobile={isMobile}
				href='/accounts/login'
			>
				Login
			</NavLink>
			{/* <NavLink
				isSelected={isSelected('/auth/register')}
				isMobile={isMobile}
				href='/auth/register'
			>
				Register
			</NavLink> */}
		</>
	);

	return (
		<Disclosure as='nav' className='bg-black'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
									{open ? (
										<HiMiniXMark
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<HiMiniBars3CenterLeft
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<NavLink href='/' isBanner>
										{/* Osty */}
                                        <Image src={"/osty-logo-trans.png"} width={50} height={50} alt='osty-logo' />
									</NavLink>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{isAuthenticated
											? authLinks(false)
											: guestLinks(false)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{isAuthenticated
								? authLinks(true)
								: guestLinks(true)}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
