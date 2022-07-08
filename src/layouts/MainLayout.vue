<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="isAuthenticated">
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
        <q-btn-dropdown color="white" dropdown-icon="ion-more" flat>
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-btn
                  color="white"
                  icon="ion-person"
                  @click="onClick"
                  flat
                  unelevated
                  ripple="false"
                  to="/opciones-usuario"
                />
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-btn
                  color="white"
                  icon="ion-settings"
                  @click="onClick"
                  flat
                  unelevated
                  ripple="false"
                  to="/configuraciones"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="isAuthenticated"
    >
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
import { useAuth } from "@vueuse/firebase";
import { auth } from "src/boot/firebase";

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
    const { isAuthenticated } = useAuth(auth);

    return {
      isAuthenticated,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
