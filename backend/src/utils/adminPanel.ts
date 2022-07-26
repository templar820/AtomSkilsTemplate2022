import {User} from '../models/DbModel';
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')

AdminJS.registerAdapter(AdminJSSequelize)

function initAdminPanel(path='/admin', app) {
    const adminJs = new AdminJS({
        resources: [{
            resource: User,
            options: {}
        }],
        rootPath: path,
    })

    app.use(adminJs.options.rootPath, AdminJSExpress.buildRouter(adminJs));
}

export default initAdminPanel;

