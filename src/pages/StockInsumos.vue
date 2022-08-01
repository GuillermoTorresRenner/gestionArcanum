<template>
  <q-page>
    <h4 class="text-center text-negative">Stock</h4>
    <div class="q-mx-md">
      <q-toggle v-model="enStock" color="green" label="Sólo en Stock" />
    </div>
    <TablaGeneral
      :col="col"
      :rows="filtro"
      titulo="Tabla de Estilos de Cerveza"
      noData="Sin Estilos que mostrar"
      :seleccionar="modificar"
    />

    <q-dialog persistent v-model="mostrar">
      <q-card class="container">
        <q-card-section class="row justify-center">
          <q-avatar icon="ion-cloud-upload" size="xl" text-color="white" />
        </q-card-section>
        <q-card-section class="row justify-center q-mx-xl">
          <span class="text-h5">{{ stock.getStock.nombre }}</span>
        </q-card-section>
        <q-card-section class="row justify-center q-mx-xl">
          <span class="text-h5"
            >{{ stock.getStock.cantidad }} {{ stock.getStock.unidad }} -->{{
              nuevaCantidad
            }}
            {{ stock.getStock.unidad }}</span
          >
        </q-card-section>
        <q-card-section>
          <q-input
            v-model.number="cant"
            type="text"
            label="Nueva cantidad"
            hint="Puede ser negativa o positiva"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            color="positive"
            icon="ion-save"
            size="md"
            @click="actualizar"
            :disable="nuevaCantidad < 0 ? true : false"
          />
          <q-btn color="negative" icon="cancel" size="md" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import TablaGeneral from "src/components/TablaGeneral.vue";
import { tablaListaStock } from "src/composables/useTablesColumns";
import { useStock } from "src/stores/useStock";
import { ref, computed } from "vue";
const stock = useStock();
const filtro = computed(() => {
  return enStock.value
    ? stock.getStocks.filter((s) => s.cantidad > 0)
    : stock.getStocks;
});
const nuevaCantidad = computed(() => {
  return stock.getStock.cantidad + cant.value;
});
const enStock = ref(false);
const $q = useQuasar();
const cant = ref(0);
const col = tablaListaStock;
const mostrar = ref(false);
function modificar(registro) {
  mostrar.value = true;
  stock.setStock(registro);
}
function actualizar() {
  cant.value = 0;
  stock.getStock.cantidad = nuevaCantidad;
  stock.saveStockInDB();
  mostrar.value = false;
  $q.notify({
    position: "bottom",
    message: "Stock modificado",
    icon: "check",
    color: "green",
  });
}
</script>
