<template>
  <q-card class="col">
    <q-card-section class="bg-dark text-white">
      <p class="text-center">Estilo Base</p>
      <div class="row justify-center items-end">
        <q-select
          v-model="receta.getReceta.estiloBase"
          :options="estilo.getEstilos.map((e) => e.nombre)"
          label="Estilo Base"
          @change="set"
          class="col justify-end"
          :readonly="!editar"
        />

        <div class="text-subtitle1 col q-ml-md justify-end">
          Categoría: {{ estilo.getEstilo.categoria }}
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-expansion-item
      expand-separator
      icon="ion-document"
      label="Datos de Estilo"
      :caption="getStyle.nombre"
    >
      <q-card-section>
        Dendidad Inicial: {{ estilo.getEstilo.densidadInicial.min }} -
        {{ estilo.getEstilo.densidadInicial.max }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        Dendidad Final: {{ estilo.getEstilo.densidadFinal.min }} -
        {{ estilo.getEstilo.densidadFinal.max }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        IBU: {{ estilo.getEstilo.ibu.min }} -
        {{ estilo.getEstilo.ibu.max }} IBUS
      </q-card-section>
      <q-separator />
      <q-card-section>
        Color: {{ estilo.getEstilo.color.min }} -
        {{ estilo.getEstilo.color.max }} SRM
      </q-card-section>
      <q-separator />
      <q-card-section>
        ABV: {{ estilo.getEstilo.abv.min }} - {{ estilo.getEstilo.abv.max }} °GL
      </q-card-section>
      <q-separator />
      <q-card-section>
        Volúmenes CO2: {{ estilo.getEstilo.carb.min }} -
        {{ estilo.getEstilo.carb.max }}
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn
          flat
          label="Notas"
          icon="ion-eye"
          @click="verInfo('notas')"
          :disable="bloquearBtnVerInfo"
        />
        <q-btn
          flat
          label="Perfil"
          icon="ion-eye"
          @click="verInfo('perfil')"
          :disable="bloquearBtnVerInfo"
        />
      </q-card-actions>
    </q-expansion-item>
  </q-card>

  <DialogInfo
    v-model="dialogInfo.estado"
    :texto="dialogInfo.texto"
    :titulo="dialogInfo.titulo"
  />
</template>
<script setup>
import { useEstilos } from "../../stores/useEstilos";
import { useRecetas } from "../../stores/useRecetas";
import { computed, ref } from "vue";
import DialogInfo from "src/components/DialogInfo.vue";

const estilo = useEstilos();
const receta = useRecetas();
const dialogInfo = ref({
  estado: false,
  texto: "",
  titulo: "",
});
const getStyle = computed(() => {
  estilo.setEstiloByName(receta.getReceta.estiloBase);
  return estilo.getEstilo;
});
function verInfo(seccion) {
  if (seccion === "perfil") {
    dialogInfo.value.estado = true;
    dialogInfo.value.titulo = "Perfil ";
    dialogInfo.value.texto = estilo.getEstilo.perfil;
  } else {
    dialogInfo.value.estado = true;
    dialogInfo.value.titulo = "Notas  ";
    dialogInfo.value.texto = estilo.getEstilo.notas;
  }
}
const bloquearBtnVerInfo = computed(() => {
  return receta.getReceta.estiloBase === "" ? true : false;
});
function set() {
  estilo.setEstiloByName(receta.getReceta.estiloBase);
  receta.getReceta.estiloBase = estilo.getEstilo;
}
const props = defineProps({
  editar: Boolean,
});
</script>
