<template>
  <!-- Tab de cabecera con opciones -->

  <TabsInsumos />
  <q-page>
    <div class="row justify-center">
      <h4 class="text-center text-positive col">Lúpulos</h4>
    </div>

    <!-- Diálogo para agregar insumos a la base de datos -->
    <q-dialog v-model="agregar" persistent>
      <q-card class="container">
        <q-card-section class="row justify-center">
          <q-avatar icon="add" color="green" text-color="white" />
        </q-card-section>
        <q-card-section class="row justify-center q-mx-xl">
          <q-form @submit="guardarRegistro">
            <div class="row">
              <q-input
                v-model="lupulo.nombre"
                type="text"
                label="Nombre del Lúpulo"
                class="q-m-xl col"
              />
            </div>

            <div class="row">
              <label class="col q-mt-md" for="%AA">%AA</label>
              <input
                type="number"
                v-model.number="lupulo.porcentajeAA"
                step="any"
                placeholder="% AA"
                class="bg-dark text-white q-mt-md col"
                min="0"
                id="%AA"
              />
            </div>
            <div class="row">
              <label class="col q-mt-md" for="stock">Stock (g)</label>
              <input
                type="number"
                v-model.number="lupulo.stock"
                step="any"
                placeholder="Stock"
                class="bg-dark text-white q-mt-md col"
                min="0"
                id="stock"
              />
            </div>
            <div class="row">
              <q-input
                v-model="lupulo.notas"
                type="textarea"
                label="Notas"
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
      :rows="hop.getlupulos"
      titulo="Tabla de Lúpulos"
      :editar="editarLupulo"
      :eliminar="eliminarLupulo"
      noData="Sin Lúpulos que mostrar"
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
import TabsInsumos from "src/components/TabsInsumos.vue";
import DialogSiNo from "src/components/DialogSiNo.vue";
import TablaGeneral from "src/components/TablaGeneral.vue";
import { useLupulos } from "../stores/useLupulos";
import { tablaLupulos } from "../composables/useTablesColumns";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

//Definición de variables y objetos
const hop = useLupulos();
const col = tablaLupulos;
const mostrar = ref(false);
const $q = useQuasar();
const dialogo = ref({
  mensaje: "",
  estado: false,
});
const agregar = ref(false);
const lupulo = ref({
  nombre: "",
  porcentajeAA: 0,
  stock: 0,
  id: "",
  notas: "",
});

//Definición de funciones

function editarLupulo(registro) {
  lupulo.value = registro;
  agregar.value = true;
}
function eliminarLupulo(registro) {
  hop.setlupulo(registro);
  dialogo.value.mensaje = `Desea Eliminar el Lúpulo ${registro.nombre} de la base de datos?`;
  dialogo.value.estado = true;
}
function eliminarRegistro() {
  hop.deletelupuloInDB();
  dialogo.value.estado = false;
  notificacionPositiva(
    "Eliminación Exitosa",
    "El Lúpulo se ha borrado exitosamente de la DB"
  );
}
function guardarRegistro() {
  hop.savelupuloInDB(lupulo.value);
  agregar.value = false;
  notificacionPositiva(
    "Registro guardado ",
    "Se guardó el Lúpulo satisfactiamente en la DB"
  );
}
function reset() {
  lupulo.value = {
    nombre: "",
    porcentajeAA: 0,
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
  return lupulo.value.nombre !== "" && lupulo.value.porcentajeAA > 0
    ? false
    : true;
});
</script>
