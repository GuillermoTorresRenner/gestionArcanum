<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useEstilos } from "./stores/useEstilos";
import { useFermentables } from "./stores/useFermentables";
import { useLupulos } from "./stores/useLupulos";
import { useLevaduras } from "./stores/useLevaduras";
import { useAuxiliares } from "./stores/useAuxiliares";
import { onSnapshot, collection } from "@firebase/firestore";
import { db } from "./boot/firebase";
import { useConfig } from "./stores/useConfig";
import { useRecetas } from "./stores/useRecetas";

const $q = useQuasar();
$q.dark.set(true);
const style = useEstilos();
const insumo = useFermentables();
const hop = useLupulos();
const yeast = useLevaduras();
const aux = useAuxiliares();
const config = useConfig();
const recetas = useRecetas();

onMounted(() => {
  const realTimeEstilos = onSnapshot(collection(db, "estilos"), (cambios) => {
    cambios.docChanges().forEach((c) => {
      if (c.type === "added") {
        style.addEstiloToEstilos(c.doc.data());
      }
    });
  });
  const realTimeFermentables = onSnapshot(
    collection(db, "fermentables"),
    (cambios) => {
      cambios.docChanges().forEach((c) => {
        if (c.type === "added") {
          insumo.addFermentableToFermentables(c.doc.data());
        }
      });
    }
  );
  const realTimeLupulos = onSnapshot(collection(db, "lupulos"), (cambios) => {
    cambios.docChanges().forEach((c) => {
      if (c.type === "added") {
        hop.addlupuloTolupulos(c.doc.data());
      }
    });
  });
  const realTimeLevaduras = onSnapshot(
    collection(db, "levaduras"),
    (cambios) => {
      cambios.docChanges().forEach((c) => {
        if (c.type === "added") {
          yeast.addlevaduraTolevaduras(c.doc.data());
        }
      });
    }
  );
  const realTimeAuxiliares = onSnapshot(
    collection(db, "auxiliares"),
    (cambios) => {
      cambios.docChanges().forEach((c) => {
        if (c.type === "added") {
          aux.addauxiliarToauxiliares(c.doc.data());
        }
      });
    }
  );

  const realTimeConfig = onSnapshot(collection(db, "config"), (cambios) => {
    cambios.docChanges().forEach((c) => {
      if (c.type === "added") {
        config.setConfig(c.doc.data());
      }
    });
  });

  const realTimeRecetas = onSnapshot(collection(db, "recetas"), (cambios) => {
    cambios.docChanges().forEach((c) => {
      if (c.type === "added") {
        recetas.addRecetaToRecetas(c.doc.data());
      }
    });
  });
});
//Fin
</script>
