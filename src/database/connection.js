const sql = require("mssql");

const dbSetting = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    server: process.env.DBSERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true,
    }
}

const getConnection = async ()=>{
    try {
        const pool = await sql.connect(dbSetting);
        console.log("Conectado a db!!");
        return pool;
    } catch (error) {
        console.log("Error encontrado: ", error);
    }
}

module.exports = {
    dbSetting,
    getConnection,
    sql
}