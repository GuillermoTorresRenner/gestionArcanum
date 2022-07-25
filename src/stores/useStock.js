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
export const useStock = defineStore("stock", {
  state: () => ({
    stock: {
      id: "",
      nombre: "",
      tipo: "",
      fechaActualizacion: 65,
      cantidad: 0,
      unidad: "",
    },
    stocks: [],
  }),
  getters: {
    getStock: (state) => state.stock,
    getStocks: (state) => state.stocks,
  },
  actions: {
    async saveStockInDB() {
      if (this.stock.id === "") {
        this.stock.id = nanoid();
      }

      await setDoc(doc(db, "stock", this.stock.id), this.stock);
    },
    async deleteStockInDB() {
      this.stocks = this.stocks.filter((a) => a.id !== this.stocks.id);
      await deleteDoc(doc(db, "stocks", this.stock.id));
    },

    async getStockFromDB() {
      const q = await getDocs(
        query(collection(db, "stock"), orderBy("nombre"))
      );
      q.forEach((e) => {
        this.stocks.push(e.data());
      });
    },
    addStockToStocks(stk) {
      this.stocks.push(stk);
      this.stocks.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }
      });
    },

    setStock(stk) {
      this.stock = stk;
    },
  },
});
