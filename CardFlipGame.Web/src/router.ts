import { createRouter, createWebHistory } from "vue-router";
import { CAdminEditorPage, CAdminTablePage } from "coalesce-vue-vuetify3";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/instructions",
      name: "instructions",
      component: () => import("./views/Instructions.vue"),
    },
    {
      path: "/play",
      name: "play",
      component: () => import("./views/Play.vue"),
    },
    {
      path: "/findracegame",
      name: "race lobbies",
      component: () => import("./views/RaceGameLobby.vue"),
    },
    {
      path: "/playrace/:id",
      name: "PlayRace",
      component: () => import("./views/PlayRace.vue"),
      props: (r) => ({raceGameId : +r.params.id}),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("./views/Stats.vue"),
    },
    {
      path: "/coalesce-example",
      name: "coalesce-example",
      component: () => import("./views/CoalesceExample.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/Admin.vue"),
    },

    // Coalesce admin routes
    {
      path: "/admin/:type",
      name: "coalesce-admin-list",
      component: titledAdminPage(CAdminTablePage),
      props: true,
    },
    {
      path: "/admin/:type/edit/:id?",
      name: "coalesce-admin-item",
      component: titledAdminPage(CAdminEditorPage),
      props: true,
    },
  ],
});

/** Creates a wrapper component that will pull page title from the
 *  coalesce admin page component and pass to to `useTitle`.
 */
function titledAdminPage<
  T extends typeof CAdminTablePage | typeof CAdminEditorPage
>(component: T) {
  return defineComponent({
    setup() {
      const pageRef = ref<InstanceType<T>>();
      useTitle(() => pageRef.value?.pageTitle);
      return { pageRef };
    },
    render() {
      return h(component, {
        color: "primary",
        ref: "pageRef",
        ...this.$attrs,
      });
    },
  });
}
