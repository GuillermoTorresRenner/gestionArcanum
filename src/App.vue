<template>
  <router-view />
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useEstilos } from "./stores/useEstilos";
import { useFermentables } from "./stores/useFermentables";
import { useLupulos } from "./stores/useLupulos";
import { useLevaduras } from "./stores/useLevaduras";
import { useAuxiliares } from "./stores/useAuxiliares";

const $q = useQuasar();
$q.dark.set(true);
const style = useEstilos();
const insumo = useFermentables();
const hop = useLupulos();
const yeast = useLevaduras();
const aux = useAuxiliares();

onMounted(() => {
  style.getEstilosFromDB();
  insumo.getFermentablesFromDB();
  hop.getlupulosFromDB();
  yeast.getlevadurasFromDB();
  aux.getauxiliaresFromDB();
});
//Fin
</script>
