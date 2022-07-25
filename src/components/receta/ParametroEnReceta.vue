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
          lazy-rules="ondemand"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ingrese un nombre para la receta',
          ]"
          :readonly="!editar"
        />
      </div>
    </q-card-section>
    <q-expansion-item
      expand-separator
      icon="ion-compass"
      label="Parámetros de Receta"
      :caption="receta.getReceta.nombre"
    >
      <q-card-section class="row items-end">
        <q-slider
          v-model="receta.getReceta.volumenBatch"
          :min="config.getConfig.volumenElaboracion.min"
          :max="config.getConfig.volumenElaboracion.max"
          :step="1"
          label
          :label-value="receta.getReceta.volumenBatch + 'Litros '"
          label-always
          color="primary"
          class="col q-mr-xl"
          hint="considere 5 L extras por pérdidas de proceso"
          markers8
          :readonly="!editar"
        />

        <!-- Dato desde configuración General de la app -->
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

      <q-card-section class="row items-end q-mt-lg">
        <q-slider
          v-model="receta.getReceta.densidadInicialObjetivo"
          :min="estilo.getEstilo.densidadInicial.min"
          :max="estilo.getEstilo.densidadInicial.max"
          :step="1"
          label
          :label-value="receta.getReceta.densidadInicialObjetivo + ' DI'"
          label-always
          color="info"
          class="col q-mr-xl"
          :rules="[(val) => (val && val > 0) || 'Ingrese Densidad Inical']"
          markers
          :marker-labels="arrayDI"
          :readonly="!editar"
        />

        <q-slider
          v-model="receta.getReceta.densidadFinalObjetivo"
          :min="estilo.getEstilo.densidadFinal.min"
          :max="estilo.getEstilo.densidadFinal.max"
          :step="1"
          label
          :label-value="receta.getReceta.densidadFinalObjetivo + ' DF'"
          label-always
          color="info"
          class="col"
          :rules="[(val) => (val && val > 0) || 'Ingrese Densidad Final']"
          markers
          :marker-labels="arrayDF"
          :readonly="!editar"
        />
      </q-card-section>

      <q-card-section class="row items-end">
        <q-slider
          v-model="receta.getReceta.ibuObjetivo"
          :min="estilo.getEstilo.ibu.min"
          :max="estilo.getEstilo.ibu.max"
          :step="1"
          label
          :label-value="receta.getReceta.ibuObjetivo + ' IBUs'"
          label-always
          color="green"
          class="col q-mr-xl"
          :rules="[(val) => (val && val > 0) || 'Ingrese IBUs']"
          markers
          :marker-labels="ArrayIBU"
          :readonly="!editar"
        />
        <!-- Estimado -->
        <q-input
          v-model.number="colorEstimado"
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

      <q-card-section class="row items-end">
        <!-- Estimado -->
        <q-input
          v-model.number="abvEstimado"
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
          v-model.number="atenuacionEstimada"
          type="text"
          label="Atenuación Estimada"
          dense
          class="col"
          suffix="%"
          readonly
          hint="Dependerá de la levadura utilizda entre otros"
        />
      </q-card-section>

      <q-card-section class="row items-end">
        <q-slider
          v-model="receta.getReceta.carbonatacionObjetivo"
          :min="1"
          :max="4"
          :step="0.1"
          label
          :label-value="receta.getReceta.carbonatacionObjetivo + ' Vol CO2'"
          label-always
          color="pink"
          class="col q-mr-xl"
          :rules="[(val) => (val && val > 0) || 'Ingrese carbonatación']"
          markers
          :marker-labels="arrayCarb"
          :readonly="!editar"
        />
        <q-slider
          v-model="receta.getReceta.empaste"
          :min="1"
          :max="4"
          :step="0.1"
          label
          :label-value="receta.getReceta.empaste + ' :1'"
          label-always
          color="teal"
          class="col q-mr-xl"
          :rules="[(val) => (val && val > 0) || 'Ingrese Empaste']"
          markers
          :marker-labels="arrayEmpaste"
          :readonly="!editar"
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
const colorEstimado = computed(() => {
  let mcu = 0;
  let srm = 0;
  receta.getReceta.fermentables.forEach((f) => {
    mcu += (f.cantidad * f.color * 8.46) / receta.getReceta.volumenBatch;
  });

  srm = 1.5 * Math.pow(mcu, 0.7);
  return srm.toFixed(0);
});

const arrayDI = [
  {
    value: estilo.getEstilo.densidadInicial.min,
    label: estilo.getEstilo.densidadInicial.min,
  },
  {
    value: estilo.getEstilo.densidadInicial.max,
    label: estilo.getEstilo.densidadInicial.max,
  },
];

const arrayDF = [
  {
    value: estilo.getEstilo.densidadFinal.min,
    label: estilo.getEstilo.densidadFinal.min,
  },
  {
    value: estilo.getEstilo.densidadFinal.max,
    label: estilo.getEstilo.densidadFinal.max,
  },
];

const ArrayIBU = [
  {
    value: estilo.getEstilo.ibu.min,
    label: estilo.getEstilo.ibu.min,
  },
  {
    value: estilo.getEstilo.ibu.max,
    label: estilo.getEstilo.ibu.max,
  },
];

const arrayEmpaste = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 4,
    label: "4",
  },
];

const arrayCarb = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 4,
    label: "4",
  },
];

const arrayagua = [
  {
    value: config.getConfig.volumenElaboracion.min,
    label: config.getConfig.volumenElaboracion.min,
  },
  {
    value: config.getConfig.volumenElaboracion.max,
    label: config.getConfig.volumenElaboracion.max,
  },
];

const props = defineProps({
  editar: Boolean,
});
</script>
