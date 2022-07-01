<template>
  <q-tabs v-model="tab" inline-label>
    <q-route-tab
      name="fermentables"
      icon="spa"
      label="Fermentables"
      class="text-warning"
      to="/fermentables"
    />
    <q-route-tab
      name="lupulos"
      icon="workspaces"
      label="Lúpulos"
      class="text-positive"
      to="/lupulos"
    />
    <q-route-tab
      name="levaduras"
      icon="biotech"
      label="Levaduras"
      class="text-info"
      to="/levaduras"
    />
    <q-route-tab
      name="auxiliares"
      icon="grass"
      label="Auxiliares"
      class="text-purple"
      to="/auxiliares"
    />
  </q-tabs>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "TabsInsumos",
  setup() {
    return {
      tab: ref(""),
    };
  },
};
</script>
