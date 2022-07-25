<template>
  <q-card class="col-12 col-sm-8 q-mb-xl">
    <q-card-section class="bg-warning text-white">
      <p class="text-center text-h5">Fermentables</p>
      <div class="row justify-center"></div>
    </q-card-section>

    <q-expansion-item expand-separator icon="spa">
      <q-card-section>
        <div class="row justify-center">
          <strong class="text-purple text-center text-h6 q-mr-md">
            Pts Densidad: {{ puntosDensidad }}
          </strong>
          <strong class="text-pink text-center text-h6 q-mr-md">
            Color: {{ colorCerveza }} SRM
          </strong>
          <strong class="text-warning text-center text-h6 q-mr-md">
            %Fermentables: {{ porcentajeTotal }} %
          </strong>
          <strong class="text-white text-center text-h6">
            cantidad Total: {{ cantidadTotal }} Kg
          </strong>
        </div>
      </q-card-section>
      <q-card-section class="row justify-center items-end">
        <q-table
          title="Lista de Fermentables"
          :rows="ferm.getFermentables"
          :columns="col2"
          row-key="nombre"
          binary-state-sort
          :filter="filter"
          v-if="porcentajeTotal < 100"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar Fermentable"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="porcentajeExtraccion" :props="props">
                {{ props.row.porcentajeExtraccion }}
              </q-td>
              <q-td key="color" :props="props">
                <div class="text-pre-wrap">{{ props.row.color }}</div>
              </q-td>
              <q-td key="porcentajeReceta" :props="props">
                <q-input
                  type="text"
                  v-model.number="props.row.porcentajeReceta"
                  dense
                />
              </q-td>
              <q-td key="cantidad" :props="props">{{
                (props.row.cantidad = (
                  (puntosDensidad /
                    (config.getConfig.eficiencia.actual *
                      props.row.porcentajeExtraccion *
                      3.84)) *
                  props.row.porcentajeReceta
                ).toFixed(2))
              }}</q-td>
              <q-td key="accion" :props="props"
                ><q-btn
                  color="green"
                  icon="check"
                  @click="seleccionar(props.row)"
                  dense
                  v-if="props.row.cantidad > 0"
              /></q-td>
            </q-tr>
          </template>
        </q-table>

        <q-table
          title="Fermentables en Receta"
          :rows="receta.getReceta.fermentables"
          :columns="col2"
          row-key="nombre"
          binary-state-sort
        >
          <template v-slot:body-cell-accion="props">
            <q-btn
              color="negative"
              icon="ion-trash"
              @click="eliminar(props.row)"
              :disable="!editar"
              dense
            />
          </template>
        </q-table>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>

<script setup>
import { useFermentables } from "src/stores/useFermentables";
import { computed, ref } from "vue";
import TablaGeneral from "../TablaGeneral.vue";

import { useRecetas } from "src/stores/useRecetas";
import { tablaListaFermentables } from "../../composables/useTablesColumns";
import { tablaFermentablesEnReceta } from "../../composables/useTablesColumns";
import { useConfig } from "src/stores/useConfig";
import { useQuasar } from "quasar";
const $q = useQuasar();

const listaFermentables = ref([]);

const ferm = useFermentables();
const receta = useRecetas();
const config = useConfig();
const col1 = tablaListaFermentables;
const col2 = tablaFermentablesEnReceta;
const filter = ref("");

function eliminar(registro) {
  receta.getReceta.fermentables = receta.getReceta.fermentables.filter(
    (f) => f.id !== registro.id
  );
}
function seleccionar(registro) {
  if (porcentajeTotal.value + registro.porcentajeReceta <= 100) {
    registro.cantidad = parseFloat(registro.cantidad);
    receta.getReceta.fermentables.push(registro);
    S;
  } else {
    $q.notify({
      message: `Revisar porcentajes (max ) ${100 - porcentajeTotal.value}`,
      caption: "los porcentajes de fermentables superan el 100%",
      icon: "warning",
      color: "negative",
    });
  }
}
const puntosDensidad = computed(() => {
  return (
    receta.getReceta.volumenBatch *
    (receta.getReceta.densidadInicialObjetivo - 1000)
  );
});

const cantidadTotal = computed(() => {
  let total = 0;
  receta.getReceta.fermentables.forEach((f) => {
    total += parseFloat(f.cantidad);
  });

  return total.toFixed(2);
});

const porcentajeTotal = computed(() => {
  let porc = 0;
  receta.getReceta.fermentables.forEach((f) => {
    porc += f.porcentajeReceta;
  });

  return porc;
});

const colorCerveza = computed(() => {
  let mcu = 0;
  let srm = 0;
  receta.getReceta.fermentables.forEach((f) => {
    mcu += (f.cantidad * f.color * 8.46) / receta.getReceta.volumenBatch;
  });

  srm = 1.5 * Math.pow(mcu, 0.7);
  return srm.toFixed(0);
});

const props = defineProps({
  editar: Boolean,
});
</script>
