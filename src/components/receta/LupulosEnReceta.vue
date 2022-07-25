<template>
  <q-card class="col-12 col-sm-8 q-mb-xl">
    <q-card-section class="bg-positive text-white">
      <div class="row justify-center">
        <p class="text-center text-h5">Lúpulos</p>
      </div>
    </q-card-section>
    <q-expansion-item expand-separator icon="workspaces">
      <q-card-section class="row justify-center">
        <strong class="text-center text-green text-h6">
          IBUs: {{ ibuTotal }} IBUS de {{ receta.getReceta.ibuObjetivo }} IBUs
          Totales</strong
        >
      </q-card-section>
      <q-card-section class="row justify-center items-end">
        <q-table
          title="Lista de Lúpulos"
          :rows="lupulo.getlupulos"
          :columns="col"
          row-key="nombre"
          binary-state-sort
          :filter="filter"
          v-if="receta.getReceta.ibuObjetivo > ibuTotal"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar Lupulo"
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
              <q-td key="notas" :props="props">
                <q-btn
                  color="primary"
                  icon="ion-eye"
                  @click="verNotas(props.row)"
                  v-if="props.row.notas !== ''"
                />
              </q-td>
              <q-td key="porcentajeAA" :props="props">
                {{ props.row.porcentajeAA }}
              </q-td>
              <q-td key="formato" :props="props">
                <q-select
                  v-model="props.row.formato"
                  :options="['flor', 'pellet']"
                />
              </q-td>
              <q-td key="minsHervor" :props="props">
                <q-input
                  type="text"
                  v-model.number="props.row.minsHervor"
                  dense
                />
              </q-td>
              <q-td key="aporteIbu" :props="props">
                <q-input
                  type="text"
                  v-model.number="props.row.aporteIbu"
                  dense
                />
              </q-td>
              <q-td key="cantidad" :props="props">{{
                (props.row.cantidad = (
                  (props.row.aporteIbu *
                    receta.getReceta.volumenBatch *
                    fc *
                    10) /
                  (props.row.porcentajeAA *
                    porcUtilizacion(props.row.formato, props.row.minsHervor))
                ).toFixed(1))
              }}</q-td>
              <q-td key="accion" :props="props">
                <q-btn
                  color="green"
                  icon="check"
                  @click="seleccionar(props.row)"
                  dense
                  v-if="props.row.cantidad > 0 && props.row.minsHervor > 0"
              /></q-td>
            </q-tr>
          </template>
        </q-table>

        <!-- Tabla con los lúpulos en receta -->
        <q-table
          title="Lúlulos en Receta"
          :rows="receta.getReceta.lupulos"
          :columns="col"
          row-key="name"
          no-data-label="Sin Lúpulos en la receta"
        >
          <template #body-cell-accion="props">
            <q-btn
              color="negative"
              icon="ion-trash"
              @click="eliminar(props.row)"
              :disable="!editar"
              dense
            />
          </template>
          <template #body-cell-notas="props">
            <q-btn
              color="primary"
              icon="ion-eye"
              @click="verNotas(props.row)"
            />
          </template>
        </q-table>
      </q-card-section>
    </q-expansion-item>
  </q-card>
  <DialogInfo
    v-model="info"
    icono="workspaces"
    colorIcono="green"
    titulo="Notas sobre Lúpulos"
    :texto="notasLupulos"
  />
</template>
<script setup>
import { useQuasar } from "quasar";
import { tablaListaLupulos } from "src/composables/useTablesColumns";
import { useLupulos } from "src/stores/useLupulos";
import { useRecetas } from "src/stores/useRecetas";
import { computed, ref} from "vue";
import DialogInfo from "../DialogInfo.vue";
const $q = useQuasar();
const filter = ref("");
const lupulo = useLupulos();
const receta = useRecetas();
const col = tablaListaLupulos;
const info = ref(false);
const notasLupulos = ref("");
function seleccionar(registro) {
  if (ibuTotal.value + registro.aporteIbu <= receta.getReceta.ibuObjetivo) {
    var copia = Object.assign({}, registro);
    receta.getReceta.lupulos.push(copia);
  } else {
    $q.notify({
      message: `Revisar El aporte de IBU (max) ${
        receta.getReceta.ibuObjetivo - ibuTotal.value
      }`,
      caption: "El IBU final superará el objetivo de la receta",
      icon: "warning",
      color: "negative",
    });
  }
}
function eliminar(registro) {
  receta.getReceta.lupulos = receta.getReceta.lupulos.filter(
    (l) => l.id !== registro.id
  );
}
const ibuTotal = computed(() => {
  let ibu = 0;
  receta.getReceta.lupulos.forEach((l) => {
    ibu += l.aporteIbu;
  });

  return ibu;
});

const fc = computed(() => {
  return receta.getReceta.densidadInicialObjetivo > 1050
    ? 1 + (receta.getReceta.densidadInicialObjetivo / 1000 - 1.05) / 0.2
    : 1;
});

function porcUtilizacion(formato, tiempo) {
  let putil = 0;

  // Fórmula para flores
  if (formato === "flor" && tiempo >= 0 && tiempo < 10) {
    putil = 5;
  }
  if (formato === "flor" && tiempo >= 10 && tiempo < 20) {
    putil = 12;
  }
  if (formato === "flor" && tiempo >= 20 && tiempo < 30) {
    putil = 15;
  }
  if (formato === "flor" && tiempo >= 30 && tiempo < 45) {
    putil = 19;
  }
  if (formato === "flor" && tiempo >= 45 && tiempo < 60) {
    putil = 22;
  }
  if (formato === "flor" && tiempo >= 60 && tiempo < 75) {
    putil = 24;
  }
  if (formato === "flor" && tiempo >= 75) {
    putil = 27;
  }
  // Formulas para pellet
  if (formato === "pellet" && tiempo >= 0 && tiempo < 10) {
    putil = 6;
  }
  if (formato === "pellet" && tiempo >= 10 && tiempo < 20) {
    putil = 15;
  }
  if (formato === "pellet" && tiempo >= 20 && tiempo < 30) {
    putil = 19;
  }
  if (formato === "pellet" && tiempo >= 30 && tiempo < 45) {
    putil = 24;
  }
  if (formato === "pellet" && tiempo >= 45 && tiempo < 60) {
    putil = 27;
  }
  if (formato === "pellet" && tiempo >= 60 && tiempo < 75) {
    putil = 30;
  }
  if (formato === "pellet" && tiempo >= 75) {
    putil = 34;
  }

  return putil;
}

function verNotas(registro) {
  info.value = true;
  notasLupulos.value = registro.notas;
}
const props = defineProps({
  editar: Boolean,
});
</script>
<!-- IBU= (aporteIBU*volumenBatch*FC*10)/(%AA*30)

FC= (aplicar si densidad inicial es mayor que 1050 )=1+((densidadInicial/1000)-1.05)/2   en caso  de densidades menores a 1050 fc=1 -->
