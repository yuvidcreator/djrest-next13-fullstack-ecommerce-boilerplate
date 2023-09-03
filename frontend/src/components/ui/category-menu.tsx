import cn from 'classnames'
import { HiMenu } from 'react-icons/hi'
import ListMenu from '@/components/ui/list-menu'


interface CategoryMenuProps {
  className?: string
  categoryMenu: any
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  className,
  categoryMenu,
}) => {
  return (
    <div className={cn('relative flex-shrink-0 categoryMenu', className)}>
      <div className='flex items-center justify-center gap-2 px-3.5 xl:px-4 text-sm relative before:absolute before:-bottom-2.5 before:h-2.5 before:w-full before:z-10 font-semibold text-gray-100 transition-colors rounded-md cursor-pointer h-11 bg-heading hover:bg-gray-900'>
        <HiMenu className='text-xl text-gray-100' />
        {'Categories'}
      </div>
      {categoryMenu && Array.isArray(categoryMenu) && (
        <div className='absolute invisible bg-black opacity-0 subMenu shadow-header start-0'>
          <ul className='relative py-5 text-sm text-gray-100'>
            {categoryMenu.map((menu: any, index: number) => {
              const dept: number = 1
              const menuName: string = `sidebar-menu-${dept}-${index}`
              return (
                <ListMenu
                  dept={dept}
                  data={menu}
                  hasSubMenu={menu.subMenu}
                  hasMegaMenu={menu.columns}
                  hasBrands={menu.brands}
                  hasBanners={menu.banners}
                  menuName={menuName}
                  key={menuName}
                  menuIndex={index}
                />
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryMenu
