<template>
  <q-card class="col-12 col-sm-8 q-mb-xl">
    <q-card-section class="bg-info text-white">
      <div class="row justify-center">
        <p class="text-center text-h5">Auxiliares</p>
      </div>
    </q-card-section>
    <q-expansion-item expand-separator icon="grass">
      <q-card-section class="row justify-center items-end">
        <q-table
          title="Lista de Auxiliares"
          :rows="auxiliares.getAuxiliares"
          :columns="col"
          row-key="nombre"
          binary-state-sort
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar Auxiliar"
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
              <q-td key="tipo" :props="props">
                {{ props.row.tipo }}
              </q-td>
              <q-td key="uso" :props="props">
                {{ props.row.uso }}
              </q-td>
              <q-td key="notas" :props="props">
                <q-btn
                  color="primary"
                  icon="ion-eye"
                  @click="verNotas(props.row)"
                  v-if="props.row.notas.length > 0"
                />
              </q-td>
              <q-td key="proporcion" :props="props">
                <q-input
                  type="text"
                  v-model.number="props.row.proporcion"
                  dense
                />
              </q-td>
              <q-td key="cantidad" :props="props">{{
                (props.row.cantidad = (
                  props.row.proporcion * receta.getReceta.volumenBatch
                ).toFixed(1))
              }}</q-td>
              <q-td key="momentoAgregado" :props="props">
                <q-select
                  v-model="props.row.momentoAgregado"
                  :options="[
                    'precalentado',
                    'maceración',
                    'cocción',
                    'refrigeración',
                    'fermentación',
                    'maduración',
                    'clarificación',
                    'gasificación',
                    'envasado',
                    'otro',
                  ]"
                  filled
                />
              </q-td>
              <q-td key="accion" :props="props"
                ><q-btn
                  color="green"
                  icon="check"
                  @click="seleccionar(props.row)"
                  dense
                  v-if="
                    props.row.cantidad > 0 || props.row.momentoAgregado === ''
                  "
                  :disable="!editar"
              /></q-td>
            </q-tr>
          </template>
        </q-table>

        <!-- Tabla con los Auxilaires en receta -->
        <q-table
          title="Auxiliares en Receta"
          :rows="receta.getReceta.auxiliares"
          :columns="col"
          row-key="name"
          no-data-label="Sin Auxiliares en la receta"
          class="q-mt-md"
        >
          <template #body-cell-accion="props">
            <q-btn
              color="negative"
              icon="ion-trash"
              @click="eliminar(props.row)"
              dense
              :disable="!editar"
            />
          </template>
          <template #body-cell-notas="props">
            <q-btn
              color="primary"
              icon="ion-eye"
              @click="verNotas(props.row)"
              dense
            />
          </template>
        </q-table>
      </q-card-section>
    </q-expansion-item>
  </q-card>
  <DialogInfo
    v-model="info"
    icono="grass"
    colorIcono="green"
    titulo="Notas sobre auxiliares"
    :texto="notasAuxiliares"
  />
</template>
<script setup>
import { useQuasar } from "quasar";
import { tablaListaAuxiliares } from "src/composables/useTablesColumns";
import { useAuxiliares } from "src/stores/useAuxiliares";
import { useRecetas } from "src/stores/useRecetas";
import DialogInfo from "../DialogInfo.vue";
import { ref } from "vue";
const $q = useQuasar();
const filter = ref("");
const auxiliares = useAuxiliares();
const receta = useRecetas();
const col = tablaListaAuxiliares;
const info = ref(false);
const notasAuxiliares = ref("");
function seleccionar(registro) {
  var copia = Object.assign({}, registro);
  receta.getReceta.auxiliares.push(copia);
}
function eliminar(registro) {
  receta.getReceta.auxiliares = receta.getReceta.auxiliares.filter(
    (a) => a.id !== registro.id
  );
}

function verNotas(registro) {
  info.value = true;
  notasAuxiliares.value = registro.notas;
}
const props = defineProps({
  editar: Boolean,
});
</script>
