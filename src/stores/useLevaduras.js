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
export const useLevaduras = defineStore("levaaduras", {
  state: () => ({
    levadura: {},
    levaduras: [],
  }),
  getters: {
    getlevadura: (state) => state.levadura,
    getlevaduras: (state) => state.levaduras,
  },
  actions: {
    async savelevaduraInDB(yeast) {
      this.levadura = yeast;
      if (this.levadura.id === "") {
        this.levadura.id = nanoid();
      }

      await setDoc(doc(db, "levaduras", this.levadura.id), this.levadura);
    },
    async deletelevaduraInDB() {
      await deleteDoc(doc(db, "levaduras", this.levadura.id));
      this.levaduras = this.levaduras.filter((l) => l.id !== this.levadura.id);
    },

    async getlevadurasFromDB() {
      const q = await getDocs(
        query(collection(db, "levaduras"), orderBy("nombre"))
      );
      q.forEach((l) => {
        this.levaduras.push(l.data());
      });
    },
    addlevaduraTolevaduras(levadura) {
      this.levaduras.push(levadura);
      this.levaduras.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setlevadura(yeast) {
      this.levadura = yeast;
    },
  },
});
