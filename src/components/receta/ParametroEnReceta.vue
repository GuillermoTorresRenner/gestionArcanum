<template>
  <q-card
    class="col-12 col-sm-8 q-mb-xl"
    v-if="receta.getReceta.estiloBase !== ''"
  >
    <q-card-section class="bg-purple text-white">
      <p class="text-center">Parámetros Fundamentales</p>
      <div class="row justify-center">
        <q-input
          v-model="receta.getReceta.nombre"
          type="text"
          label="Nombre de Receta"
          class="col"
        />
      </div>
    </q-card-section>
    <q-expansion-item
      expand-separator
      icon="ion-compass"
      label="Parámetros de Receta"
      :caption="receta.getReceta.nombre"
    >
      <q-card-section class="row">
        <q-input
          v-model="receta.getReceta.volumenBatch"
          type="number"
          label="Volumen Batch"
          suffix="Litros"
          class="col q-mr-xl"
        />
        <q-input
          v-model="config.getConfig.eficiencia.actual"
          type="number"
          label="Eficiencia"
          suffix="%"
          class="col"
          readonly
          hint="Modificar desde Configuraciones Generales"
        />
      </q-card-section>

      <q-card-section class="row">
        <q-input
          v-model.number="receta.getReceta.densidadInicialObjetivo"
          type="number"
          label="Densidad Inicial Objetivo"
          dense
          class="col q-mr-xl"
          :hint="
            estilo.getEstilo.densidadInicial.min +
            ' - ' +
            estilo.getEstilo.densidadInicial.max
          "
        />
        <q-input
          v-model.number="receta.getReceta.densidadFinalObjetivo"
          type="number"
          label="Densidad Final Objetivo"
          dense
          class="col"
          :hint="
            estilo.getEstilo.densidadFinal.min +
            ' - ' +
            estilo.getEstilo.densidadFinal.max
          "
        />
      </q-card-section>

      <q-card-section class="row">
        <q-input
          v-model.number="receta.getReceta.ibuObjetivo"
          type="number"
          label="IBU objetivo"
          dense
          class="col q-mr-xl"
          suffix="IBUs"
          :hint="estilo.getEstilo.ibu.min + ' - ' + estilo.getEstilo.ibu.max"
        />
        <q-input
          v-model.number="receta.getReceta.srmObjetivo"
          type="text"
          label="SRM Estimado"
          dense
          class="col"
          suffix="SRM"
          readonly
          :hint="
            estilo.getEstilo.color.min + ' - ' + estilo.getEstilo.color.max
          "
        />
      </q-card-section>

      <q-card-section class="row">
        <!-- Estimado -->
        <q-input
          v-model.number="receta.getReceta.abvEstimado"
          type="text"
          label="ABV Estimado"
          dense
          class="col q-mr-xl"
          suffix="°GL"
          readonly
          :hint="estilo.getEstilo.abv.min + ' - ' + estilo.getEstilo.abv.max"
        />
        <!-- Estimado -->
        <q-input
          v-model.number="receta.getReceta.atenuacionEstimada"
          type="text"
          label="Atenuación Estimada"
          dense
          class="col"
          suffix="%"
          readonly
        />
      </q-card-section>

      <q-card-section class="row">
        <q-input
          v-model.number="receta.getReceta.carbonatacionObjetivo"
          type="number"
          label="Carbonatación Objetivo"
          dense
          class="col q-mr-xl"
          suffix="°GL"
          :hint="estilo.getEstilo.carb.min + ' - ' + estilo.getEstilo.carb.max"
        />
        <q-input
          v-model.number="receta.getReceta.empaste"
          type="number"
          label="Empaste"
          dense
          class="col"
          :suffix="receta.getReceta.empaste + ': 1'"
        />
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>
<script setup>
import { useConfig } from "src/stores/useConfig";
import { useEstilos } from "src/stores/useEstilos";
import { useRecetas } from "src/stores/useRecetas";
import { ref, computed } from "vue";

const estilo = useEstilos();
const receta = useRecetas();
const config = useConfig();
//Calculo de variables derivadas
const abvEstimado = computed(() => {
  return (
    (receta.getReceta.densidadInicialObjetivo -
      receta.getReceta.densidadFinalObjetivo) *
    0.13125
  ).toFixed(1);
});

receta.getReceta.abvEstimado = abvEstimado;

const atenuacionEstimada = computed(() => {
  return (
    ((receta.getReceta.densidadInicialObjetivo -
      receta.getReceta.densidadFinalObjetivo) /
      (receta.getReceta.densidadInicialObjetivo - 1000)) *
    100
  ).toFixed(1);
});
receta.getReceta.atenuacionEstimada = atenuacionEstimada;
</script>
