import Vue from 'vue'
import Router from 'vue-router'
import Workspace from './views/Workspace'
import WorkspaceList from './views/WorkspaceList';
import AudioList from './views/AudioList';
import AudioDetail from './views/AudioDetail';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/workspaces/:workspaceId',
            name: 'workspace',
            component: Workspace,
            children: [
                {
                    name: 'audioList',
                    path: 'pages/:pageId',
                    component: AudioList
                },
                {
                    name: 'audioDetail',
                    path: 'audios/:audioId',
                    component: AudioDetail
                }
            ]
        },
        {
            path: '/',
            name: 'WorkspaceList',
            component: WorkspaceList
        }
    ]
})