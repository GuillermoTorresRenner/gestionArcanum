import { defineStore } from "pinia";
import { db } from "src/boot/firebase";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { nanoid } from "nanoid";
export const useFermentables = defineStore("fermentables", {
  state: () => ({
    fermentable: {},
    fermentables: [],
  }),
  getters: {
    getFermentable: (state) => state.fermentable,
    getFermentables: (state) => state.fermentables,
  },
  actions: {
    async saveFermentableInDB(ferm) {
      this.fermentable = ferm;
      if (this.fermentable.id === "") {
        this.fermentable.id = nanoid();
      }

      await setDoc(
        doc(db, "fermentables", this.fermentable.id),
        this.fermentable
      );
    },
    async deleteFermentableInDB() {
      await deleteDoc(doc(db, "fermentables", this.fermentable.id));
      this.fermentables = this.fermentables.filter(
        (f) => f.id !== this.fermentable.id
      );
    },

    async getFermentablesFromDB() {
      const q = await getDocs(
        query(collection(db, "fermentables"), orderBy("nombre"))
      );
      q.forEach((f) => {
        this.fermentables.push(f.data());
      });
    },
    addFermentableToFermentables(fermentable) {
      this.fermentables.push(fermentable);
      this.fermentables.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setFermentable(ferm) {
      this.fermentable = ferm;
    },
  },
});
