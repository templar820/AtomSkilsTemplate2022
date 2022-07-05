conn = new Mongo();
db = conn.getDB("as_2022");


db.delete_me.createIndex({ "delete_me": 1 }, { unique: false });





