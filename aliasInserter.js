
function insert ( message, name, link ) {

  return message.replace(new RegExp('{@user}', 'g'), name).replace(new RegExp('{@link}', 'g'), link)

}

module.exports = {
  insert
}
