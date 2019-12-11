import Vue from 'vue'
import Router from 'vue-router'
import Workspace from './views/Workspace'
import WorkspaceList from './views/WorkspaceList';
import AudioList from './views/AudioList';
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/workspace/:id',
            name: 'workspace',
            component: Workspace,
            children: [
                {
                    name: 'audioList',
                    path: 'page/:pageId',
                    component: AudioList
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