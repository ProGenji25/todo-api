const express = require(`express`);
const router = express.Router();

const Item = require(`../models/Item`);

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
});

// TODO: Write 4 more handlers for create, read, update, and delete

/**
 * POST: Creates a new item from the request body
 */
router.post(`/`, async (req, res) => {
	try {
		const item = new Item(req.body);
		item.UserId = req.user.Id
		if(!item.Text) throw Error("Missing text field.")
		if(!item.Date) throw Error("Missing text field.")
		var result = await item.save();
		res.status(201).send(result);
	} catch (error) {
		console.error(error);
		res.status(500).send(`Something went wrong.`)
	}
});

/**
 * GET: Returns all items in the collection
 */
router.get(`/`, async (req, res) => {
	try{
		var result = await Item.find({ UserId: req.user.Id}).exec(); // filter by UserId so that they all equal req.user.Id
		// mongoose Model.find() takes an object i.e. { UserId: req.user.Id }
		res.status(200).send(result);
	} catch (error) {
		console.error(error);
		res.status(500).send(`Something went wrong.`)
	}
});

/**
 * PUT: Return an item with the item's id specified in the path and updates the 'done' status
 */
router.put(`/:id`, async (req, res) => {
	try {
		var item = await Item.findById(req.params.id).exec();
		if (!item) { 
			res.status(404).send(`Item with ID ${req.params.id} does not exist.`)
		}
		else {
			console.log(item)
			item.set(req.body);
			console.log(item)
			var result = await item.save();
			console.log(result)
			res.status(200).send(result);
		}
	} catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
});

/**
 * DELETE: Deletes an item with the item's id specified in the path
 */
router.delete(`/:id`, async (req, res) => {
	try{
		var result = await Item.deleteOne({ _id: req.params.id }).exec();
		if(result.deletedCount === 0) {
			res.status(404).send(`Item with ID ${req.params.id} does not exist.`);
		}
		else {
		console.log(result)
		res.status(200).send(result);
		}
	} catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
});

module.exports = router;
