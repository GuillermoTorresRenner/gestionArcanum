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
    <!-- Dialogo confirmación -->
    <!-- <DialogSiNo
      colorIcono="negative"
      icono="ion-trash"
      :texto="dialogo.mensaje"
      v-model="dialogo.estado"
      :accionAceptar="eliminarRegistro"
    /> -->
    <!-- Tabla de recetas -->
    <TablaGeneral
      :col="col"
      :rows="receta.getRecetas"
      titulo="Tabla de Estilos de Cerveza"
      noData="Sin Estilos que mostrar"
      :seleccionar="seleccionarReceta"
    />

    <!-- Dialogo CRUD -->
    <DialogoCRUD
      v-model="mostrar"
      titulo="Recetas Personales"
      :cerrarDialogo="cerrarDialogo"
    >
      <template #formuario>
        <pre>{{ receta.getReceta }}</pre>
        <div class="container">
          <!-- Estilo base de la receta -->
          <div class="row justify-center q-mb-xl">
            <EstiloBaseEnRenceta />
          </div>

          <!-- ---------- Formulario--------------- -->
          <q-form
            @submit="guardarRegistro()"
            v-if="estilo.getEstilo.nombre !== ''"
          >
            <!-- Parámetros Fundamentales de la receta -->
            <ParametroEnReceta />
            <!-- Insumos Fermentables -->
            <FermentablesEnReceta />
            <!-- Insumos Lúpulos -->
            <LupulosEnReceta />
            <!-- Insumos Auxiliares -->
            <AuxiliaresEnReceta1 />
            <!-- Insumos levaduras -->
            <LevduraEnReceta />
            <!-- Insumos Agua -->
            <AguaEnReceta />

            <div class="row justify-center">
              <q-btn
                icon="ion-save"
                type="submit"
                color="positive"
                flat
                class="col"
                size="lg"
              />
              <q-btn
                icon="ion-create"
                color="warning"
                flat
                class="col"
                @click="editar()"
                size="lg"
              />
              <q-btn
                icon="ion-trash"
                color="negative"
                flat
                class="col"
                @click="dialogoEliminar()"
                size="lg"
              />
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

const col = tablaRecetas;
const receta = useRecetas();
const estilo = useEstilos();
const config = useConfig();
const dialogo = ref({
  mensaje: "",
  estado: "",
});
const mostrar = ref(false);

//Metodos

function eliminarRegistro() {}
function seleccionarReceta(registro) {}
function agregarReceta() {
  mostrar.value = true;
}
function cerrarDialogo() {
  mostrar.value = false;

  estilo.resetEstilo();
  receta.resetReceta();
}

function guardarRegistro() {}
</script>
