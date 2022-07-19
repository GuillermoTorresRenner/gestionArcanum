<template>
  <!-- <CargarDatos /> -->
  <q-card class="col-12 col-sm-8 q-my-xl">
    <q-card-section class="bg-primary text-white">
      <div class="row justify-center">
        <p class="text-center text-h5">Parámetros Elaboración</p>
      </div>
    </q-card-section>
    <q-expansion-item expand-separator icon="ion-construct">
      <q-card-section>
        <div class="row justify-center">
          <h4 class="text-center text-primary"><u>Eficiencia</u></h4>
        </div>
        <div class="row">
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
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row justify-center">
          <h4 class="text-info text-center text-underlined"><u>Agua</u></h4>
        </div>
        <div class="row justify-center">
          <q-input
            v-model.number="config.getConfig.agua.absorcionGranos"
            type="text"
            label="Absorción de granos"
            hint="1.87 nominal"
            class="col q-mr-xl"
          />
          <q-input
            v-model.number="config.getConfig.agua.perdidaEvaporacion"
            type="text"
            label="Evaporación (l/h)"
            hint="3l nominal"
            class="col q-mr-xl"
          />
          <q-input
            v-model.number="config.getConfig.agua.perdidaElaboracion"
            type="text"
            label="Pérdida Elaboración"
            hint="5l nominal"
            class="col"
          />
        </div>
      </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>
    </q-expansion-item>
  </q-card>
  <div class="row justify-center">
    <q-btn
      color="green"
      icon="ion-save"
      @click="noti"
      size="md"
      class="q-mb-xl"
    />
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { useConfig } from "src/stores/useConfig";
import { ref } from "vue";
// import CargarDatos from "src/components/CargarDatos.vue";
const config = useConfig();
const $q = useQuasar();
const usarPrmedio = ref(false);
function noti() {
  $q.notify({
    message: "¿Desea guardar la configuración?",
    color: "purple",
    position: "top",
    icon: "warning",
    actions: [
      {
        label: "Guardar",
        icon: "ion-save",
        color: "green",
        handler: () => {
          config.saveConfigInDB();
          $q.notify({
            message: "Configuración Guardada",
            color: "green",
            position: "bottom",
            icon: "check",
          });
        },
      },
      {
        label: "Cancelar",
        icon: "cancel",
        color: "red",
        handler: () => {},
      },
    ],
  });
}
</script>
