<template>
  <q-page class="conainer">
    <q-page-sticky position="bottom-right" :offset="[18, 18]" expand>
      <q-btn fab icon="ion-add" color="positive" @click="agregarEstilo" />
    </q-page-sticky>

    <div class="row justify-center">
      <h4 class="text-center text-positive col text-info">Estilos</h4>
    </div>
    <!-- Diálogo Detalle -->
    <DialogoCRUD
      v-model="mostrar"
      titulo="Estilos de Cerveza"
      :cerrarDialogo="cerrarDialogo"
    >
      <template #formuario>
        <q-form
          @submit.prevent="guardarRegistro()"
          class="q-gutter-md container"
        >
          <div class="row">
            <q-toggle
              v-model="estilo.verificado"
              color="green"
              label="Estilo Verificado"
              icon="check"
              size="md"
              keep-color
              :disable="bloqueo"
              class="col"
            />
          </div>
          <div class="row justify-center">
            <q-input
              v-model="estilo.nombre"
              type="text"
              label="Nombre"
              class="col q-mr-md"
              :readonly="bloqueo"
            />
            <q-input
              v-model="estilo.categoria"
              type="text"
              label="Categoria"
              class="col"
              :readonly="bloqueo"
            />
          </div>
          <div class="row">
            <q-input
              v-model="estilo.tipo"
              type="text"
              label="Tipo"
              class="col q-mr-md"
              :readonly="bloqueo"
            />

            <q-input
              v-model="estilo.letraEstilo"
              type="text"
              label="Letra Estilo"
              class="col q-mr-md"
              :readonly="bloqueo"
            />
            <q-input
              v-model="estilo.numeroCategoria"
              type="text"
              label="Número Categoría"
              class="col"
              :readonly="bloqueo"
            />
          </div>
          <div class="row justify-center">
            <div class="col-12 col-sm q-mx-xl">
              <q-badge color="teal" class="text-center">
                D° Inicial: {{ estilo.densidadInicial.min }} -
                {{ estilo.densidadInicial.max }}
              </q-badge>
              <q-range
                v-model="estilo.densidadInicial"
                :min="1000"
                :max="1200"
                :step="1"
                color="teal"
                :left-label-value="estilo.densidadInicial.min"
                :right-label-value="estilo.densidadInicial.max"
                switch-label-side
                :disable="bloqueo"
              />
            </div>
            <div class="col-12 col-sm q-mx-xl">
              <q-badge color="teal" class="text-center">
                D° Final: {{ estilo.densidadFinal.min }} -
                {{ estilo.densidadFinal.max }}
              </q-badge>
              <q-range
                v-model="estilo.densidadFinal"
                :min="995"
                :max="1200"
                :step="1"
                color="teal"
                :left-label-value="estilo.densidadFinal.min"
                :right-label-value="estilo.densidadFinal.max"
                switch-label-side
                :disable="bloqueo"
              />
            </div>
            <div class="col-12 col-sm q-mx-xl">
              <q-badge color="green" class="text-center">
                IBUs: {{ estilo.ibu.min }} -
                {{ estilo.ibu.max }}
              </q-badge>
              <q-range
                v-model="estilo.ibu"
                :min="0"
                :max="100"
                :step="1"
                color="green"
                :left-label-value="estilo.ibu.min"
                :right-label-value="estilo.ibu.max"
                switch-label-side
                :disable="bloqueo"
              />
            </div>
            <div class="col-12 col-sm q-mx-xl">
              <q-badge color="warning" class="text-center">
                Color: {{ estilo.color.min }} -
                {{ estilo.color.max }}
              </q-badge>
              <q-range
                v-model="estilo.color"
                :min="0"
                :max="100"
                :step="1"
                color="warning"
                :left-label-value="estilo.color.min"
                :right-label-value="estilo.color.max"
                switch-label-side
                :disable="bloqueo"
              />
            </div>
            <div class="col-12 col-sm q-mx-xl">
              <q-badge color="purple" class="text-center">
                Abv: {{ estilo.abv.min }} -
                {{ estilo.abv.max }}
              </q-badge>
              <q-range
                v-model="estilo.abv"
                :min="0"
                :max="15"
                :step="1"
                color="purple"
                :left-label-value="estilo.abv.min"
                :right-label-value="estilo.abv.max"
                switch-label-side
                :disable="bloqueo"
              />
            </div>
            <div class="col-12 col-sm q-mx-xl">
              <q-badge color="pink" class="text-center">
                Carbonatación: {{ estilo.carb.min }} -
                {{ estilo.carb.max }}
              </q-badge>
              <q-range
                v-model="estilo.carb"
                :min="0"
                :max="5"
                :step="1"
                color="pink"
                :left-label-value="estilo.carb.min"
                :right-label-value="estilo.carb.max"
                switch-label-side
                :disable="bloqueo"
              />
            </div>
          </div>
          <div class="row">
            <q-input
              v-model="estilo.notas"
              type="textarea"
              label="Notas de Estilo"
              autogrow
              class="col"
              :readonly="bloqueo"
            />
          </div>
          <div class="row">
            <q-input
              v-model="estilo.perfil"
              type="textarea"
              label="Perfil"
              class="col"
              autogrow
              :readonly="bloqueo"
            />
          </div>
          <div class="row justify-center">
            <q-btn
              icon="ion-save"
              type="submit"
              color="positive"
              flat
              class="col"
              :disable="bloqueo"
              size="lg"
            />
            <q-btn
              icon="ion-create"
              color="warning"
              flat
              class="col"
              @click="editar()"
              v-if="verBotones"
              size="lg"
            />
            <q-btn
              icon="ion-trash"
              color="negative"
              flat
              class="col"
              v-if="verBotones"
              @click="dialogoEliminar()"
              size="lg"
            />
          </div>
        </q-form>
      </template>
    </DialogoCRUD>

    <!-- Dialogo confirmación -->
    <DialogSiNo
      colorIcono="negative"
      icono="ion-trash"
      :texto="dialogo.mensaje"
      v-model="dialogo.estado"
      :accionAceptar="eliminarRegistro"
    />
    <TablaGeneral
      :col="col"
      :rows="style.getEstilos"
      titulo="Tabla de Estilos de Cerveza"
      noData="Sin Estilos que mostrar"
      :seleccionar="seleccionarEstilo"
    />
  </q-page>
