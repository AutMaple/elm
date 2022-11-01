import vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";

vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "",
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});
