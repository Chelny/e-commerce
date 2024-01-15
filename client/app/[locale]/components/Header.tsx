'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { ChangeLocale } from '@/app/[locale]/components/ChangeLocale'
import { useTranslation } from '@/app/i18n/client'

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname()
  const { t } = useTranslation(locale, 'common')

  return (
    <header className='sticky z-20 top-0 grid justify-between items-center grid-cols-app-header md:grid-cols-app-header-md gap-4 p-4 bg-ecommerce-100 dark:bg-ecommerce-900'>
      <ChangeLocale className='hidden md:block'></ChangeLocale>
      <h1 className='my-0 text-start md:text-center text-2xl uppercase'>
        <Link className={`!text-ecommerce-800 dark:!text-ecommerce-100 ${pathname === `/${locale}` ? 'active' : ''}`} href={`/${locale}`} locale={false}>
          E-Commerce
        </Link>
      </h1>
      <nav className='flex justify-end items-center gap-4'>
        <ul className='flex space-x-8'>
          <li>
            <FontAwesomeIcon icon={faSearch} />
          </li>
          <li>
            <Link
              className={`app-menu-link ${pathname === `/${locale}/login` ? 'active' : ''}`}
              href={`/${locale}/login`}
              locale={false}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
          <li>
            <Link
              className={`app-menu-link ${pathname === `/${locale}/cart` ? 'active' : ''}`}
              href={`/${locale}/cart`}
              locale={false}
            >
              <FontAwesomeIcon icon={faBagShopping} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}