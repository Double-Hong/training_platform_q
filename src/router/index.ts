import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import studentHomeView from "@/views/studentviews/stuentHomeView.vue";
import AdministratorView from '../views/OrganizationAdministratorViews/AdministratorView.vue'
import SchoolView from '../views/OrganizationAdministratorViews/SchoolView.vue'
import IntroductionView from "@/views/OrganizationAdministratorViews/IntroductionView.vue";
import StaffView from "@/views/OrganizationAdministratorViews/StaffView.vue"
import StudentList from '../views/OrganizationAdministratorViews/StudentList.vue'
import CourseView from '../views/OrganizationAdministratorViews/CourseView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/administrator/:id',
        name: 'administrator',
        component: AdministratorView
    },
    {
        path: '/studentsHome/:username',
        name: 'studentsHome',
        component: studentHomeView
    },
    {
        path: '/school/:id/:id2',
        name: 'school',
        component: SchoolView,
        children: [
            {
                path: 'introduction',
                name: 'introduction',
                component: IntroductionView
            },
            {
                path: 'staff',
                name: 'staff',
                component: StaffView
            }
        ]
    },
    {
        path: '/studentList/:organizationId',
        name: 'studentList',
        component: StudentList
    },
    {
        path: '/course/:peopleId/:organizationId',
        name: 'course',
        component: CourseView
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
