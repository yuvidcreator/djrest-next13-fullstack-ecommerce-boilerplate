import type { FC } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/logo'

interface Props {
  className?: string
  data: {
    widgetTitle?: string
    lists: {
      id: string
      path?: string
      title: string
      icon?: any
    }[]
    logo?: any
    description?: string
    isCompanyIntroduction?: boolean
  }
  variant?: 'contemporary'
}

const WidgetLink: FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data
  const { logo, description } = data

  return (
    <div
      className={`${className} ${data?.isCompanyIntroduction && 'col-span-2'}`}
    >
      {!data?.isCompanyIntroduction ? (
        <>
          <h4 className='text-gray-100 text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7'>
            {`${widgetTitle}`}
          </h4>
          <ul className='text-xs lg:text-sm text-gray-100 flex flex-col space-y-3 lg:space-y-3.5'>
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className='flex items-baseline'
              >
                {list.icon && (
                  <span className='me-3 relative top-0.5 lg:top-1 text-sm lg:text-base'>
                    {list.icon}
                  </span>
                )}
                <Link href={list.path ? list.path : '#!'} className='transition-colors duration-200 hover:text-gray-500'>
                    {`${list.title}`}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className='me-4 flex flex-col space-y-7 lg:space-y-7.5'>
          <Logo className='' />
          <p className='text-sm font-normal text-gray-100 leading-6 max-w-[334px] '>
            {description}
          </p>
          <ul className='text-xs lg:text-sm text-gray-100 flex items-center space-x-3 lg:space-x-3.5'>
            {lists.map((list) => (
              <li
                key={`widget-list--key${list.id}`}
                className='flex items-baseline'
              >
                {list.icon && (
                  <span className='me-3 relative top-0.5 lg:top-1 text-sm lg:text-base'>
                    {list.icon}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default WidgetLink
