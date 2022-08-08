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
      <template v-slot:top-left>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
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
import { ref } from "vue";
import { exportFile, useQuasar } from "quasar";
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
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

  setup(props) {
    return {
      filter: ref(""),
      exportTable() {
        // naive encoding to csv format
        const content = [props.col.map((col) => wrapCsvValue(col.label))]
          .concat(
            props.rows.map((row) =>
              props.col
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("table-export.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
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
