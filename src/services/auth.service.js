import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginService = async (email, password) => {
  const usersRef = collection(db, "users").withConverter(User.converter);
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Credenciales invalidas");
  }

  const user = querySnapshot.docs[0].data();

  const correctPassword = user.verifyPassword(password);

  if (!correctPassword) {
    throw new Error("Credenciales invalidas");
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });

  return { token: `Bearer ${token}` };
};
