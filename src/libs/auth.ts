import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

export const manageAccessToken = (email: string) => {
  const accessToken = jwt.sign(
    {
      email,
    },
    process.env.ACCESS_TOKEN_KEY as string,
    {
      expiresIn: "1d",
    }
  );

  const refrashToken = jwt.sign(
    {
      email,
    },
    process.env.ACCESS_TOKEN_KEY as string,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refrashToken };
};
