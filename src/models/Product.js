import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig.js";

class Product {
  constructor(id, name, price, category, stock, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.description = description;
  }

  static async update(id, data) {
    const productRef = doc(db, "products", id);

    await updateDoc(productRef, data);

    return {
      id,
      ...data,
    };
  }

  static converter = {
    toFirestore: (product) => {
      return {
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Product(
        snapshot.id,
        data.name,
        data.price,
        data.category,
        data.stock,
        data.description,
      );
    },
  };
}

export default Product;
