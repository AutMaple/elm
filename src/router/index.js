import vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import City from "@/pages/City";
import Site from "@/pages/Site";
import Food from "@/pages/Food";

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
    {
      path: "/city/:cityId",
      component: City,
    },
    {
      path: "/site",
      component: Site,
    },
    {
      path: "/food",
      component: Food
    }
  ],
});
