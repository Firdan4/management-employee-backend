import { DataType, DataTypes, Model, Optional } from "sequelize";

import connection from "../../config/db";

interface UserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  refrashToken?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
// export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public refrashToken!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User?.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    refrashToken: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize: connection,
    underscored: false,
  }
);

export default User;
