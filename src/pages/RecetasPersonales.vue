<template>
  <q-page>
    <!-- FAB -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" expand>
      <q-btn fab icon="ion-add" color="positive" @click="agregarReceta" />
    </q-page-sticky>
    <!-- Título -->
    <div class="row justify-center">
      <h4 class="text-center text-positive col text-teal">
        Recetas Personales
      </h4>
    </div>

    <!-- Tabla de recetas -->
    <TablaGeneral
      :col="col"
      :rows="receta.getRecetas"
      titulo="Tabla de Estilos de Cerveza"
      noData="Sin Estilos que mostrar"
      :seleccionar="seleccionarReceta"
      :pdf="getPDF"
      :clonar="clonarReceta"
    />

    <!-- Dialogo CRUD -->
    <DialogoCRUD
      v-model="mostrar"
      titulo="Recetas Personales"
      :cerrarDialogo="cerrarDialogo"
    >
      <template #formuario>
        <div class="container">
          <!-- Estilo base de la receta -->
          <div class="row justify-center q-mb-xl">
            <EstiloBaseEnRenceta :editar="edit" />
          </div>

          <!-- ---------- Formulario--------------- -->
          <q-form
            @submit="guardarRegistro()"
            v-if="estilo.getEstilo.nombre !== ''"
          >
            <!-- Parámetros Fundamentales de la receta -->
            <ParametroEnReceta :editar="edit" />
            <!-- Insumos Fermentables -->
            <FermentablesEnReceta :editar="edit" />
            <!-- Insumos Lúpulos -->
            <LupulosEnReceta :editar="edit" />
            <!-- Insumos Auxiliares -->
            <AuxiliaresEnReceta1 :editar="edit" />
            <!-- Insumos levaduras -->
            <LevduraEnReceta :editar="edit" />
            <!-- Insumos Agua -->
            <AguaEnReceta />
            <!-- Notas Elaboración -->
            <div class="row justify-center">
              <q-input
                v-model="receta.getReceta.notas"
                type="textarea"
                label="Notas de Elaboración"
                class="col q-mb-xl"
                :readonly="!edit"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                icon="ion-save"
                type="submit"
                color="positive"
                flat
                class="col"
                size="lg"
                :disable="bloqueoFermentables || bloqueoLupulos || !edit"
              />
              <q-btn
                icon="ion-create"
                color="warning"
                flat
                class="col"
                @click="editar()"
                size="lg"
                :disable="edit"
              />
              <q-btn
                icon="ion-trash"
                color="negative"
                flat
                class="col"
                @click="eliminarRegistro()"
                size="lg"
                :disable="edit"
              />
            </div>
            <div class="row">
              <strong class="col text-warning q-m-xl" v-if="bloqueoFermentables"
                >Falta agregar Fermentables</strong
              >
            </div>
            <div class="row">
              <strong class="col text-green q-m-xl" v-if="bloqueoLupulos"
                >Falta agregar Lúpulos</strong
              >
            </div>
          </q-form>
        </div>
      </template>
    </DialogoCRUD>
  </q-page>
</template>
<script setup>
import { computed, ref } from "vue";
import { tablaRecetas } from "../composables/useTablesColumns";
import { useRecetas } from "../stores/useRecetas";
import TablaGeneral from "src/components/TablaGeneral.vue";
import DialogSiNoVue from "src/components/DialogSiNo.vue";
import DialogoCRUD from "src/components/DialogoCRUD.vue";
import { useEstilos } from "src/stores/useEstilos";
import EstiloBaseEnRenceta from "src/components/receta/EstiloBaseEnRenceta.vue";
import ParametroEnReceta from "src/components/receta/ParametroEnReceta.vue";
import { useConfig } from "src/stores/useConfig";
import FermentablesEnReceta from "../components/receta/FermentablesEnReceta.vue";
import LupulosEnReceta from "../components/receta/LupulosEnReceta.vue";
import AuxiliaresEnReceta from "../components/receta/AuxiliaresEnReceta.vue";
import LevduraEnReceta from "../components/receta/LevduraEnReceta.vue";
import AguaEnReceta from "../components/receta/AguaEnReceta.vue";
import AuxiliaresEnReceta1 from "../components/receta/AuxiliaresEnReceta.vue";
import { useQuasar } from "quasar";
import { getFechaActual } from "../composables/useFechas";
import { getRecetaPDF } from "../composables/usePDF";

