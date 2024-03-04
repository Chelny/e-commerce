export interface IUser {
  id: number
  first_name: string
  last_name: string
  gender: string
  birth_date: string
  email: string
  password: string
  active: boolean
  created_at: string
  updated_at: string

  // Django
  last_login: string
  is_superuser: boolean
  groups: string[]
  user_permissions: string[]
}
