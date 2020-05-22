const PNF       = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function format(rawNumber) {

  // parse into libphonenumber innstance
  let number = phoneUtil.parseAndKeepRawInput(rawNumber, 'JP');

  // validate
  if (!phoneUtil.isValidNumber(number)) throw new Error(`Given phone number is invalid: ${rawNumber}`);

  // format
  return phoneUtil.format(number, PNF.E164)

}

module.exports  = {
  format
}
