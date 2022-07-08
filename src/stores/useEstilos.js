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
export const useEstilos = defineStore("estilos", {
  state: () => ({
    estilo: {
      nombre: "",
      tipo: "",
      categoria: "",
      numeroCategoria: "",
      letraEstilo: "",
      densidadInicial: { min: 0, max: 0 },
      densidadFinal: { min: 0, max: 0 },
      ibu: { min: 0, max: 0 },
      color: { min: 0, max: 0 },
      abv: { min: 0, max: 0 },
      carb: { min: 0, max: 0 },
      verificado: false,
      notas: "",
      perfil: "",
      ingredientes: "",
      id: "",
    },
    estilos: [],
  }),
  getters: {
    getEstilo: (state) => state.estilo,
    getEstilos: (state) => state.estilos,
  },
  actions: {
    async saveEstiloInDB(style) {
      this.estilo = style;
      if (this.estilo.id === "") {
        this.estilo.id = nanoid();
      }

      await setDoc(doc(db, "estilos", this.estilo.id), this.estilo);
    },
    async deleteEstiloInDB() {
      await deleteDoc(doc(db, "estilos", this.estilo.id));
      this.estilos = this.estilos.filter((a) => a.id !== this.estilo.id);
    },

    async getEstilosFromDB() {
      const q = await getDocs(
        query(collection(db, "estilos"), orderBy("nombre"))
      );
      q.forEach((e) => {
        this.estilos.push(e.data());
      });
    },
    addEstiloToEstilos(style) {
      this.estilos.push(style);
      this.estilos.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setEstilo(style) {
      this.estilo = style;
    },

    setEstiloByName(nombreEstilo) {
      if (nombreEstilo !== "") {
        this.estilo = this.estilos.filter((e) => e.nombre === nombreEstilo)[0];
      }
    },

    resetEstilo() {
      this.estilo = {
        nombre: "",
        tipo: "",
        categoria: "",
        numeroCategoria: "",
        letraEstilo: "",
        densidadInicial: { min: 0, max: 0 },
        densidadFinal: { min: 0, max: 0 },
        ibu: { min: 0, max: 0 },
        color: { min: 0, max: 0 },
        abv: { min: 0, max: 0 },
        carb: { min: 0, max: 0 },
        verificado: false,
        notas: "",
        perfil: "",
        ingredientes: "",
        id: "",
      };
    },
  },
});
