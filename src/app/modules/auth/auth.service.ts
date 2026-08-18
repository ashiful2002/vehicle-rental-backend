import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import status from "http-status";
import { Knex } from "knex";
import AppError from "../../errorHelpers/AppError";
import { ILoginUserPayload, IRegisterPayload } from "./auth.interface";

class AuthService {
  private db: Knex;
  private jwtSecret: string;
  private jwtExpiresIn: number;

  constructor(db: Knex) {
    this.db = db;
    this.jwtSecret = process.env.JWT_SECRET || "jwt-secret-key";
    this.jwtExpiresIn = 24 * 60 * 60; // 1 day, in seconds
  }

  async createUser(payload: IRegisterPayload) {
    const { name, email, password } = payload;

    const existingUser = await this.db("staff").where({ email }).first();
    if (existingUser) {
      throw new AppError(status.CONFLICT, "User already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [newStaff] = await this.db("staff")
      .insert({ name, email, password_hash })
      .returning(["id", "name", "email", "created_at", "updated_at"]);

    return newStaff;
  }

  async loginUser(payload: ILoginUserPayload) {
    const { email, password } = payload;

    const user = await this.db("staff").where({ email }).first();
    if (!user) {
      throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
    }

    const isPassValid = await bcrypt.compare(password, user.password_hash);
    if (!isPassValid) {
      throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn }
    );

    const { password_hash, ...safeUser } = user;

    return { user: safeUser, token };
  }
}

export default AuthService;
