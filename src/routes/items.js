const express = require(`express`)
const router = express.Router()

const Item = require(`../models/Item`)

/**
 * GET: Returns one item with the item's id specified in the path
 */
router.get(`/:id`, async (req, res) => {
	try {
		const item = await Item.findById(req.params.id)
		if (!item) res.status(404).send(`Item with ID ${req.params.id} does not exist.`)
		else res.status(200).send(item)
	} catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
})

// TODO: Write 4 more handlers for create, read, update, and delete

module.exports = router
