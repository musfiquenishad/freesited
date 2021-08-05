const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customId = require("custom-id");

const { response } = require("express");
require("dotenv").config();

const Schema = mongoose.Schema;
const app = express();
const port = 5000;

//......................................Body persing Middleware................................//
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
//......................................Body persing Middleware Ends...........................//

//......................................Mongoose connection.......................................//
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((result) => {
		console.log(chalk.black.bgYellow("Database connected"));
	})
	.catch((error) => {
		console.log(error);
	});

//..................................Mongoose Connection End.......................................//
//..............................Check for authorization middleware................................//
function isAuthorized(req, res, next) {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({ msg: "You are not authorized" });
		}

		try {
			let decoded = jwt.verify(token, process.env.JWT_KEY);

			next();
		} catch (error) {
			return res.status(401).json({ msg: "You are not authorized" });
		}
	} else {
		return res.status(401).json({ msg: "You are not authorized" });
	}
}
//...........................Check for authorization middleware End............................//

//User Schema
const userSchema = new Schema({
	fullname: { type: String, required: true },

	email: { type: String, required: true },

	password: { type: String, required: true },

	urls: [{ type: Schema.Types.ObjectId, ref: "Urls" }],
});
//User Model
const User = mongoose.model("User", userSchema);

//REVIEW
//signup route
app.post("/api/users/signup", async (req, res) => {
	const { fullname, email, password } = req.body;
	try {
		hashedPassword = await bcrypt.hash(password, 10);
	} catch (error) {
		res.status(500).json(error.message);
		return;
	}

	User.findOne({ email }, (error, user) => {
		if (error) {
			res.status(500).json({ error: error.message });
		} else if (user) {
			res
				.status(409)
				.json({ msg: "User already exist with that email address" });
		} else {
			const user = new User({
				fullname,
				email,
				password: hashedPassword,
				urls: [],
			});

			user
				.save()
				.then((success) => {
					const token = jwt.sign(
						{ userId: success.id, email: email },
						process.env.JWT_KEY,
						{
							expiresIn: "7d",
						}
					);

					res.status(201).json({
						authorized: true,
						msg: "User successfully signed up",
						token,
					});
				})
				.catch((error) => {
					res.status(500);
				});
		}
	});
});

//REVIEW
//signin route
app.post("/api/users/signin", (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email }, (error, user) => {
		if (error) {
			res.status(500).json(error.message);
		} else if (user) {
			bcrypt.compare(password, user.password, (error, success) => {
				if (error) {
					res.status(500).json(error.message);
				} else if (success) {
					const token = jwt.sign(
						{ userId: user.id, email: email },
						process.env.JWT_KEY,
						{
							expiresIn: "7d",
						}
					);

					res.json({
						authorized: true,
						msg: "User SignedIn successfully",
						token,
					});
				} else if (!success) {
					res
						.status(401)
						.json({ authorized: false, msg: "Incorrect credantials" });
				}
			});
		} else {
			res
				.status(401)
				.json({ authorized: false, msg: "Incorrect email address" });
		}
	});
});

//urls schema
const urlsSchema = new Schema(
	{
		url: { type: String, required: true },
		short: { type: String, required: true },
		clicks: { type: Number, required: true },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

const Urls = new mongoose.model("Urls", urlsSchema);

app.post("/api/users/urls", isAuthorized, (req, res) => {
	const { userId } = jwt.verify(
		req.headers.authorization.split(" ")[1],
		process.env.JWT_KEY
	);

	User.findOne({ _id: userId }, (error, user) => {
		if (error) {
			res.status(500).json({ msg: "User doesn't exist in our database" });
		} else if (!user) {
			res.status(404).json({ msg: "User not found" });
		}
	});

	const urls = new Urls({
		url: req.body.url,
		short: customId({}),
		clicks: 0,
		author: userId,
	});
	urls.save((error, url) => {
		if (error) {
			res.status(500).json({ msg: error.message });
		} else {
			User.findOneAndUpdate(
				{ _id: userId },
				{ $addToSet: { urls: url.id } },
				(error, user) => {
					if (error) {
						res.status(500).json({ msg: error.message });
					} else {
						res.status(201).json({ mgs: "Url added successfully", url });
					}
				}
			);
		}
	});
});

//get urls by user id
app.get("/api/users/urls", isAuthorized, (req, res) => {
	const { userId } = jwt.verify(
		req.headers.authorization.split(" ")[1],
		process.env.JWT_KEY
	);

	Urls.find({ author: userId }, (error, urls) => {
		if (error) {
			res.status(500);
		} else if (urls) {
			res.send(urls);
		}
	});
});

//get urls by short id
app.get("/api/users/urls/:id", (req, res) => {
	Urls.find({ short: req.params.id }, (error, urls) => {
		if (urls) {
			res.send(urls);
		} else {
			res.status(404).json({ error: "url not found" });
		}
	});
});

app.delete("/api/users/urls/:id", isAuthorized, (req, res) => {
	const { userId, email } = jwt.verify(
		req.headers.authorization.split(" ")[1],
		process.env.JWT_KEY
	);

	User.findOneAndUpdate({ _id: userId }, { $pull: { urls: req.params.id } })
		.then((user) => {
			Urls.findByIdAndDelete({ _id: req.params.id }, (error, success) => {
				if (error) {
					res.status(500).json({ msg: error.message });
				} else if (success) {
					res.send("Successfully deleted the url");
				}
			});
		})
		.catch((error) => {
			res.status(500).json({ msg: "Something went wrong while deleting" });
		});
});
//.........................................Check email availability .......................//
app.post("/api/users", (req, res) => {
	User.findOne({ email: req.query.email }, (error, user) => {
		if (error) {
			res.status(500).send(error);
		} else if (user) {
			res.json({
				available: false,
				msg: "An user is already registered with that email address please use another one",
			});
		} else {
			res.json({
				available: true,
				msg: "email is available you can use this email",
			});
		}
	});
});

//........................................server starts............................................//
app.listen(port, () => {
	console.log(chalk.black.bgGreen(`App listening at port ${port}`));
});
//.........................................server Ends............................................//
