import locationModel from "./locationModel";
import wordModel from "./wordModel";
import speechModel from "./speechModel";
import fileModel from "./fileModel";

const models = {
    location: locationModel,
    word: wordModel,
    speech: speechModel,
    file: fileModel
}

export default {
    get: name => models[name]
}