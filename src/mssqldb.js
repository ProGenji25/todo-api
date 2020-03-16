 /**
 *
 *
 *
 *
 *
 *
 * Yet another file that you probz shouldn't touch.
 * TBH it's already past midnight and I need this
 * to be ready by tomorrow morning at 9am so I'm not
 * going to be super detailed about what's happening
 * in this file. It's basically doing what you do
 * in mongoose.js, but for the Azure SQL database.
 *
 *
 *
 *
 *
 *
 *
 */

const { Connection } = require(`tedious`)

const mssqldb = new Connection({
	authentication: {
		options: {
			userName: process.env.AZURE_DB_ADMIN_USERNAME,
			password: process.env.AZURE_DB_ADMIN_PASSWORD,
		},
		type: "default"
	},
	server: process.env.AZURE_SERVER_NAME,
	options: {
		database: process.env.AZURE_DB_NAME,
		encrypt: true
	}
})

mssqldb.on(`connect`, err => {
	if (err) console.error(err.message)
	else console.log(`User Database Connected`)
})

mssqldb.on(`error`, err => {
	if (err) console.error(err.message)
})

module.exports = mssqldb
