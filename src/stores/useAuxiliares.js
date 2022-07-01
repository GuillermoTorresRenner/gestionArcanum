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
export const useAuxiliares = defineStore("auxiliares", {
  state: () => ({
    auxiliar: {},
    auxiliares: [],
  }),
  getters: {
    getAuxiliar: (state) => state.auxiliar,
    getAuxiliares: (state) => state.auxiliares,
  },
  actions: {
    async saveauxiliarInDB(aux) {
      this.auxiliar = aux;
      if (this.auxiliar.id === "") {
        this.auxiliar.id = nanoid();
      }

      await setDoc(doc(db, "auxiliares", this.auxiliar.id), this.auxiliar);
    },
    async deleteauxiliarInDB() {
      await deleteDoc(doc(db, "auxiliares", this.auxiliar.id));
      this.auxiliares = this.auxiliares.filter(
        (a) => a.id !== this.auxiliar.id
      );
    },

    async getauxiliaresFromDB() {
      const q = await getDocs(
        query(collection(db, "auxiliares"), orderBy("nombre"))
      );
      q.forEach((a) => {
        this.auxiliares.push(a.data());
      });
    },
    addauxiliarToauxiliares(aux) {
      this.auxiliares.push(aux);
      this.auxiliares.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setauxiliar(aux) {
      this.auxiliar = aux;
    },
  },
});
