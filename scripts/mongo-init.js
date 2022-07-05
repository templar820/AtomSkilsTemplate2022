// #!/bin/bash
//
// echo "########### CREATE DATABASE MONGO ###########"
//
// mongo --eval "
// db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
// db = db.getSiblingDB('$DB_NAME');
// db.createUser({ user: '$DB_USER', pwd: '$DB_PASSWORD', roles: [{ role: 'readWrite', db: '$DB_NAME' }] });"


db.createUser({
    user: "user",
    pwd: "pass",
    roles: [
        {
            role: "readWrite",
            db: "as_2022"
        }
    ]
})


