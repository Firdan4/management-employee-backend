import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/db";

interface EmployeeAttributes {
  id?: number;
  name?: string;
  status?: string;
  devisi_id?: number;
  position?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmployeeInput extends Optional<EmployeeAttributes, "id"> {}

class Employee
  extends Model<EmployeeAttributes, EmployeeInput>
  implements Employee
{
  public id!: number;
  public name!: string;
  public status!: string;
  public devisi_id!: number;
  public position!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    devisi_id: {
      // allowNull: false,
      type: DataTypes.INTEGER,
    },
    position: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    tableName: "employees",
    timestamps: true,
    underscored: false,
  }
);

export default Employee;
