const filemanager = require('@opuscapita/filemanager-server');

const config = {
    fsRoot: __dirname + '/../public',
    rootName: 'Root folder',
    port: process.env.FILE_SERVER_PORT || '3020',
    host: process.env.FILE_SERVER_HOST || 'localhost',
};

const startFileManagerServer = () => {
    try {
        filemanager.server.run(config);
    } catch (e) {
        console.error(e);
    }
}

export default startFileManagerServer;