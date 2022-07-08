<template>
  <q-page padding class="container">
    <div class="row justify-center q-mt-xl">
      <q-btn
        color="negative"
        icon="ion-log-out"
        label="Cerrar Sesión"
        @click="cerrarSesion"
      />
    </div>
  </q-page>
</template>
<script setup>
import { useRouter } from "vue-router";
import { auth } from "src/boot/firebase";
import { signOut } from "@firebase/auth";
const router = useRouter();
async function cerrarSesion() {
  await signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      // An error happened.
    });
}
</script>
