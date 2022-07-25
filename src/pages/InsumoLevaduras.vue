<template>
  <!-- Tab de cabecera con opciones -->

  <TabsInsumos />
  <q-page>
    <div class="row justify-center">
      <h4 class="text-center text-positive col text-info">Levaduras</h4>
    </div>

    Diálogo para agregar insumos a la base de datos
    <q-dialog v-model="agregar" persistent>
      <q-card class="container">
        <q-card-section class="row justify-center">
          <q-avatar icon="add" color="green" text-color="white" />
        </q-card-section>
        <q-card-section class="row justify-center q-mx-xl">
          <q-form @submit="guardarRegistro">
            <div class="row">
              <q-input
                v-model="levadura.nombre"
                type="text"
                label="Nombre de Levadura"
                class="col q-mr-md"
              />
              <q-input
                v-model="levadura.tipo"
                type="text"
                label="Tipo Levadura"
                class="q-mr-md col"
              />
              <q-input
                v-model="levadura.laboratorio"
                type="text"
                label="Laboratorio"
                class="col"
              />
            </div>

            <div class="row">
              <q-input
                v-model="levadura.floculacion"
                type="text"
                label="Floculacion"
                class="q-mr-md col"
              />

              <q-input
                v-model.number="levadura.atenuacion"
                type="number"
                label="Atenución"
                class="q-mr-md col"
              />
              <q-input
                v-model.number="levadura.tempMin"
                type="number"
                label="T° MIN"
                class="q-mr-md col"
              />
              <q-input
                v-model.number="levadura.tempMax"
                type="number"
                label="T° MAX"
                class="col"
              />
            </div>
            <div class="row">
              <q-input
                v-model="levadura.notas"
                type="textarea"
                label="Notas"
                class="col q-mr-md"
              />
              <q-input
                v-model="levadura.mejorPara"
                type="textarea"
                label="Mejor Para"
                class="col"
              />
            </div>

            <div class="row justify-center">
              <q-btn
                type="submit"
                icon="ion-save"
                size="xl"
                flat
                color="green"
                round
                :disable="validarBtn"
              />
              <q-btn
                flat
                color="negative"
                icon="cancel"
                @click="reset()"
                size="xl"
                round
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="center"> </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Tabla para mostrar insumos -->

    <TablaGeneral
      :col="col"
      :rows="yeast.getlevaduras"
      titulo="Tabla de Levaduras"
      :editar="editarLevadura"
      :eliminar="eliminarLevadura"
      noData="Sin Levaduras que mostrar"
    />

    <!-- Dialogo confirmación -->
    <DialogSiNo
      colorIcono="negative"
      icono="ion-trash"
      :texto="dialogo.mensaje"
      v-model="dialogo.estado"
      :accionAceptar="eliminarRegistro"
    />
    <!-- Boton agregar FAB -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="agregar = true" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { tablaLevaduras } from "../composables/useTablesColumns";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useLevaduras } from "src/stores/useLevaduras";
import TabsInsumos from "../components/TabsInsumos.vue";
import TablaGeneral from "../components/TablaGeneral.vue";
import DialogSiNo from "../components/DialogSiNo.vue";

//Definición de variables y objetos
const yeast = useLevaduras();
const col = tablaLevaduras;
const mostrar = ref(false);
const $q = useQuasar();
const dialogo = ref({
  mensaje: "",
  estado: false,
});
const agregar = ref(false);
const levadura = ref({
  id: "",
  nombre: "",
  tipo: "",
  laboratorio: "",
  notas: "",
  mejorPara: "",
  floculacion: "",
  atenuacion: 0,
  tempMax: 0,
  tempMin: 0,
});

//Definición de funciones

function editarLevadura(registro) {
  levadura.value = registro;
  agregar.value = true;
}
function eliminarLevadura(registro) {
  yeast.setlevadura(registro);
  dialogo.value.mensaje = `Desea Eliminar la Levadura ${registro.nombre} de la base de datos?`;
  dialogo.value.estado = true;
}
function eliminarRegistro() {
  yeast.deletelevaduraInDB();
  dialogo.value.estado = false;
  notificacionPositiva(
    "Eliminación Exitosa",
    "Levadura se ha borrada exitosamente de la DB"
  );
}
function guardarRegistro() {
  yeast.savelevaduraInDB(levadura.value);
  agregar.value = false;
  notificacionPositiva(
    "Registro guardado ",
    "Se guardó la Levadura satisfactiamente en la DB"
  );
}
function reset() {
  levadura.value = {
    id: "",
    nombre: "",
    tipo: "",
    laboratorio: "",
    notas: "",
    mejorPara: "",
    floculacion: "",
    atenuacion: 0,
    tempMax: 0,
    tempMin: 0,
  };

  agregar.value = false;
}

function notificacionPositiva(titulo, mensaje) {
  $q.notify({
    message: titulo,
    caption: mensaje,
    color: "positive",
    icon: "check",
    textColor: "white",
    position: "top",
    actions: [
      {
        label: "Cerrar",
        color: "white",
        handler: () => {
          /* ... */
        },
      },
    ],
  });
}
const validarBtn = computed(() => {
  return levadura.value.nombre !== "" && levadura.value.tipo !== ""
    ? false
    : true;
});
</script>
