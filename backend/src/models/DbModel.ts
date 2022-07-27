import { DataTypes } from 'sequelize';
import db from '../db';
import bcrypt from 'bcrypt';
import hashSync from '../utils/hashSync';
// import es from '../config/es';

// const saveDocument = (instance: any) => {
//   return es.create({
//     index: 'products',
//     type: 'products',
//     id: instance.dataValues.id,
//     body: { name: instance.dataValues.name },
//   });
// };
//
// const updateDocument = (instance: any) => {
//   return es.update({
//     id: instance.dataValues.id,
//     index: 'products',
//     body: { doc: { name: instance.dataValues.name } },
//   });
// };
//
// const deleteDocument = (instance: any) => {
//   return es.delete({
//     index: 'products',
//     type: 'products',
//     id: instance.dataValues.id,
//   });
// };

const User = db.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  token: { type: DataTypes.STRING }
});

User.beforeBulkCreate(async (users) => {
  users.forEach(user => {
    if (user.changed('password')) {
      user.password = hashSync(user.password);
    }
  })
})

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = hashSync(user.password);
  }
});

User.prototype.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const Order = db.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const UserDetails = db.define('user_details', {
  language: { type: DataTypes.STRING },
});

const Product = db.define('product', {
  name: {type: DataTypes.STRING},
  price: {type: DataTypes.FLOAT}
});

const ProductType = db.define('product_type', {
   name: {type: DataTypes.STRING, unique: true}
})

ProductType.hasOne(Product, {foreignKey: 'typeId'});
Product.belongsTo(ProductType, {foreignKey: 'typeId'});

Product.hasOne(Order, {foreignKey: 'productId'});
Order.belongsTo(Product, {foreignKey: 'productId'});
User.hasOne(Order, {foreignKey: 'userId'});
Order.belongsTo(User, {foreignKey: 'userId'});


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
  UserDetails,
  Order,
  Product,
  ProductType
};

