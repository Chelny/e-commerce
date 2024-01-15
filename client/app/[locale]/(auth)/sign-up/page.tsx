import Link from 'next/link'
import { useTranslation } from '@/app/i18n'

export default async function SignUp({ params }: PageParams) {
  const { t } = await useTranslation(params.locale, ['common', 'authentication'])

  return (
    <>
      <h1>{t('authentication:form.sign_up')}</h1>
      <form className='flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md' noValidate>
        <div className='grid md:grid-cols-[1fr_1fr] md:space-x-2'>
          <div className='flex flex-col'>
            <label htmlFor="firstName">{t('authentication:form.label.first_name')}</label>
            <input type="text" id="firstName" autoFocus required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="lastName">{t('authentication:form.label.last_name')}</label>
            <input type="text" id="lastName" required />
          </div>
        </div>
        <label htmlFor="gender">{t('authentication:form.label.gender')}</label>
        <div className='grid md:grid-cols-[1fr_1fr_1fr]'>
          <div className='flex space-x-2'>
            <label className='radio-button' htmlFor="genderMale">
              <input type="radio" id="genderMale" name="gender" value="M" required />
              {t('authentication:form.label.gender_male')}
              <span></span>
            </label>
          </div>
          <div className='flex space-x-2'>
            <label className='radio-button' htmlFor="genderFemale">
              <input type="radio" id="genderFemale" name="gender" value="F"  />
              {t('authentication:form.label.gender_female')}
              <span></span>
            </label>
          </div>
          <div className='flex space-x-2'>
            <label className='radio-button' htmlFor="genderOther">
              <input type="radio" id="genderOther" name="gender" value="O" />
              {t('authentication:form.label.gender_other')}
              <span></span>
            </label>
          </div>
        </div>
        <label htmlFor="birthDate">{t('authentication:form.label.birth_date')}</label>
        <input type="date" id="birthDate" required />
        <label htmlFor="email">{t('authentication:form.label.email')}</label>
        <input type="email" id="email" required />
        <div className='grid md:grid-cols-[1fr_1fr] md:space-x-2 space-y-2 md:space-y-0'>
          <div className='flex flex-col'>
            <label htmlFor="password">{t('authentication:form.label.password')}</label>
            <input type="password" id="password" required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="confirmPassword">{t('authentication:form.label.confirm_password')}</label>
            <input type="password" id="confirmPassword" required />
          </div>
        </div>
        <button type='submit'>{t('authentication:form.sign_up')}</button>
        <hr />
        <div className='flex justify-center space-x-4 py-4'>
          <Link href={`/${params.locale}/login`}>{t('authentication:form.login')}</Link>
        </div>
      </form>
    </>
  )
}
