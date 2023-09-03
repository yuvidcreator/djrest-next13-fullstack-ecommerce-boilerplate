import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { AiOutlineArrowUp } from 'react-icons/ai'
import Container from '@/components/ui/container'
import { siteSettings } from '@/settings/site-settings'

interface CopyrightProps {
  payment?: {
    id: string | number
    path?: string
    name: string
    image: string
    width: number
    height: number
  }[]
  variant?: 'contemporary'
}

const year = new Date().getFullYear()

const Copyright: React.FC<CopyrightProps> = ({ payment, variant }) => {
  
  return (
    <div className='border-t border-gray-300 pt-5 pb-12 sm:pb-20 md:pb-5 mb-2 sm:mb-0'>
      <Container
        className={cn(
          'flex flex-col-reverse md:flex-row text-center md:justify-between',
          {
            'items-center': variant === 'contemporary',
          }
        )}
      >
        <p
          className={cn('text-gray-100 text-xs lg:text-sm leading-6', {
            'p-0 m-0': variant === 'contemporary',
          })}
        >
          {'Copyright'} &copy; {year}&nbsp;
          <Link
            className='font-semibold text-gray-100 transition-colors duration-200 ease-in-out hover:text-gray-500'
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </Link>
          &nbsp; {'All Rights Reserved'}
        </p>

        {payment && (
          <ul className='hidden md:flex flex-wrap justify-center items-center space-x-1 xs:space-x-5 lg:space-x-2 mb-1 md:mb-0 mx-auto md:mx-0'>
            {payment?.map((item) => (
              <li
                className='mb-2 md:mb-0 transition hover:opacity-80'
                key={`payment-list--key${item.id}`}
              >
                <a href={item.path ? item.path : '/#'} target='_blank'>
                  <Image
                    src={item.image}
                    alt={`${item.name}`}
                    height={item.height}
                    width={item.width}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}

        {variant === 'contemporary' && (
          <p className='text-sm font-semibold leading-[19px] text-gray-100 hover:text-gray-500 cursor-pointer'>
            <Link href='#siteHeader' className='text-gray-100 hover:text-gray-500'>Scroll to top</Link>

            <AiOutlineArrowUp className='inline ms-3' />
          </p>
        )}
      </Container>
    </div>
  )
}

export default Copyright
