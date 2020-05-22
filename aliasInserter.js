
/**
 * {@user}の部分にnameを埋め込む。
 * 例: こんにちは {@user} => こんにちは 山田太郎
 * @param {String} message 
 * @param {String} name 
 */
function insert ( message, name ) {

  return message.replace(new RegExp('{@user}', 'g'), name);

};

module.exports = {
  insert
};
