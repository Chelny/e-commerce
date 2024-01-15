'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

export function ShopMenu({ locale }: { locale: string }) {
  const pathname = usePathname()
  const { t } = useTranslation(locale, 'common')

  return (
    <nav className='hidden md:block bg-ecommerce-900 px-6 py-4'>
      <ul className='flex justify-evenly py-8'>
        <li>
          <Link className={`shop-menu-link ${pathname === `/${locale}/shop?filter=new-arrivals` ? 'active' : ''}`}
            href={`/${locale}/shop?filter=new-arrivals`}
            locale={false}>
            {t('shop_menu.new_arrivals')}
          </Link>
        </li>
        <li>
          <Link
            className={`shop-menu-link ${pathname === `/${locale}/shop?filter=mens` ? 'active' : ''}`}
            href={`/${locale}/shop?filter=mens`}
            locale={false}
          >
            {t('shop_menu.mens')}
          </Link>
        </li>
        <li>
          <Link
            className={`shop-menu-link ${pathname === `/${locale}/shop?filter=womens` ? 'active' : ''}`}
            href={`/${locale}/shop?filter=womens`}
            locale={false}
          >
            {t('shop_menu.womens')}
          </Link>
        </li>
        <li>
          <Link
            className={`shop-menu-link ${pathname === `/${locale}/shop?filter=kids` ? 'active' : ''}`}
            href={`/${locale}/shop?filter=kids`}
            locale={false}
          >
            {t('shop_menu.kids')}
          </Link>
        </li>
        <li>
          <Link
            className={`shop-menu-link ${pathname === `/${locale}/shop?filter=sale` ? 'active' : ''}`}
            href={`/${locale}/shop?filter=sale`}
            locale={false}
          >
            {t('shop_menu.sale')}
          </Link>
        </li>
      </ul>
    </nav>
  )
}