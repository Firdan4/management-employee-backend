import { Request, Response } from "express";
import User from "../db/models/user";
import Employee from "../db/models/employee";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const users = await Employee.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.status(200).send({
      message: "successfully",
      data: users,
    });
  } catch (error: any) {
    console.log("Internal Error", error);
    return res.status(500).send("Internal Error");
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, status, position } = req.body;
    if (!name || !status || !position) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    const employee = await Employee.create({ name, status, position });

    return res.status(200).send({
      message: "Create Employee Successfully",
      data: employee,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { name, status, position } = req.body;
    if (!name || !status || !position) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    const employee = await Employee.update(
      { name, status, position },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).send({
      message: "Update Employee Successfully",
      data: employee,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
    });
  }
};
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "Id is required!",
      });
    }

    const employee = await Employee.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).send({
      message: "Delete Employee Successfully",
      data: employee,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
    });
  }
};