const $q = useQuasar();
const col = tablaRecetas;
const receta = useRecetas();
const estilo = useEstilos();
const config = useConfig();
const edit = ref(false);
const dialogo = ref({
  mensaje: "",
  estado: "",
});
const mostrar = ref(false);

//Metodos

function eliminarRegistro() {
  $q.notify({
    message: `¿Desea Eliminar la receta ${receta.getReceta.nombre}?`,
    color: "purple",
    position: "top",
    icon: "warning",
    actions: [
      {
        label: "Eliminar",
        icon: "ion-trash",
        color: "red",
        handler: () => {
          receta.getReceta.fechaCreacion = getFechaActual();
          receta.deleteRecetaInDB();
          $q.notify({
            message: "Receta Eliminada",
            color: "green",
            position: "bottom",
            icon: "check",
          });
          cerrarDialogo();
        },
      },
      {
        label: "Cancelar",
        icon: "cancel",
        color: "warning",
        handler: () => {},
      },
    ],
  });
}
function seleccionarReceta(registro) {
  receta.setReceta(registro);
  mostrar.value = true;
  edit.value = false;
}
function agregarReceta() {
  mostrar.value = true;
  edit.value = true;
}
function cerrarDialogo() {
  mostrar.value = false;
  edit.value = true;

  estilo.resetEstilo();
  receta.resetReceta();
}
function editar() {
  edit.value = true;
}

const bloqueoFermentables = computed(() => {
  let maltas = 0;
  if (receta.getReceta.fermentables.length > 0) {
    receta.getReceta.fermentables.forEach((f) => {
      maltas += f.porcentajeReceta;
    });
  }

  return maltas < 100 ? true : false;
});

const bloqueoLupulos = computed(() => {
  let lupulos = 0;
  receta.getReceta.lupulos.forEach((l) => {
    lupulos += l.aporteIbu;
  });
  return lupulos !== receta.getReceta.ibuObjetivo ||
    receta.getReceta.ibuObjetivo == 0
    ? true
    : false;
});

function guardarRegistro() {
  $q.notify({
    message: `¿Desea guardar la receta ${receta.getReceta.nombre}?`,
    color: "purple",
    position: "top",
    icon: "warning",
    actions: [
      {
        label: "Guardar",
        icon: "ion-save",
        color: "green",
        handler: () => {
          receta.getReceta.fechaCreacion = getFechaActual();
          camposCalculados();
          receta.saveRecetaInDB();
          $q.notify({
            message: "Receta Guardada",
            color: "green",
            position: "bottom",
            icon: "check",
          });
          cerrarDialogo();
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
function getPDF(registro) {
  receta.setReceta(registro);
  getRecetaPDF();
}
function camposCalculados() {
  // Color de la cerveza
  let mcu = 0;
  let srm = 0;
  receta.getReceta.fermentables.forEach((f) => {
    mcu += (f.cantidad * f.color * 8.46) / receta.getReceta.volumenBatch;
  });

  srm = 1.5 * Math.pow(mcu, 0.7);
  receta.getReceta.srmEstimado = srm.toFixed(0);

  // Atenuación de la cerveza

  receta.getReceta.atenuacionEstimada = (
    ((receta.getReceta.densidadInicialObjetivo -
      receta.getReceta.densidadFinalObjetivo) /
      (receta.getReceta.densidadInicialObjetivo - 1000)) *
    100
  ).toFixed(1);

  // Agua total para receta|

  var totalGranos = 0;
  var aguaGranos = 0;
  receta.getReceta.fermentables.forEach((f) => {
    totalGranos += parseFloat(f.cantidad);
  });
  aguaGranos = parseFloat(totalGranos * config.getConfig.agua.absorcionGranos);

  receta.getReceta.agua = parseInt(
    receta.getReceta.volumenBatch +
      config.getConfig.agua.perdidaElaboracion +
      config.getConfig.agua.perdidaEvaporacion +
      aguaGranos
  );
}
function clonarReceta(registro) {
  receta.setReceta(registro);
  $q.notify({
    message: `¿Desea Clonar la receta ${receta.getReceta.nombre}?`,
    color: "purple",
    position: "top",
    icon: "warning",
    actions: [
      {
        label: "Guardar",
        icon: "ion-save",
        color: "green",
        handler: () => {
          receta.getReceta.fechaCreacion = getFechaActual();
          receta.getReceta.nombre = registro.nombre + "copy";
          receta.receta.id = "";
          receta.saveRecetaInDB();
          $q.notify({
            message: "Receta Guardada",
            color: "green",
            position: "bottom",
            icon: "check",
          });
          cerrarDialogo();
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
