import { Request, Response, NextFunction } from "express";
import { MongoClient } from "../database/mongo";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Adm } from "../models/adm";
import { ObjectId } from "mongodb";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send("No authorization.");
      return;
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2) {
      res.status(400).send("Authorization invalid.");
      return;
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      res.status(400).send("Authorization invalid.");
      return;
    }

    jwt.verify(
      token,
      process.env.SECRET_JWT as Secret,
      async (error, decoded) => {
        if (error) {
          res.status(400).send("Token invalid.");
          return;
        }

        const { id } = decoded as DecodedToken;

        const adm = await MongoClient.db
          .collection<Omit<Adm, "id">>("admins")
          .findOne({ _id: new ObjectId(id) });

        console.log(adm);

        if (!adm) {
          res.status(400).send("Adm not found.");
          return;
        }

        next();
      }
    );
  } catch (error) {
    res.status(500).send("Something went wrong." + error);
  }
};
