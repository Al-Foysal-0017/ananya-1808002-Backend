// const formidable = require('formidable');
// const { v4: uuidv4 } = require('uuid');
// const { body, validationResult } = require('express-validator');
// const { htmlToText } = require('html-to-text');
// const fs = require('fs');

const Place = require("../models/Place");
// const CommentSchema = require('../models/Comment');

module.exports.createPlace = async (req, res) => {
  const { place } = req.body;
  console.log(place);

  try {
    const checkPlace = await Place.findOne({ place });
    if (checkPlace) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This place is already taken" }] });
    }
    let lowerCasePlace = place.toLowerCase();
    try {
      await Place.create({
        place: lowerCasePlace,
      });
      return res
        .status(200)
        .json({ msg: "Place has been added successfully." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
module.exports.getPlaces = async (req, res) => {
  try {
    const count = await Place.find({}).countDocuments();
    const places = await Place.find({});
    // .sort({ updatedAt: -1 });
    return res.status(200).json({ response: places, count });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
// module.exports.getPlaces = async (req, res) => {
// 	try {
// 		const count = await Post.find({ userId: id }).countDocuments();
// 		const response = await Post.find({ userId: id })
// 			.skip(skip)
// 			.limit(perPage)
// 			.sort({ updatedAt: -1 });
// 		return res.status(200).json({ response: response, count, perPage });
// 	} catch (error) {
// 		return res.status(500).json({ errors: error, msg: error.message });
// 	}
// };
// module.exports.fetchPost = async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const post = await Post.findOne({ _id: id });
// 		return res.status(200).json({ post });
// 	} catch (error) {
// 		console.log(error.message);
// 		return res.status(500).json({ errors: error, msg: error.message });
// 	}
// };
// module.exports.updateValidations = [
// 	body('title').notEmpty().trim().withMessage('Title is required'),
// 	body('body')
// 		.notEmpty()
// 		.trim()
// 		.custom((value) => {
// 			let bodyValue = value.replace(/\n/g, '');
// 			if (htmlToText(bodyValue).trim().length === 0) {
// 				return false;
// 			} else {
// 				return true;
// 			}
// 		})
// 		.withMessage('Body is required'),
// 	body('description').notEmpty().trim().withMessage('Description is required'),
// ];
// module.exports.updatePost = async (req, res) => {
// 	const { title, body, description, id } = req.body;
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ errors: errors.array() });
// 	} else {
// 		try {
// 			const response = await Post.findByIdAndUpdate(id, {
// 				title,
// 				body,
// 				description,
// 			});
// 			return res.status(200).json({ msg: 'Your post has been updated' });
// 		} catch (error) {
// 			return res.status(500).json({ errors: error, msg: error.message });
// 		}
// 	}
// };
// module.exports.updateImage = (req, res) => {
// 	const form = formidable({ multiples: true });
// 	form.parse(req, (errors, fields, files) => {
// 		const { id } = fields;
// 		const imageErrors = [];
// 		if (Object.keys(files).length === 0) {
// 			imageErrors.push({ msg: 'Please choose image' });
// 		} else {
// 			const { type } = files.image;
// 			const split = type.split('/');
// 			const extension = split[1].toLowerCase();
// 			if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
// 				imageErrors.push({ msg: `${extension} is not a valid extension` });
// 			} else {
// 				files.image.name = uuidv4() + '.' + extension;
// 			}
// 		}
// 		if (imageErrors.length !== 0) {
// 			return res.status(400).json({ errors: imageErrors });
// 		} else {
// 			const newPath = __dirname + `/../client/build/images/${files.image.name}`;
// 			fs.copyFile(files.image.path, newPath, async (error) => {
// 				if (!error) {
// 					try {
// 						const response = await Post.findByIdAndUpdate(id, {
// 							image: files.image.name,
// 						});
// 						return res.status(200).json({ msg: 'Your image has been updated' });
// 					} catch (error) {
// 						return res.status(500).json({ errors: error, msg: error.message });
// 					}
// 				}
// 			});
// 		}
// 	});
// };
// module.exports.deletePost = async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const response = await Post.findByIdAndRemove(id);
// 		return res.status(200).json({ msg: 'Your post has been deleted' });
// 	} catch (error) {
// 		return res.status(500).json({ errors: error, msg: error.message });
// 	}
// };

// module.exports.postDetails = async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const post = await Post.findOne({ slug: id });
// 		const comments = await CommentSchema.find({ postId: post._id }).sort({
// 			updatedAt: -1,
// 		});
// 		return res.status(200).json({ post, comments });
// 	} catch (error) {
// 		return res.status(500).json({ errors: error, msg: error.message });
// 	}
// };
// module.exports.postComment = async (req, res) => {
// 	const { id, comment, userName } = req.body;
// 	console.log(req.body);
// 	try {
// 		const response = await CommentSchema.create({
// 			postId: id,
// 			comment,
// 			userName,
// 		});
// 		return res.status(200).json({ msg: 'Your comment has been published' });
// 	} catch (error) {
// 		return res.status(500).json({ errors: error, msg: error.message });
// 	}
// };
