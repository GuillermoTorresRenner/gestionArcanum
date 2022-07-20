<template>
  <div class="q-pa-md">
    <q-table
      :title="titulo"
      :rows="rows"
      :columns="col"
      row-key="id"
      :filter="filter"
      dense
      class="my-sticky-header-table"
      :no-data-label="noData"
    >
      <template v-slot:body-cell-editar="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="warning"
              icon="ion-create"
              label="Editar"
              @click="editar(props.row)"
              size="sm"
              dense
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-eliminar="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="negative"
              icon="ion-trash"
              label="Eliminar"
              @click="eliminar(props.row)"
              size="sm"
              dense
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-seleccionar="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="info"
              icon="check"
              @click="seleccionar(props.row)"
              size="sm"
              dense
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-pdf="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="teal"
              icon="ion-document"
              @click="pdf(props.row)"
              size="sm"
              dense
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-clonar="props">
        <q-td :props="props">
          <div>
            <q-btn
              color="purple"
              icon="ion-copy"
              @click="clonar(props.row)"
              size="sm"
              dense
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    rows: Object,
    col: Array,
    titulo: String,
    editar: Function,
    clonar: Function,
    eliminar: Function,
    pdf: Function,
    seleccionar: Function,
    noData: String,
  },
  setup() {
    return {
      filter: ref(""),
    };
  },
};
</script>
<style s lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 300px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #1d1d1d

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
