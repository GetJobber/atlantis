import { parsePhoneNumberFromString } from "libphonenumber-js";

export function formatPhoneNumberForDisplay(
  phoneNumber: string,
  international = false,
) {
  const parsed = parsePhoneNumberFromString(phoneNumber);

  if (!parsed) {
    return phoneNumber;
  }

  if (international) {
    return parsed.formatInternational();
  }

  return parsed.formatNational();
}
