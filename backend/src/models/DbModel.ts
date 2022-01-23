import { DataTypes } from 'sequelize';
import db from '../config/db';
import es from '../config/es';

const saveDocument = (instance: any) => {
  return es.create({
    index: 'products',
    type: 'products',
    id: instance.dataValues.id,
    body: { name: instance.dataValues.name },
  });
};

const updateDocument = (instance: any) => {
  return es.update({
    id: instance.dataValues.id,
    index: 'products',
    body: { doc: { name: instance.dataValues.name } },
  });
};

const deleteDocument = (instance: any) => {
  return es.delete({
    index: 'products',
    type: 'products',
    id: instance.dataValues.id,
  });
};

const User = db.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  token: { type: DataTypes.STRING }
});

const UserDetails = db.define('user_details', {
  language: { type: DataTypes.STRING },
});

const Product = db.define('products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
}, {
  hooks: {
    afterCreate: saveDocument,
    afterDestroy: deleteDocument,
    afterUpdate: updateDocument,
  }
});

const Substance = db.define('substance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  code: { type: DataTypes.STRING },
});

const Car = db.define('car', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const Oil = db.define('oil', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.INTEGER },
});

const Car_Oil = db.define('Car_Oil', {
  selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });

Car.belongsToMany(Oil, { through: Car_Oil });
Oil.belongsToMany(Car, { through: Car_Oil });

Substance.hasMany(Product);
Product.belongsTo(Substance, { as: 'substance' });

// User.hasOne(UserDetails, {as: "user_details", foreignKey: 'fk_user_id', targetKey: 'id'});
// User.hasOne(UserDetails, {as: 'user_details'});
User.belongsTo(UserDetails, { as: 'user_details' });

export interface ISubstance {
  name: string;
  id: number;
  code: string;
}

export interface JWTUser {
  email: string;
  id: number;
  role: string;
}

export {
  User,
  Car,
  Oil,
  UserDetails,
  Product,
  Substance
};
