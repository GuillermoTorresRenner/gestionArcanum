const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/fermentables",
        component: () => import("src/pages/InsumosFermentables.vue"),
      },
      {
        path: "/lupulos",
        component: () => import("src/pages/InsumoLupulos.vue"),
      },
      {
        path: "/levaduras",
        component: () => import("src/pages/InsumoLevaduras.vue"),
      },

      {
        path: "/auxiliares",
        component: () => import("src/pages/InsumoAuxiliares.vue"),
      },
      {
        path: "/estilos",
        component: () => import("src/pages/EstilosCervezas.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
