'use strict';

const packageJSON = require('../../package.json');
const { ServiceBroker } = require('moleculer');
const { Sequelize } = require('sequelize');
const config = require('../config');
const { db } = config;

module.exports = {
    sequelize: () => {
        console.log('DB CONFIG', db);
        return new Sequelize(db.database, db.user, db.password, {
            dialect: db.dialect,
            host: db.host,
            port: db.port,
            sync: { force: false, alter: false }, // do NOT build tables for models - use UmZug
        });
    },
    initDatabase: async () => {
        console.log('DB', db);
        if (db.dialect === 'mysql') {
            const connectionConfig = { host: db.host, port: db.port, user: db.user, password: db.password };
            const mysql = require('mysql2');
            const connection = mysql.createConnection(connectionConfig);
            const res = connection.query(`CREATE DATABASE IF NOT EXISTS \`${db.database}\`;`, function (err) {
                if (err) console.log('error', err);
            });
            //console.log("------- initDatabase OK -------");
        } else if (db.dialect === 'postgres') {
            const { Client } = require('pg');
            const query = `SELECT 'CREATE DATABASE ${db.database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${db.database}')\gexe`;
            const client = new Client();
            await client.connect();
            const res = await client.query(query);
            await client.end();
            console.log('>>> INITIALIZED POSTGRES');
        }
    }
};
