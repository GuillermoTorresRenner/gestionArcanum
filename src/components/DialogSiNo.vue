<template>
  <q-dialog persistent>
    <q-card class="container">
      <q-card-section class="row justify-center">
        <q-avatar :icon="icono" :color="colorIcono" text-color="white" />
      </q-card-section>
      <q-card-section class="row justify-center q-mx-xl">
        <span>{{ texto }}</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="positive"
          icon="check"
          size="md"
          @click="accionAceptar()"
        />
        <q-btn color="negative" icon="cancel" size="md" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    icono: String,
    colorIcono: String,
    texto: String,
    accionAceptar: Function,
  },
  setup(props) {},
};
</script>
