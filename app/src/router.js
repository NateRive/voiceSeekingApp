import Vue from 'vue'
import Router from 'vue-router'
import Workspace from './views/Workspace'
import WorkspaceList from './views/WorkspaceList';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/workspace/:id',
            name: 'workspace',
            component: Workspace
        },
        {
            path: '/',
            name: 'WorkspaceList',
            component: WorkspaceList
        }
    ]
})