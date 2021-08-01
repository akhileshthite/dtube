const DTube = artifacts.require('./DTube.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DTube', ([deployer, author]) => {
  let DTube

  before(async () => {
    DTube = await DTube.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await DTube.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await DTube.name()
      assert.equal(name, 'DTube')
    })
  })

  describe('videos', async () => {
    let result, videoCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await DTube.uploadVideo(hash, 'Video title', { from: author })
      videoCount = await DTube.videoCount()
    })

    //check event
    it('creates videos', async () => {
      // SUCESS
      assert.equal(videoCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.title, 'Video title', 'title is correct')
      assert.equal(event.author, author, 'author is correct')

      // FAILURE: Video must have hash
      await DTube.uploadVideo('', 'Video title', { from: author }).should.be.rejected;

      // FAILURE: Video must have title
      await DTube.uploadVideo('Video hash', '', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists videos', async () => {
      const video = await DTube.videos(videoCount)
      assert.equal(video.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(video.hash, hash, 'Hash is correct')
      assert.equal(video.title, 'Video title', 'title is correct')
      assert.equal(video.author, author, 'author is correct')
    })
  })
})