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
export const useRecetas = defineStore("recetas", {
  state: () => ({
    receta: {
      id: "",
      nombre: "",
      estiloBase: "",
      volumenBatch: 0,
      densidadInicialObjetivo: 0,
      densidadFinalObjetivo: 0,
      ibuObjetivo: 0,
      srmEstimado: 0,
      abvEstimado: 0,
      carbonatacionObjetivo: 0,

      fermentables: [],
      lupulos: [],
      levadura: [],
      agua: [],
      auxiliares: [],
      otros: [],

      equipoCervecero: {},
      empaste: 3,
      atenuacionEstimada: 0,
    },
    recetas: [],
  }),
  getters: {
    getReceta: (state) => state.receta,
    getRecetas: (state) => state.recetas,
    getFermentablesEnReceta: (state) => state.receta.fermentables,
  },
  actions: {
    async saveRecetaInDB(style) {
      this.receta = style;
      if (this.receta.id === "") {
        this.receta.id = nanoid();
      }

      await setDoc(doc(db, "recetas", this.receta.id), this.receta);
    },
    async deleteRecetaInDB() {
      await deleteDoc(doc(db, "recetas", this.receta.id));
      this.recetas = this.recetas.filter((a) => a.id !== this.receta.id);
    },

    async getRecetasFromDB() {
      const q = await getDocs(
        query(collection(db, "recetas"), orderBy("nombre"))
      );
      q.forEach((e) => {
        this.recetas.push(e.data());
      });
    },
    addRecetaToRecetas(style) {
      this.recetas.push(style);
      this.recetas.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setReceta(style) {
      this.receta = style;
    },

    getNombreRecetas() {
      return this.recetas.map((n) => n.nombre);
    },
    resetReceta() {
      this.receta = {
        id: "",
        nombre: "",
        estiloBase: "",
        volumenBatch: 0,
        densidadInicialObjetivo: 0,
        densidadFinalObjetivo: 0,
        ibuObjetivo: 0,
        srmEstimado: 0,
        abvEstimado: 0,
        carbonatacionObjetivo: 0,
        insumos: {
          maltas: {},
          lupulos: {},
          levadura: {},
          agua: {},
          auxiliares: {},
          otros: {},
        },
        equipoCervecero: {},
        empaste: 3,
        atenuacionEstimada: 0,
      };
    },
    addFermentableToReceta(ferm) {
      this.receta.fermentables.push(ferm);
    },
  },
});
