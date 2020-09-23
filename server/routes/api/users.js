const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { checkAuthentication, checkAdmin } = require("./auth");

// Get a specific user
router.get("/:username", checkAuthentication, async (req, res) => {
	
	const userQueryExists = await User.exists({
		username: req.params.username,
	});
	// If the user queried does not exists in the database => 403
	if (!userQueryExists) return res.status(403).send("User does not exists");
	try {
		const userClient = await req.user;
		const userQuery = await User.findOne({ username: req.params.username });
		// If the client user is not the same as the user queried => 403
		if (userClient.email !== userQuery.email)
			return res.status(403).send("User not allowed");
		return res.send(userQuery)

	} catch (err) {
		return res.send(err);
	}
});

// Get all users
router.get("/", checkAdmin, async (req, res) => {
	try {
		const users = await User.find().select("username");
		return res.send(users);
	} catch (err) {
		console.log(err);
		return res.send(err);
	}
});

// Delete a user
router.delete("/:id", checkAdmin, async (req, res) => {
	const filter = { _id: req.params.id };
	try {
		await User.deleteOne(filter);
		return res.send("sucessfully deleted");
	} catch (err) {
		res.status(418).send(err);
	}
});

module.exports = router;
