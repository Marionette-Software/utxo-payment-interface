"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Config = require("./database.config");
const Models = require("./models/index");
const packageJSON = require("../../package.json");


const serviceActions = {
	actions: {
		updateMany(ctx) {
			return this.adapter.updateMany(ctx.params.query, ctx.params.update);
		},
		insertMany(ctx) {
			return this.adapter.insertMany(ctx.params.entities);
		},

		updateById(ctx) {
			return this.adapter.updateById(ctx.params.id, { $set: ctx.params.update });
		},

		removeById(ctx) {
			return this.adapter.removeById(ctx.params.id);
		},

		removeMany(ctx) {
			return this.adapter.removeMany(ctx.params.query);
		},

		removeAll(ctx) {
			return this.adapter.clear();
		}

	}
}

function CreateDBService(table) {
	
	if (Models[table] !== undefined)
		return {
				name: `DB_${table}s`,

				mixins: [
					DbService,
					serviceActions
				],
				adapter: new SqlAdapter(`${Config.dialect}://${Config.user}:${Config.password}@${Config.host}:${Config.port}/${Config.database}`),
				
				model: Models[table],
				created() {

					this.broker.metrics.register({ 
						type: "info", 
						name: "process.marionette.version", 
						description: "Marionette version", 
					});
			
					this.broker.metrics.set("process.marionette.version", packageJSON.version)
				}

			};

	else
		return undefined;
};



var DatabaseServices = [];

for (var item in Models){
	if (!Models[item].define.id)
		throw new Error(`Error: model of table '${item}' needs to have a field 'id' as a Primary Key.`);
	if (Models[item].define.id.primaryKey !== true)
		throw new Error(`Error: field 'id' of table '${item}' needs to be set as a Primary Key.`);

	DatabaseServices.push( CreateDBService(item) );
}



module.exports = DatabaseServices;
