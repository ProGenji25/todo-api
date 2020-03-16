const router = require(`express`).Router()
const { getUserFromAzure } = require(`../util`)

router.get(`/`, async (req, res) => {
	try {
		const { Email } = req.user
		const user = await getUserFromAzure(Email)
		res.status(200).send(user)
	} catch (error) {
		console.error(error)
		res.status(500).send(`There was a problem getting the user.`)
	}
})

module.exports = router