</template>

<script setup>
import { tablaAuxiliares } from "../composables/useTablesColumns";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import DialogSiNo from "../components/DialogSiNo.vue";
import { useEstilos } from "src/stores/useEstilos";
import TablaGeneral from "src/components/TablaGeneral.vue";
import { tablaEstilos } from "../composables/useTablesColumns";
import DialogoCRUD from "../components/DialogoCRUD.vue";

//Definición de variables y objetos
const style = useEstilos();

const col = tablaEstilos;
const mostrar = ref(false);
const $q = useQuasar();
const dialogo = ref({
  mensaje: "",
  estado: false,
});
const agregar = ref(false);
const estilo = ref({
  nombre: "",
  tipo: "",
  categoria: "",
  numeroCategoria: "",
  letraEstilo: "",
  densidadInicial: { min: 0, max: 0 },
  densidadFinal: { min: 0, max: 0 },
  ibu: { min: 0, max: 0 },
  color: { min: 0, max: 0 },
  abv: { min: 0, max: 0 },
  carb: { min: 0, max: 0 },
  verificado: false,
  notas: "",
  perfil: "",
  ingredientes: "",
  id: "",
});

const bloqueo = ref(true);
const verBotones = ref(true);

//Definición de funciones
function editar() {
  bloqueo.value = false;
}
function agregarEstilo() {
  reset();
  mostrar.value = true;
  bloqueo.value = false;
  verBotones.value = false;
}

function reset() {
  estilo.value = {
    nombre: "",
    tipo: "",
    categoria: "",
    numeroCategoria: "",
    letraEstilo: "",
    densidadInicial: { min: 0, max: 0 },
    densidadFinal: { min: 0, max: 0 },
    ibu: { min: 0, max: 0 },
    color: { min: 0, max: 0 },
    abv: { min: 0, max: 0 },
    carb: { min: 0, max: 0 },
    verificado: false,
    notas: "",
    perfil: "",
    ingredientes: "",
    id: "",
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

function seleccionarEstilo(estiloSelected) {
  estilo.value = estiloSelected;
  mostrar.value = true;
}
function cerrarDialogo() {
  mostrar.value = false;
  bloqueo.value = true;
  verBotones.value = true;
}
const validarBtn = computed(() => {
  return auxiliar.value.nombre !== "" && auxiliar.value.tipo !== ""
    ? false
    : true;
});

function guardarRegistro() {
  style.setEstilo(estilo.value);
  verBotones.value = true;
  style.saveEstiloInDB(estilo.value);
  mostrar.value = false;
  bloqueo.value = true;
  notificacionPositiva(
    "Guardado Exitoso",
    "Se ha guardado el nuevo estilo en la DB"
  );
}
function eliminarRegistro() {
  style.setEstilo(estilo.value);
  style.deleteEstiloInDB();
  mostrar.value = false;
  bloqueo.value = true;
  notificacionPositiva(
    "Eliminación Exitosa",
    "Se ha eliminado el estilo en la DB"
  );
  dialogo.value = false;
}
function dialogoEliminar() {
  dialogo.value.estado = true;
  dialogo.value.mensaje = `Desea eliminar el estilo ${estilo.value.nombre} de la base de datos?`;
}
</script>
