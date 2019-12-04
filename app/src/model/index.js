import pageModel from "./pageModel";
import wordModel from "./wordModel";
import speechModel from "./speechModel";
import fileModel from "./fileModel";
import workspaceModel from "./workspaceModel";

const models = {
    page: pageModel,
    word: wordModel,
    speech: speechModel,
    file: fileModel,
    workspace: workspaceModel
}

export default {
    get: name => models[name]
}