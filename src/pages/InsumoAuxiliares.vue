<template>
  <!-- Tab de cabecera con opciones -->

  <TabsInsumos />
  <q-page>
    <div class="row justify-center">
      <h4 class="text-center text-positive col text-purple">Auxiliares</h4>
    </div>

    Diálogo para agregar insumos a la base de datos
    <q-dialog v-model="agregar" persistent>
      <q-card class="container">
        <q-card-section class="row justify-center">
          <q-avatar icon="add" color="green" text-color="white" />
        </q-card-section>
        <q-card-section class="row justify-center q-mx-md">
          <q-form @submit="guardarRegistro">
            <div class="row">
              <q-input
                v-model="auxiliar.nombre"
                type="text"
                label="Nombre de Auxiliar"
                class="col q-mr-md"
              />
              <q-input
                v-model="auxiliar.tipo"
                type="text"
                label="Tipo de Auxiliar"
                class="col"
              />
            </div>

            <div class="row justify-end">
              <q-input
                v-model="auxiliar.uso"
                type="text"
                label="Uso"
                class="col q-mr-md"
              />

              <q-input
                v-model.number="auxiliar.stock"
                type="number"
                label="stock"
                class="col justify-center"
              />
            </div>
            <div class="row">
              <q-input
                v-model="auxiliar.notas"
                type="textarea"
                label="Notas"
                class="q-mr-md col justify-center"
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
      :rows="aux.getAuxiliares"
      titulo="Tabla de Auxiliares"
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
import { tablaAuxiliares } from "../composables/useTablesColumns";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useAuxiliares } from "src/stores/useAuxiliares";
import TabsInsumos from "../components/TabsInsumos.vue";
import TablaGeneral from "../components/TablaGeneral.vue";
import DialogSiNo from "../components/DialogSiNo.vue";

//Definición de variables y objetos
const aux = useAuxiliares();
const col = tablaAuxiliares;
const mostrar = ref(false);
const $q = useQuasar();
const dialogo = ref({
  mensaje: "",
  estado: false,
});
const agregar = ref(false);
const auxiliar = ref({
  id: "",
  nombre: "",
  tipo: "",
  uso: "",
  notas: "",
  stock: 0,
});

//Definición de funciones

function editarLevadura(registro) {
  auxiliar.value = registro;
  agregar.value = true;
}
function eliminarLevadura(registro) {
  aux.setauxiliar(registro);
  dialogo.value.mensaje = `Desea Eliminar el Auxiliar ${registro.nombre} de la base de datos?`;
  dialogo.value.estado = true;
}
function eliminarRegistro() {
  aux.deleteauxiliarInDB();
  dialogo.value.estado = false;
  notificacionPositiva(
    "Eliminación Exitosa",
    "Levadura se ha borrada exitosamente de la DB"
  );
}
function guardarRegistro() {
  aux.saveauxiliarInDB(auxiliar.value);
  agregar.value = false;
  notificacionPositiva(
    "Registro guardado ",
    "Se guardó la Levadura satisfactiamente en la DB"
  );
}
function reset() {
  auxiliar.value = {
    id: "",
    nombre: "",
    tipo: "",
    uso: "",
    notas: "",
    stock: 0,
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
  return auxiliar.value.nombre !== "" && auxiliar.value.tipo !== ""
    ? false
    : true;
});
</script>
