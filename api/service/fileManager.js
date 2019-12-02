const CloudService = require("./gcp");
const cloudService = new CloudService()

class Speech {
  constructor() {
  }

  async getSignedURL(path) {
    return await cloudService.getSignedURL(path)
  }

}
module.exports = Speech;
