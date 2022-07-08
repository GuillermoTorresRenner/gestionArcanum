<template>
  <q-page class="container">
    <div class="row justify-center q-my-xl">
      <img
        alt="Arcanum logo"
        src="../assets/Logo.png"
        style="width: 300px; height: 300px"
      />
    </div>

    <q-form @submit="ingresar()" class="q-gutter-md">
      <div class="row justify-center">
        <q-input
          v-model="mail"
          type="email"
          label="E-mail"
          lazy-rules="ondemand"
          class="col-6"
        />
      </div>
      <div class="row justify-center">
        <q-input
          v-model="pass"
          type="password"
          label="Password"
          lazy-rules="ondemand"
          class="col-6"
        />
      </div>

      <div class="row justify-center">
        <q-btn
          type="submit"
          color="primary"
          icon="ion-log-in"
          class="q-mt-xl"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { auth } from "src/boot/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@vueuse/firebase";
const router = useRouter();
const { isAuthenticated } = useAuth(auth);
const mail = ref("");
const pass = ref("");
async function ingresar() {
  await signInWithEmailAndPassword(auth, mail.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push("/fermentables");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
</script>
