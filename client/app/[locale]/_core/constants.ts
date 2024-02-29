import XRegExp from "xregexp"

export const SERVER_URL = "http://localhost:8000/api"

export const INVENTORY_WARNING_COUNT = 10

export const LOCALE_REGEX = /[a-z]{2}-[A-Z]{2}/

export const BIRTH_DATE_REGEX = /^[1-9][0-9]{3}-(0[1-9]|1[0-2])-(0[0-9]|[1-2][0-9]|3[0-1])$/

export const EMAIL_REGEX =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

/**
 * Name Pattern
 * - Name must have letters and hyphen, space or an apostrophe
 * - Name must start with a capital letter
 * - No lowercase and uppercase-only name
 * - First letter must be uppercase
 * - The letter following a hyphen, space or an apostrophe must be uppercase
 * - Accented characters are allowed
 * - No -- or <space><space> or '' inside
 */
// export const NAME_REGEX = XRegExp("^([\\p{L}]{2,})?(?:((^| )[\\p{L}]{1,3}\\. |[-' ])[\\p{L}]{2,})*$")
export const NAME_REGEX =
  /^(?:[A-ZÀ-ÖØ-Þ][a-zà-öø-þ]*)(?:[-\s]?[A-ZÀ-ÖØ-Þ][a-zà-öø-þ]*)*(?:\.[\s]?[A-ZÀ-ÖØ-Þ][a-zà-öø-þ]*)*$/

/**
 * Password Pattern
 * - Password must be at least 8 characters long
 * - Must contain at least one digit
 * - Must contain at least one special character from !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
 */
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/

/**
 * Phone Number Pattern
 * - Valid values:
 *   - 1234567890 (Will auto-format on blur)
 *   - (123) 456-7890
 */
export const PHONE_NUMBER_REGEX = /^(([0-9]{10})|\([0-9]{3}\)\s[0-9]{3}-[0-9]{4})$/
export const PHONE_NUMBER_EXT_REGEX = /^[1-9][0-9]{2,4}$/

/**
 * Postal Code Pattern
 * Canada: A0A 0A0
 * USA: 55555 OR 55555-5555
 */
export const POSTAL_CODE_CA_REGEX = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s-]?\d[ABCEGHJ-NPRSTV-Z]\d$/
export const POSTAL_CODE_US_REGEX = /^(?!0{5})(\d{5})(?!-?0{4})(|-\d{1,4})?$/

/**
 * Username Pattern
 * - Username must be between 5 and 16 characters long
 * - Allowed characters: letters, digits, periods and underscores
 * - No _ or . at the beginning
 * - No __ or _. or ._ or .. inside
 * - No _ or . at the end
 *
 * Source: https://stackoverflow.com/a/12019115
 */
export const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{5,16})(?!.*[_.]{2})[^_.].*[^_.]$/
