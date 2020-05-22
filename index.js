const AWS       = require('aws-sdk');

const phoneFormater= require('./phoneFormatter');
const aliasInserter = require('./aliasInserter');
const repository = require('./repository');

// aws の追加設定
/*
AWS.config.update({
  region: 'ap-northeast-1'
});
*/

/**
 * 与えられたpromotionIdをもとに、repositoryでpromotionを取得。smsを送信する。
 * @param {Integer} promotionId 
 */
async function send(promotionId) {

  if(!promotionId) throw new Error('PromotionId is undefined!');

  const promotion = await repository.findDirectPromotionByPromotionId(promotionId);

  const { message, members } = promotion;

  // message
  const params = members.map(member => {

    if(!member.phone) throw new Error('No phone is found in destination!') ;
    if(!member.name)  throw new Error('No name is found in destination!');

    // awsのsmsがe164形式の電話番号にしか対応していないのでformat
    const number = phoneFormater.format(member.phone);

    // messageの{@user}にお客さんの名前を埋め込む
    const realMessage = aliasInserter.insert(message, member.name);

    return {
      PhoneNumber: number,
      Message: realMessage
    };

  })

  //console.log('params', params)

  // promise allにつめこむために、promiseの配列を作る。
  const promises = params.map(param =>  {
    return new AWS.SNS({apiVersion: '2010-03-31'}).publish(param).promise(); // awsのメソッドはpromise()でpromise化できる。
  });

  // Promise allをすると引数の配列を非同期に並列して実行してくれる。
  return Promise.all(promises)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err, err.stack);
    });

};

module.exports = {
  send
};

