<template>
  <q-card class="col-12 col-sm-8 q-my-xl">
    <q-card-section class="bg-primary text-white">
      <div class="row justify-center">
        <p class="text-center text-h5">Equipamiento</p>
      </div>
    </q-card-section>
    <q-expansion-item expand-separator icon="ion-construct">
      <q-card-section class="row">
        <q-slider
          v-model="config.getConfig.eficiencia.actual"
          :min="60"
          :max="100"
          :step="0.1"
          :color="[
            config.getConfig.eficiencia.actual > 60 &&
            config.getConfig.eficiencia.actual < 75
              ? 'red'
              : config.getConfig.eficiencia.actual >= 75 &&
                config.getConfig.eficiencia.actual < 80
              ? 'warning'
              : 'green',
          ]"
          label-always
          label
          :label-value="
            'Eficiencia Equipo:' + config.getConfig.eficiencia.actual + '%'
          "
          class="col"
        />
        <q-toggle
          v-model="usarPrmedio"
          color="green"
          label="Usar Eficiencia Promedio"
          icon="check"
          size="md"
          keep-color
          class="col"
        />
      </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>
    </q-expansion-item>
  </q-card>
  <div class="row justify-center">
    <q-btn color="green" icon="ion-save" @click="guardarRegistro" size="md" />
  </div>
</template>
<script setup>
import { useConfig } from "src/stores/useConfig";
import { ref } from "vue";
const config = useConfig();
const usarPrmedio = ref(false);
function guardarRegistro() {
  config.saveConfigInDB();
}
</script>
