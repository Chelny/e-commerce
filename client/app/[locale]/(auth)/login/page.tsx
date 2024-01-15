import Link from 'next/link'
import { useTranslation } from '@/app/i18n'

export default async function Login({ params }: PageParams) {
  const { t } = await useTranslation(params.locale, ['common', 'authentication'])

  return (
    <>
      <h1>{t('authentication:form.login')}</h1>
      <form className='flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md' noValidate>
        <label htmlFor="email">{t('authentication:form.label.email')}</label>
        <input type="email" id="email" autoFocus required />
        <label htmlFor="password">{t('authentication:form.label.password')}</label>
        <input type="password" id="password" required />
        <button type='submit'>{t('authentication:form.login')}</button>
        <hr />
        <div className='flex justify-center space-x-4 py-4'>
          <Link href={`/${params.locale}/sign-up`}>{t('authentication:form.sign_up')}</Link>
          <Link href={`/${params.locale}/forgot-password`}>{t('authentication:form.forgot_password')}</Link>
        </div>
      </form>
    </>
  )
}
