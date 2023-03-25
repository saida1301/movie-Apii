const express = require('express');

const reviewController = require('../controllers/review.controller');
const {body} = require('express-validator');
const requestHandler = require("../handlers/requestHandler");
const tokenService = require("../services/token.service");
const {verifyToken} = tokenService;

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    reviewController.getReviewsOfUser
  );

router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("rating").notEmpty().withMessage("Rating is required"),
    ],

);

router.delete(
    "/:reviewId",
    requestHandler.validateParamsId,
    reviewController.remove
);

module.exports = router;
