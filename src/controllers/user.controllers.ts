import { Request, Response } from "express";
import User from "../db/models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    res.status(200).send({
      message: "successfully",
      data: users,
    });
    console.log(users);
  } catch (error: any) {
    console.log("Internal Error", error);
    res.status(500).send("Internal Error");
  }
};
