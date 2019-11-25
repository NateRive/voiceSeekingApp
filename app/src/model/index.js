import locationModel from "./locationModel";
import wordModel from "./wordModel";
import speechModel from "./speechModel";

const models = {
    location: locationModel,
    word: wordModel,
    speech: speechModel
}

export default {
    get: name => models[name]
}