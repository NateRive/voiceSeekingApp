const LocationDao = require("../dao/location-dao");
const locationDao = new LocationDao();
var fs = require("fs-extra");

class Speech {
    constructor(bucketName, fileName) {
    }

    async getLocations() {
        return await locationDao.getLocationTree()
    }

}
module.exports = Speech;
