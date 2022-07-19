<template>
  <q-dialog persistent :maximized="true">
    <q-card class="container">
      <q-card-section class="row justify-center">
        <q-avatar :icon="icono" :color="colorIcono" text-color="white" />
      </q-card-section>
      <q-card-section class="row justify-center q-mx-xl">
        <h5>{{ titulo }}</h5>
        <p>{{ texto }}</p>
      </q-card-section>
      <q-card-actions align="center">
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
    titulo: String,
  },
  setup(props) {},
};
</script>
