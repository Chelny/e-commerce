"use server"

import { revalidatePath } from "next/cache"
import { Account, Gender, User, UserAddress } from "@prisma/client"
import {
  custom,
  email,
  enum_,
  flatten,
  forward,
  minLength,
  nullable,
  object,
  type Output,
  regex,
  safeParse,
  string,
} from "valibot"
import {
  ECountryCode,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  POSTAL_CODE_CA_REGEX,
  POSTAL_CODE_US_REGEX,
  ROUTE_PROFILE,
} from "@/app/[locale]/_core"
import { getMinimumBirthdate } from "@/app/[locale]/_lib"
import { GET, POST } from "@/app/[locale]/account/profile/api/route"

export const getProfile = async (
  userId: string
): Promise<TApiResponse<User & { user_address: UserAddress; accounts: Account[] }>> => {
  const response = await GET(userId)
  const data = await response.json()
  return data
}

export const updateProfile = async (_: TFormState, formData: FormData): Promise<TFormActions> => {
  const schema = object(
    {
      id: string(),
      first_name: nullable(string([minLength(1, "first_name.required"), regex(NAME_REGEX, "first_name.pattern")])),
      last_name: nullable(string([minLength(1, "last_name.required"), regex(NAME_REGEX, "last_name.pattern")])),
      name: nullable(string([minLength(1, "name.required"), regex(NAME_REGEX, "name.pattern")])),
      gender: enum_(Gender, "gender.required"),
      birth_date: string([
        minLength(1, "birth_date.required"),
        custom((value: string) => new Date(value) < getMinimumBirthdate(), "birth_date.max"),
      ]),
      email: string([minLength(1, "email.required"), email("email.pattern")]),
      current_password: nullable(
        string([
          custom((value: string) => {
            if (value.length === 0 && !formData.get("password") && !formData.get("confirmPassword")) return true
            if (value.length > 0) return true
            return false
          }, "current_password.required"),
        ])
      ),
      password: nullable(
        string([
          custom((value: string) => {
            if (value.length === 0 && !formData.get("confirmPassword")) return true
            if (value.length > 0) return true
            return false
          }, "password.required"),
          custom((value: string) => {
            if (value.length === 0) return true
            if (PASSWORD_REGEX.test(value)) return true
            return false
          }, "password.pattern"),
        ])
      ),
      confirm_password: nullable(
        string([
          custom((value: string) => {
            if (value.length === 0 && !formData.get("password")) return true
            if (value.length > 0) return true
            return false
          }, "confirm_password.required"),
          custom((value: string) => {
            if (value.length === 0) return true
            if (PASSWORD_REGEX.test(value)) return true
            return false
          }, "confirm_password.pattern"),
        ])
      ),
      address_line1: string([minLength(1, "address_line1.required")]),
      address_line2: string(),
      city: string([minLength(1, "city.required")]),
      state: string([minLength(1, "state.required")]),
      country: string([minLength(1, "country.required")]),
      postal_code: string([
        minLength(1, "postal_code.required"),
        custom((value: string) => {
          switch (formData.get("country")) {
            case ECountryCode.CA:
              return POSTAL_CODE_CA_REGEX.test(value)
            case ECountryCode.US:
              return POSTAL_CODE_US_REGEX.test(value)
            default:
              return false
          }
        }, "postal_code.pattern"),
      ]),
      phone_number: string([minLength(1, "phone_number.required"), regex(PHONE_NUMBER_REGEX, "phone_number.pattern")]),
    },
    [
      forward(
        custom((input) => input.password === input.confirm_password, "confirm_password.match"),
        ["confirm_password"]
      ),
    ]
  )

  type ProfileData = Output<typeof schema>

  const result = safeParse(schema, {
    id: formData.get("id"),
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    name: formData.get("name"),
    gender: formData.get("gender"),
    birth_date: formData.get("birthDate"),
    email: formData.get("email"),
    current_password: formData.get("currentPassword"),
    password: formData.get("password"),
    confirm_password: formData.get("confirmPassword"),
    address_line1: formData.get("addressLine1"),
    address_line2: formData.get("addressLine2"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    postal_code: formData.get("postalCode"),
    phone_number: formData.get("phoneNumber"),
  })

  if (!result.success) {
    return {
      message: "Invalid email",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  // @ts-ignore
  const response = await POST<ProfileData>(result.output)
  const data = await response.json()

  revalidatePath(ROUTE_PROFILE.PATH)

  return data
}
