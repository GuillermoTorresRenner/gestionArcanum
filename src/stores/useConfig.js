import { defineStore } from "pinia";
import { db } from "src/boot/firebase";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { nanoid } from "nanoid";
export const useConfig = defineStore("config", {
  state: () => ({
    config: {
      id: "",
      eficiencia: {
        actual: 75,
        eficienciasHistoricas: [],
        eficienciaPromedio: 0,
      },
      agua: {
        perdidaEvaporacion: 0,
        perdidaElaboracion: 0,
        absorcionGranos: 0,
      },
      volumenElaboracion: {
        min: 0,
        max: 0,
      },
    },
  }),
  getters: {
    getConfig: (state) => state.config,
  },
  actions: {
    async saveConfigInDB() {
      if (this.config.id === "") {
        this.config.id = nanoid();
      }

      await setDoc(doc(db, "config", this.config.id), this.config);
    },
    async deleteConfigInDB() {
      await deleteDoc(doc(db, "config", this.config.id));
      this.configs = this.configs.filter((a) => a.id !== this.config.id);
    },

    async getConfigsFromDB() {
      const q = await getDocs(
        query(collection(db, "config"), orderBy("nombre"))
      );
      q.forEach((e) => {
        this.configs.push(e.data());
      });
    },

    setConfig(conf) {
      this.config = conf;
    },

    resetConfig() {
      this.config = {
        id: "",
      };
    },
  },
});
