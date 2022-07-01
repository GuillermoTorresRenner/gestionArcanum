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
export const useLupulos = defineStore("lupulos", {
  state: () => ({
    lupulo: {},
    lupulos: [],
  }),
  getters: {
    getlupulo: (state) => state.lupulo,
    getlupulos: (state) => state.lupulos,
  },
  actions: {
    async savelupuloInDB(hop) {
      this.lupulo = hop;
      if (this.lupulo.id === "") {
        this.lupulo.id = nanoid();
      }

      await setDoc(doc(db, "lupulos", this.lupulo.id), this.lupulo);
    },
    async deletelupuloInDB() {
      await deleteDoc(doc(db, "lupulos", this.lupulo.id));
      this.lupulos = this.lupulos.filter((l) => l.id !== this.lupulo.id);
    },

    async getlupulosFromDB() {
      const q = await getDocs(
        query(collection(db, "lupulos"), orderBy("nombre"))
      );
      q.forEach((l) => {
        this.lupulos.push(l.data());
      });
    },
    addlupuloTolupulos(lupulo) {
      this.lupulos.push(lupulo);
      this.lupulos.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setlupulo(hop) {
      this.lupulo = hop;
    },
  },
});
