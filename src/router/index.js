import vue from "vue"
import VueRouter from "vue-router"
import Home from "../pages/Home"
import About from "../pages/About"

vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Home
        },
        {
            path: "/about",
            component: About
        }
    ]
})
