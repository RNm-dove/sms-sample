
/**
 * 与えられたpromotionIdをもとにDBからpromotionを取得する。
 * 現在はただ空のpromiseを返す。
 * @param {Integer} promotionId 
 */
function findDirectPromotionByPromotionId(promotionId) {

  return Promise.resolve({})

  /*
  return Promise.resolve({
    promotionId: 1,
    storeId: 1,
    content: {
      attributes: {
        title: "こんにちは",
        link: "http://www.google.com",
      }
    },
    method: {
      type: 'SMS',
      message: '{@user}様　以下からアンケートに回答してください。{@link}'
    },
    destinations: [
      {
        senderKey: 'tel',
        attributes: {
          tel: '090-1234-1234', // 実際送るときはここを自分のtelにしてね。
          name: '山田太郎'
        }
      }
    ]
  })
  */

}

module.exports = {
  findDirectPromotionByPromotionId
}
