<template>
  <q-card class="col-12 col-sm-8 q-mb-xl">
    <q-card-section class="bg-white text-dark">
      <div class="row justify-center">
        <p class="text-center text-h5">Levadura</p>
      </div>
    </q-card-section>
    <q-expansion-item expand-separator icon="biotech">
      <q-card-section class="row justify-center items-end">
        <q-table
          title="Lista de Auxiliares"
          :rows="levadura.getlevaduras"
          :columns="col"
          row-key="nombre"
          binary-state-sort
          :filter="filter"
          v-if="receta.getReceta.levadura.length < 1"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar Levadura"
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
              <q-td key="laboratorio" :props="props">
                {{ props.row.laboratorio }}
              </q-td>
              <q-td key="atenuacion" :props="props">
                {{ props.row.atenuacion }}
              </q-td>
              <q-td key="floculacion" :props="props">
                {{ props.row.floculacion }}
              </q-td>
              <q-td key="notas" :props="props">
                <q-btn
                  color="primary"
                  icon="ion-eye"
                  @click="verNotas(props.row)"
                  dense
                  v-if="props.row.notas !== '' || props.row.mejorPara !== ''"
                />
              </q-td>

              <q-td key="cantidad" :props="props">
                <q-input
                  type="text"
                  v-model.number="props.row.cantidad"
                  dense
                  autofocus
                />
              </q-td>

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

        <!-- Tabla con los Auxilaires en receta -->
        <q-table
          title="Levaduras en Receta"
          :rows="receta.getReceta.levadura"
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
              :disable="!editar"
              dense
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
    icono="biotech"
    colorIcono="primary"
    titulo="Notas sobre Levevaduras"
    :texto="notasLevaduras"
  />
</template>
<script setup>
import { useQuasar } from "quasar";
import { tablaListaLevaduras } from "src/composables/useTablesColumns";
import { useRecetas } from "src/stores/useRecetas";
import DialogInfo from "../DialogInfo.vue";
import { ref, defineProps } from "vue";
import { useLevaduras } from "src/stores/useLevaduras";
const $q = useQuasar();
const filter = ref("");
const levadura = useLevaduras();
const receta = useRecetas();
const col = tablaListaLevaduras;
const info = ref(false);
const notasLevaduras = ref("");
function seleccionar(registro) {
  receta.getReceta.levadura.push(registro);
}
function eliminar(registro) {
  receta.getReceta.levadura = receta.getReceta.levadura.filter(
    (l) => l.id !== registro.id
  );
}

function verNotas(registro) {
  info.value = true;
  notasLevaduras.value = `NOTAS DE LEVADURA: ${registro.notas}
  \n\r
  MEJOR USAR PARA VARIEDADES: ${registro.mejorPara}`;
}
const props = defineProps({
  editar: Boolean,
});
</script>
