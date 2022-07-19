import orders from './data/orders.json';
import db from '../src/db';
import { Order } from '../src/models/DbModel';

const LIMIT = 1000;

const slicer = (data) => {
  const subarray = [];
  for (let i = 0; i <Math.ceil(data.length/LIMIT); i++){
    subarray[i] = data.slice((i*LIMIT), (i*LIMIT) + LIMIT);
  }
  return subarray;
}

const bulk = async (model, data, t, cb?) => {
  const workData = slicer(cb ? data.map(cb) : data);
    for (const items of workData) {
      await model.bulkCreate(items, {transaction: t});
    }
};

const main = async () => {
  const t = await db.transaction();
  console.log('clear success');
  try {
    await bulk(Order, orders, t);

    await t.commit();

    console.log('==> INIT DONE!');
  } catch (e) {
    console.log(e);
    await t.rollback();
  } finally {
    process.exit();
  }
}

main();
