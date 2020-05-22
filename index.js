const AWS       = require('aws-sdk')

const phoneFormater= require('./phoneFormatter')
const aliasInserter = require('./aliasInserter')
const repository = require('./repository')

// aws configure
/*
AWS.config.update({
  region: 'ap-northeast-1'
});
*/


async function send(promotionId) {

  if(!promotionId) throw new Error('PromotionId is undefined!')

  const promotion = await repository.findDirectPromotionByPromotionId(promotionId)

  const { content, method, destinations } = promotion

  // validate and convert phone number into E164 type.
  // insert name and link to message alias
  const params = destinations.map(destination => {

    if(!destination.senderKey){ throw new Error('No senderKey is found in destination!') }
    if(!destination.attributes.name){ throw new Error('No name is found in destination!')}

    // format e164(internatinal) format
    const number = phoneFormater.format(destination.attributes[destination.senderKey]);

    // insert
    const realMessage = aliasInserter.insert(method.message, destination.attributes.name, content.attributes.link)

    return {
      PhoneNumber: number,
      Message: realMessage
    }

  })

  //console.log('params', params)

  const promises = params.map(param =>  {
    return new AWS.SNS({apiVersion: '2010-03-31'}).publish(param).promise();
  })

  return Promise.all(promises)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err, err.stack)
    })

};

module.exports = {
  send
}

