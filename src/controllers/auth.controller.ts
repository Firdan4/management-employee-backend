import { Request, Response } from "express";
import User from "../db/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { hashPassword, manageAccessToken } from "../libs/auth";
dotenv.config();

export const refreshToken = async (req: Request, res: Response) => {
  try {
    if (!req.cookies.refreshToken) {
      return res.status(401).send({
        message: "Invalid Refresh Token",
      });
    }

    const user = await User.findOne({
      where: {
        refrashToken: req.cookies.refreshToken,
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "Not Found!",
      });
    }

    jwt.verify(
      req.cookies.refreshToken,
      process.env.ACCESS_TOKEN_KEY as string,
      async (err: any, decode: any) => {
        if (err) {
          return res.status(403).send({
            message: "Forbidden!",
          });
        }

        const { accessToken, refrashToken } = manageAccessToken(user.email);

        await User.update(
          {
            refrashToken: refrashToken,
          },
          {
            where: {
              id: user.id,
            },
          }
        );

        res.cookie("refreshToken", refrashToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).send({
          message: "Login successfully",
          accessToken,
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      }
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: "Internal Error",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validasi data input
  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required!",
    });
  }

  // Cari user berdasarkan email
  const user = await User.findOne({
    where: {
      email,
    },
  });

  // Jika user tidak ditemukan
  if (!user) {
    return res.status(400).send({
      message: "Email or password invalid!",
    });
  }

  // Cocokkan password yang diinput dengan password di database
  const isMatch = bcrypt.compareSync(password, user.password);

  // Jika password tidak cocok
  if (!isMatch) {
    return res.status(400).send({
      message: "Email or password invalid!",
    });
  }

  // Kelola token akses, generate token
  const { accessToken, refrashToken } = manageAccessToken(email);

  // update refreshToken user in database
  await User.update(
    {
      refrashToken: refrashToken,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  // Set cookie untuk refresh token
  res.cookie("refreshToken", refrashToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Kirim respons sukses
  res.status(200).send({
    message: "Login successfully",
    accessToken,
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Validasi data input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({
        message: "Email is already in use!",
      });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    // Kirim respons sukses
    res.status(200).send({
      message: "Registration successful",
      data: newUser,
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).send({
      message: "Invalid Refresh Token",
    });
  }

  const user = await User.findOne({
    where: {
      refrashToken: req.cookies.refreshToken,
    },
  });

  if (!user) {
    return res.status(404).send({
      message: "Not Found!",
    });
  }

  await User.update(
    {
      refrashToken: null,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  res.clearCookie("refreshToken");
  res.end();
  res.status(200).send({
    message: "Logout successfully",
  });
};
