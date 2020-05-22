const AWS = require('aws-sdk')
const sinon = require('sinon')
const expect = require('chai').expect
const repository = require('./repository')
const sms = require('./index')



describe('sendSms method', function(){

  describe('valid promotion id', function(){

    it('should send sms', function(done){

      // Arrange
      let sandbox = sinon.createSandbox()
      const stubSNS = sandbox.stub(AWS, 'SNS')
      const stubPublish = sinon.stub().returns({ promise: () => Promise.resolve({}) })
      stubSNS.returns({ publish: stubPublish })

      const stubRepositoryMethod = sinon.stub(repository, 'findDirectPromotionByPromotionId')
      stubRepositoryMethod.returns(Promise.resolve({
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
              tel: '090-1234-1234',
              name: '山田太郎'
            }
          },
          {
            senderKey: 'tel',
            attributes:  {
              tel: '090-9999-9999',
              name: '河野太郎'
            }
          }
        ]
      }))

      const params = [
        {
          PhoneNumber: '+819012341234',
          Message: '山田太郎様　以下からアンケートに回答してください。http://www.google.com'
        },
        {
          PhoneNumber: '+819099999999',
          Message: '河野太郎様　以下からアンケートに回答してください。http://www.google.com'
        }

      ]

      const promotionId = 1

      // Act
      sms.send(promotionId).then(() => {

        // Asert
        expect(stubPublish.withArgs(params[0]).calledOnce).to.be.true
        expect(stubPublish.withArgs(params[1]).calledOnce).to.be.true
        done()

      }).catch(done)

    })

  })

  /*
  describe('not existed promotion id', function(){

  })

  describe('in destinations, phone number invalid', function(){

    it('should throw error', function(){

    })

  })

  describe('fail to sms send', function(){

  })
  */

})
