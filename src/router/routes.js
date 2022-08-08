const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "Login",
      },
      {
        path: "/fermentables",
        component: () => import("src/pages/InsumosFermentables.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/lupulos",
        component: () => import("src/pages/InsumoLupulos.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/levaduras",
        component: () => import("src/pages/InsumoLevaduras.vue"),
        meta: { requireLogin: true },
      },

      {
        path: "/auxiliares",
        component: () => import("src/pages/InsumoAuxiliares.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/estilos",
        component: () => import("src/pages/EstilosCervezas.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/recetas",
        component: () => import("src/pages/RecetasPersonales.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/configuraciones",
        component: () => import("src/pages/ConfigPersonales.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/opciones-usuario",
        component: () => import("src/pages/OpcionesUsuario.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/stock",
        component: () => import("src/pages/StockInsumos.vue"),
        meta: { requireLogin: true },
      },
      {
        path: "/elaboraciones",
        component: () => import("src/pages/AsistenciaElaboraciones.vue"),
        meta: { requireLogin: true },
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
