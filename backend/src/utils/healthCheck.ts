import db from '../db';

const timeoutHandle = (fn) => async () => {
  return new Promise((resolve, reject) => {
    if (!fn) reject();
    fn()
      .then(resolve)
      .catch(reject);
    setTimeout(() => {
      reject({ timeout: true, message: 'timout error' });
    }, 1000);
  });
};

const asyncHealthCheckHandler = (fns = []) => async () => {
  const errors = [];
  return Promise.all(
    fns
      .map((fn) => fn && fn())
      .map((p) =>
        p.catch((error) => {
          // silently collecting all the errors
          errors.push(error);
          return undefined;
        })
      )
  ).then(() => {
    if (errors.length) {
      throw { causes: errors };
    }
  });
};

const checkConnectToPgDb = async () => {
  try {
    await db.authenticate();
    return true;
  } catch(e) {
    return false;
  }
}

const healthCheck = async () => {
  return Promise.resolve(await checkConnectToPgDb());
};

const healthCheckFileManager = async () => {
  return Promise.resolve();
}

const beforeShutdown = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
};

const options = {
  healthChecks: {
    '/healthcheck': asyncHealthCheckHandler([healthCheck]),
    '/healthcheck-files': asyncHealthCheckHandler([healthCheckFileManager]),
  },
  timeout: 5000,
  beforeShutdown
};

export default options;
