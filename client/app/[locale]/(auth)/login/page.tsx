import Link from 'next/link'
import { useTranslation } from '@/app/i18n'

export default async function Login({ params }: PageParams) {
  const { t } = await useTranslation(params.locale, ['common', 'authentication'])

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <h1>{t('authentication:form.login')}</h1>
      <form className='flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md' noValidate>
        <label htmlFor="email">{t('authentication:form.email_label')}</label>
        <input type="email" id="email" autoFocus />
        <label htmlFor="password">{t('authentication:form.password_label')}</label>
        <input type="password" id="password" />
        <button type='submit'>{t('authentication:form.login_button')}</button>
        <hr />
        <button type='button'>{t('authentication:form.sign_up_button')}</button>
      </form>
      <div className='my-6 justify-self-start'>
        <Link href={`/${params.locale}`}>{t('pages.back_home')}</Link>
      </div>
    </section>
  )
}
