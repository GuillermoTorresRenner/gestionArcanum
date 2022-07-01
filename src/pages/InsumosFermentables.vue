<template>
  <!-- Tab de cabecera con opciones -->

  <TabsInsumos />
  <q-page class="container">
    <div class="row justify-center">
      <h4 class="text-center text-warning col">Fermentables</h4>
    </div>

    <!-- Diálogo para agregar insumos a la base de datos -->
    <q-dialog v-model="agregar" persistent>
      <q-card class="container">
        <q-card-section class="row justify-center">
          <q-avatar icon="add" color="green" text-color="white" />
        </q-card-section>
        <q-card-section class="row justify-center q-mx-xl">
          <q-form @submit="guardar">
            <q-input
              v-model="fermentables.nombre"
              type="text"
              label="Nombre del fermentable"
              class="q-m-xl"
            />
            <q-input
              v-model.number="fermentables.porcentajeExtraccion"
              type="number"
              label="% de extracción"
              suffix="%"
            />
            <div class="row">
              <label class="col q-mt-md" for="color">Color (Lovibond)</label>
              <input
                type="number"
                v-model.number="fermentables.color"
                step="any"
                placeholder="Color"
                class="bg-dark text-white q-mt-md col"
                min="0"
                id="color"
              />
            </div>
            <div class="row">
              <label class="col q-mt-md" for="stock">Stock (Kg)</label>
              <input
                type="number"
                v-model.number="fermentables.stock"
                step="any"
                placeholder="Stock"
                class="bg-dark text-white q-mt-md col"
                min="0"
                id="stock"
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
      :rows="insumo.getFermentables"
      titulo="Tabla de Fermentables"
      :editar="editarFermentable"
      :eliminar="eliminarFermentable"
      noData="Sin Fermentables que mostrar"
    />

    <!-- Dialogo confirmación -->
    <DialogSiNo
      colorIcono="negative"
      icono="ion-trash"
      :texto="mensaje"
      :show="mostrar"
      v-model="mostrar"
      :accionAceptar="eliminarRegistro"
    />
    <!-- Botón agregar FAB -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="agregar = true" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import TabsInsumos from "src/components/TabsInsumos.vue";
import { useFermentables } from "src/stores/useFermentables";
import { useQuasar } from "quasar";
import { tablaFermentables } from "../composables/useTablesColumns";
import TablaGeneral from "src/components/TablaGeneral.vue";
import DialogSiNo from "src/components/DialogSiNo.vue";

//Definición de variables y objetos
const fermentables = ref({
  nombre: "",
  porcentajeExtraccion: 0,
  color: 0,
  stock: 0,
  id: "",
});
const $q = useQuasar();
const insumo = useFermentables();
const col = tablaFermentables;
const agregar = ref(false);
const mensaje = ref("");
const mostrar = ref(false);

//Definición de funciones
function guardar() {
  insumo.saveFermentableInDB(fermentables.value);

  notificacionPositiva("Operación Exitosa", "Guardado De Fermenetable en DB");
  reset();
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
  return fermentables.value.nombre !== "" &&
    fermentables.value.porcentajeExtraccion > 0
    ? false
    : true;
});

const editarFermentable = (registro) => {
  fermentables.value = registro;
  agregar.value = true;
};
const eliminarFermentable = (registro) => {
  insumo.setFermentable(registro);
  mensaje.value = `Desea Eliminar el Fermentable ${registro.nombre} de la base de datos?`;
  mostrar.value = true;
};

function eliminarRegistro() {
  insumo.deleteFermentableInDB();
  mostrar.value = false;
  notificacionPositiva(
    "Eliminación Exitosa",
    "El Fermentable se ha borrado exitosamente de la DB"
  );
}
function reset() {
  fermentables.value = {
    nombre: "",
    porcentajeExtraccion: 0,
    stock: 0,
  };
  agregar.value = false;
}
</script>
