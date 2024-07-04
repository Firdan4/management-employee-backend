import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/db";

interface DevisiAttributes {
  id?: number;
  name?: string;
  lead_id?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface DevisiInput extends Optional<DevisiAttributes, "id"> {}

class Devisi extends Model<DevisiAttributes, DevisiInput> implements Devisi {
  public id!: number;
  public name!: string;
  public lead_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Devisi?.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    tableName: "devisi",
    underscored: false,
  }
);

export default Devisi;
