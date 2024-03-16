"use client"

import Image from "next/image"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { useTranslation } from "@/app/i18n/client"
// import styles from "./Avatar.module.css"

type TAvatar = {
  locale: TLocale
}

export const Avatar = (props: TAvatar): JSX.Element => {
  const { t } = useTranslation(props.locale, "common")
  const user = useCurrentUser()

  return (
    <>
      <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        {user?.email && user?.name && user?.image ? (
          <Image
            className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            src={user?.image}
            alt={user?.name}
            width={10}
            height={10}
          />
        ) : (
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        )}
      </div>

      <div
        id="userDropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="font-medium truncate">name@flowbite.com</div>
        </div>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  )
}
