const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customId = require("custom-id");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const Schema = mongoose.Schema;
const app = express();
const port = process.env.PORT || 5000;

//......................................Body persing Middleware................................//
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
//......................................Body persing Middleware Ends...........................//

//......................................Mongoose connection.......................................//
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
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
	if (req.cookies.token) {
		// const token = req.headers.authorization.split(" ")[1];
		const token = req.cookies.token;
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
//.............................................signup route........................................//
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
						process.env.JWT_KEY
					);

					res
						.cookie("token", token, {
							sameSite: "strict",
							httpOnly: true,
							secure: true,
							expires: new Date(Date.now() + 31556952000),
						})
						.json({
							name: success.fullname,
							userId: success._id,
							authorized: true,
							msg: "User successfully signed up",
						});
				})
				.catch((error) => {
					res.status(500);
				});
		}
	});
});

//REVIEW
//..............................................signin route.........................................//
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
						process.env.JWT_KEY
					);
					res
						.cookie("token", token, {
							sameSite: "strict",
							httpOnly: true,
							secure: true,
							expires: new Date(Date.now() + 31556952000),
						})
						.json({
							name: user.fullname,
							userId: user._id,
							authorized: true,
							msg: "User SignedIn successfully",
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

app.post("/api/users/signout", (req, res) => {
	res
		.cookie("token", "", {
			sameSite: "strict",
			httpOnly: true,
			secure: true,
			expires: new Date(Date.now() + 1),
		})
		.json({ signedout: true, msg: "User Loged out!" });
});
//....................................Check Auth...................................//
app.get("/api/users/checkauth", (req, res) => {
	if (req.cookies.token) {
		const token = req.cookies.token;
		if (!token) {
			return res
				.status(401)
				.json({ authorized: false, msg: "You are not authorized" });
		}

		try {
			let decoded = jwt.verify(token, process.env.JWT_KEY);

			return res.json({ authorized: true });
		} catch (error) {
			return res
				.status(401)
				.json({ authorized: false, msg: "You are not authorized" });
		}
	} else {
		return res
			.status(401)
			.json({ authorized: false, msg: "You are not authorized" });
	}
});

//...................................Check Email Availablity........................//
app.get("/api/users", (req, res) => {
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
//.........................................Check email availability .......................//

//urls schema
const urlsSchema = new Schema(
	{
		longUrl: { type: String, required: true },
		shortUrl: { type: String, unique: true, required: true },
		clicks: { type: Number, required: true },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);
//urls model
const Urls = new mongoose.model("Urls", urlsSchema);

//................................Create Url........................................//
app.post("/api/users/urls/create-url", isAuthorized, (req, res) => {
	const { userId } = jwt.verify(req.cookies.token, process.env.JWT_KEY);

	User.findOne({ _id: userId }, (error, user) => {
		if (error) {
			return res
				.status(500)
				.json({ msg: "User doesn't exist in our database" });
		} else if (!user) {
			return res.status(404).json({ msg: "User not found" });
		} else {
			const urls = new Urls({
				longUrl: req.body.longUrl,
				shortUrl: customId({ randomLength: 1 }),
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
		}
	});
});

//.......................................Get all urls......................................//
app.get("/api/users/urls", isAuthorized, (req, res) => {
	const { userId } = jwt.verify(req.cookies.token, process.env.JWT_KEY);
	let { page, size } = req.query;
	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 20;
	}
	const limit = parseInt(size);
	const skip = (page - 1) * size;
	Urls.find({ author: userId })
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(skip)
		.then((urls) => {
			res.send(urls);
		})
		.catch((error) => {
			res.status(500).json({ msg: error.message });
		});
});

//.....................................Get Individual Url (protected) for qr code
app.get("/api/urls/:id", isAuthorized, (req, res) => {
	Urls.find({ _id: req.params.id }, (error, urls) => {
		if (urls) {
			res.send(urls);
		} else if (error) {
			res.status(500).json({ msg: error.message });
		} else {
			res.status(404).json({ error: "url not found" });
		}
	});
});

//...............................Get shortUrls for redirection (public).............//
app.get("/api/users/urls/redirect/:shortid", async (req, res) => {
	Urls.findOne({ shortUrl: req.params.shortid })
		.then((url) => {
			url.clicks++;
			url.save();
			res.send(url);
		})
		.catch((error) => {
			res.status(404).json({ msg: "nothing found with that short url" });
		});
});

//.......................................Edit Url alias.....................................//
//check alias availability
app.get("/api/aliasavailablity/:alias", (req, res) => {
	Urls.findOne({ shortUrl: req.params.alias }, (error, user) => {
		if (error) {
			res.status(500).send(error);
		} else if (user) {
			res.json({
				available: false,
				msg: "Url alias is unavailable, Please use something else",
			});
		} else {
			res.json({
				available: true,
				msg: "url alias is available you can use this",
			});
		}
	});
});

app.put("/api/users/urls/:id", isAuthorized, (req, res) => {
	const { userId, email } = jwt.verify(req.cookies.token, process.env.JWT_KEY);

	Urls.findOneAndUpdate({ _id: req.params.id }, { shortUrl: req.body.alias })
		.then((urls) => {
			res.status(200).json({ msg: "Urls alias changed successfully" });
		})
		.catch((error) => {
			res.status(500).json({ msg: error.message });
		});
});

//......................................Delete Url.............................................//
app.delete("/api/users/urls/:id", isAuthorized, (req, res) => {
	const { userId, email } = jwt.verify(req.cookies.token, process.env.JWT_KEY);

	User.findOneAndUpdate({ _id: userId }, { $pull: { urls: req.params.id } })
		.then((user) => {
			Urls.findByIdAndDelete({ _id: req.params.id }, (error, url) => {
				if (error) {
					res.status(500).json({ msg: error.message });
				} else if (url) {
					res.status(201).json({ msg: "Successfully deleted the url", url });
				}
			});
		})
		.catch((error) => {
			res.status(500).json({ msg: "Something went wrong while deleting" });
		});
});

//..................................Production Setup.......................................//

// Production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}
//........................................server starts............................................//
app.listen(port, () => {
	console.log(chalk.black.bgGreen(`App listening at port ${port}`));
});
//.........................................server Ends............................................//
