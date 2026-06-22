import bcrypt from "bcryptjs";

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static createNewUser(id, name, email, plainPassword) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
    return new User(id, name, email, hashedPassword);
  }

  verifyPassword(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
  }

  static converter = {
    toFirestore: (user) => {
      return {
        name: user.name,
        email: user.email,
        password: user.password,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(snapshot.id, data.name, data.email, data.password);
    },
  };
}

export default User;
