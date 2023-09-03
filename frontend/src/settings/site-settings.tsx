import { ILFlag } from '@/components/icons/ILFlag'
import { SAFlag } from '@/components/icons/SAFlag'
import { CNFlag } from '@/components/icons/CNFlag'
import { USFlag } from '@/components/icons/USFlag'
import { DEFlag } from '@/components/icons/DEFlag'
import { ESFlag } from '@/components/icons/ESFlag'
import { ThunderIcon } from '@/components/icons/thunder-icon'
import { WomenIcon } from '@/components/icons/women-icon'
// import { MenIcon } from '@/components/icons/men-icon'
// import { WatchIcon } from '@/components/icons/watch-icon'


export const restAPIEndpoint = process.env.REST_API_ENDPOINT;

export const siteSettings = {
    name: 'WebinoxMedia',
    description: 'WebinoxMedia',
    support_whatsapp: "918329885941",
    support_email: "info@webinoxmedia.com",
    business_gmap_location: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15127.613984134556!2d73.891219!3d18.578389!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1693d2c3a11%3A0x254e84c66cd97f37!2sWebinoxMedia!5e0!3m2!1sen!2sin!4v1693200753764!5m2!1sen!2sin",
    //It will b used in <iframe src={siteSettings.business_gmap_location} width={360} height={250} style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    author: {
        name: 'Yuvraaj Limbole',
        profeshion: "Fullstack Web Developer",
        websiteUrl: 'https://www.webinoxmedia.com',
        address: 'Pune',
        mobile: "+918329885941",
        whatsapp: "918329885941",
    },
    logo: {
        // url: '/assets/images/logo.svg',
        url: '/logo-trans.png',
        alt: 'osty',
        href: '/',
        width: 55,
        height: 55,
    },
    defaultLanguage: 'en',
    currencyCode: 'INR',
    site_header: {
        menu: [
            {
                id: 1,
                path: '/category/luggage',
                label: 'Luggage',
                subMenu: [
                    {
                        id: 1,
                        path: '/collections/new-arrivals-luggae',
                        label: 'New Arrivals',
                    },
                    {
                        id: 2,
                        path: '/collections/trending-luggage',
                        label: 'Trending',
                    },
                    {
                        id: 3,
                        path: '/collections/offers-on-luggage',
                        label: 'Offers',
                    },
                ],
            },
            {
                id: 2,
                path: '/category/backpacks',
                label: 'Backpacks',
                subMenu: [
                    {
                        id: 1,
                        path: '/collections/new-arrivals-backpacks',
                        label: 'New Arrivals',
                    },
                    {
                        id: 2,
                        path: '/collections/trekking-collection',
                        label: 'Trekking Collection',
                    },
                    {
                        id: 3,
                        path: '/collections/offers-on-backpacks',
                        label: 'Offers',
                    },
                ],
            },
            {
                id: 3,
                path: '/collections/premmiun-collections',
                label: 'Premium Collections',
            },
            {
                id: 4,
                path: '/about',
                label: 'About',
            },
            {
                id: 5,
                path: '/contact-us',
                label: 'Contact',
            },
        ],
        mobileMenu: [
            {
                id: 1,
                path: '/category/luggage',
                label: 'Luggage',
                subMenu: [
                    {
                        id: 1,
                        path: '/collections/new-arrivals-luggae',
                        label: 'New Arrivals',
                    },
                    {
                        id: 2,
                        path: '/collections/trending-luggage',
                        label: 'Trending',
                    },
                    {
                        id: 3,
                        path: '/collections/offers-on-luggage',
                        label: 'Offers',
                    },
                ],
            },
            {
                id: 2,
                path: '/collections/backpacks',
                label: 'Backpacks',
                subMenu: [
                    {
                        id: 1,
                        path: '/collections/backpacks-collections',
                        label: 'New Arrivals',
                    },
                    {
                        id: 2,
                        path: '/collections/backpacks-collections',
                        label: 'Trending',
                    },
                    {
                        id: 3,
                        path: '/collections/backpacks-offers',
                        label: 'Offers',
                    },
                ],
            },
            {
                id: 3,
                path: '/collections/premium-collection',
                label: 'Pemium Collections',
            },
            {
                id: 4,
                path: '/about',
                label: 'About',
            },
            {
                id: 5,
                path: '/contact-us',
                label: 'Contact',
            },
        ],
        languageMenu: [
            {
                id: 'ar',
                name: 'عربى - AR',
                value: 'ar',
                icon: <SAFlag width='20px' height='15px' />,
            },
            {
                id: 'zh',
                name: '中国人 - ZH',
                value: 'zh',
                icon: <CNFlag width='20px' height='15px' />,
            },
            {
                id: 'en',
                name: 'English - EN',
                value: 'en',
                icon: <USFlag width='20px' height='15px' />,
            },
            {
                id: 'de',
                name: 'Deutsch - DE',
                value: 'de',
                icon: <DEFlag width='20px' height='15px' />,
            },
            {
                id: 'he',
                name: 'rעברית - HE',
                value: 'he',
                icon: <ILFlag width='20px' height='15px' />,
            },
            {
                id: 'es',
                name: 'Español - ES',
                value: 'es',
                icon: <ESFlag width='20px' height='15px' />,
            },
        ],
        categoryMenu: [
            {
                id: 1,
                path: '/collection/luggage',
                label: 'Luggage',
                icon: <WomenIcon />,
                columns: [
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                ],
                banners: [
                    {
                        id: 1,
                        path: '/search?q=winter',
                        label: 'winter',
                        image: "/assets/images/banner/megamenu/banner-1.png",
                    },
                    {
                        id: 2,
                        path: '/search?q=summer',
                        label: 'summer',
                        image: "/assets/images/banner/megamenu/banner-2.png",
                    },
                ],
            },
            {
                id: 2,
                path: '/collection/luggage',
                label: 'Luggage',
                icon: <WomenIcon />,
                columns: [
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                ],
                banners: [
                    {
                        id: 1,
                        path: '/search?q=winter',
                        label: 'winter',
                        image: "/assets/images/banner/megamenu/banner-1.png",
                    },
                    {
                        id: 2,
                        path: '/search?q=summer',
                        label: 'summer',
                        image: "/assets/images/banner/megamenu/banner-2.png",
                    },
                ],
            },
            {
                id: 3,
                path: '/collection/luggage',
                label: 'Luggage',
                icon: <WomenIcon />,
                columns: [
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                    {
                        id: 1,
                        columnItems: [
                            {
                                id: 1,
                                path: '/search?q=top-luggae',
                                label: 'Luggage',
                                columnItemItems: [
                                    {
                                        id: 1,
                                        path: '/search?q=new-arrival-luggage',
                                        label: 'New Arrivale luggage',
                                    },
                                    {
                                        id: 2,
                                        path: '/search?q=offered-luggage',
                                        label: 'Luggage offer',
                                    },
                                ],
                            },
                            {
                                id: 2,
                                path: '/collection/trending',
                                label: 'Trending',
                            },
                            {
                                id: 3,
                                path: '/offers',
                                label: 'Offers',
                            },
                        ],
                    },
                ],
                banners: [
                    {
                        id: 1,
                        path: '/search?q=winter',
                        label: 'winter',
                        image: "/assets/images/banner/megamenu/banner-1.png",
                    },
                    {
                        id: 2,
                        path: '/search?q=summer',
                        label: 'summer',
                        image: "/assets/images/banner/megamenu/banner-2.png",
                    },
                ],
            },
        ],
        pagesMenu: [
            {
                id: 1,
                path: '/wholesale',
                label: 'Wholesale Deals',
                icon: <ThunderIcon className='w-3 h-auto' />,
            },
            // {
            //     id: 2,
            //     path: '/offers',
            //     label: 'Offers',
            // },
            {
                id: 3,
                path: '/faq',
                label: 'FAQ',
            },
            {
                id: 4,
                path: '/contact-us',
                label: 'Enquire Now',
            },
        ],
    },
}