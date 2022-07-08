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
          IBUs Totales: {{ receta.getReceta.ibuObjetivo }}</strong
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
              <q-td key="porcentajeAA" :props="props">
                {{ props.row.porcentajeAA }}
              </q-td>
              <q-td key="formato" :props="props">
                <div class="text-pre-wrap">{{ props.row.formato }}</div>
              </q-td>
              <q-td key="minAgregado" :props="props">
                {{ props.row.minAgregado }}
                <q-popup-edit
                  v-model="props.row.porcentajeReceta"
                  title="% Receta"
                  buttons
                  v-slot="scope"
                >
                  <q-input
                    type="text"
                    v-model.number="scope.value"
                    dense
                    autofocus
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="cantidad" :props="props">{{
                // (props.row.cantidad =
                //   (puntosDensidad /
                //     (config.getConfig.eficiencia.actual *
                //       props.row.porcentajeExtraccion *
                //       3.84)) *
                //   props.row.porcentajeReceta).toFixed(2)
                props.row.cantidad
              }}</q-td>
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

        <q-table
          title="Fermentables en Receta"
          :rows="receta.getReceta.fermentables"
          :columns="col2"
          row-key="nombre"
          binary-state-sort
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombre" :props="props">
                {{ props.row.nombre }}
              </q-td>
              <q-td key="porcentajeExtraccion" :props="props">
                {{ props.row.porcentajeExtraccion }}
              </q-td>
              <q-td key="color" :props="props">
                <div class="text-pre-wrap">{{ props.row.color }}</div>
              </q-td>
              <q-td key="porcentajeReceta" :props="props">
                {{ props.row.porcentajeReceta }}
              </q-td>
              <q-td key="cantidad" :props="props">{{
                props.row.cantidad.toFixed(2)
              }}</q-td>
              <q-td key="accion" :props="props"
                ><q-btn
                  color="negative"
                  icon="ion-trash"
                  @click="eliminar(props.row)"
                  dense
              /></q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>

      <q-card-section class="row"> </q-card-section>
    </q-expansion-item>
  </q-card>
</template>
<script setup>
import { tablaListaLupulos } from "src/composables/useTablesColumns";
import { useLupulos } from "src/stores/useLupulos";
import { useRecetas } from "src/stores/useRecetas";
import { ref } from "vue";
const filter = ref("");
const lupulo = useLupulos();
const receta = useRecetas();
const col = tablaListaLupulos;
</script>
