<template>
  <q-card class="col-12 col-sm-8 q-mb-xl">
    <q-card-section class="bg-primary text-white">
      <div class="row justify-center">
        <p class="text-center text-h5">Agua</p>
      </div>
    </q-card-section>
    <q-expansion-item expand-separator icon="ion-water">
      <q-card-section class="row"
        ><h4 class="text-primary">
          Cantidad Total: {{ aguaTotal }} Litros de agua
        </h4>
      </q-card-section>
      <q-separator white />
      <q-card-section>
        <p>Volumen Batch = {{ receta.getReceta.volumenBatch }} litros</p>
        <hr />
        <p>
          Volumen absorbido por granos =
          {{ aguaGranos }} litros
        </p>
        <hr />
        <p>
          Volumen pérdida elaboración =
          {{ config.getConfig.agua.perdidaElaboracion }} litros
        </p>
        <hr />
        <p>
          Volumen pérdida por evaporación =
          {{ config.getConfig.agua.perdidaEvaporacion }} litros
        </p>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>
<script setup>
import { computed } from "vue";

import { useConfig } from "../../stores/useConfig";
import { useRecetas } from "../../stores/useRecetas";

const receta = useRecetas();
const config = useConfig();
const aguaGranos = computed(() => {
  var totalGranos = 0;
  receta.getReceta.fermentables.forEach((f) => {
    totalGranos += parseFloat(f.cantidad);
  });
  return parseInt(totalGranos * config.getConfig.agua.absorcionGranos);
});

const aguaTotal = computed(() => {
  return parseInt(
    receta.getReceta.volumenBatch +
      config.getConfig.agua.perdidaElaboracion +
      config.getConfig.agua.perdidaEvaporacion +
      aguaGranos.value
  );
});
</script>
