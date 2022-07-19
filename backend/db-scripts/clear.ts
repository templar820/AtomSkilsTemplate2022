import * as models from '../src/models/DbModel';
import db from '../src/db';

const clear = async () => {
  try {
    console.log(models);
    await db.authenticate();
    console.log('Connection has been established successfully.');
    const cleared = await db.sync({force: true});

    if(cleared) {
      console.log("==> CLEAR DONE !");
    };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    process.exit();
  }
}

clear();
