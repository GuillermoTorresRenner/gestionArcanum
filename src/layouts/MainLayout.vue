<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Cervecería Arcanum </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Opciones</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Insumos",
    caption: "Listado de insumos cerveceros",
    icon: "ion-flask",
    link: "/fermentables",
    color: "text-purple",
  },
  {
    title: "Estilos",
    caption: "Listado de estilos de cerveza",
    icon: "ion-finger-print",
    link: "/estilos",
    color: "text-info",
  },
  {
    title: "Recetas",
    caption: "Mis recetas personales",
    icon: "ion-bookmarks",
    link: "/recetas",
    color: "text-secondary",
  },
  {
    title: "Elaboraciones",
    caption: "Seguimiento de elaboraciones cerveceras",
    icon: "ion-beer",
    link: "/elaboraciones",
    color: "text-warning",
  },
  {
    title: "Stock",
    caption: "Detalle de assets e insumos",
    icon: "ion-cube",
    link: "/stock",
    color: "text-negative",
  },
  {
    title: "Finanzas",
    caption: "detalles de costos y flujo de caja",
    icon: "ion-cash",
    link: "/finanzas",
    color: "text-positive",
  },
  {
    title: "Estadísticas",
    caption: "graficos y datos de proceso",
    icon: "ion-analytics",
    link: "/estadisticas",
    color: "text-indigo",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
