const PNF       = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/**
 * 与えられた電話番号を e164形式に変換する。
 * 例: 080-1234-1234 => +818012341234
 * @param {Integer} rawNumber 
 */
function format(rawNumber) {

  // libphonenumber japanで初期化 インスタンス化
  let number = phoneUtil.parseAndKeepRawInput(rawNumber, 'JP');

  // 電話番号の検証
  if (!phoneUtil.isValidNumber(number)) throw new Error(`Given phone number is invalid: ${rawNumber}`);

  // e164にformat
  return phoneUtil.format(number, PNF.E164)

}

module.exports  = {
  format
}
