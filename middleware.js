const Listing = require('./models/listing');
const Review = require('./models/review.js');
const { listingSchema, reviewSchema } = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL they were trying to access
        req.flash('error', 'You must be signed in to do that!');
        return res.redirect('/users/login');
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.clearRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        delete req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params; let listing = await Listing.findById(id);
     if(!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
     }
    next();
}

module.exports.validateListing = async (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map(el => el.message).join(', ');
        return next(new ExpressError(400, errorMessage)); // pass to error handler
    }
    next();
}

module.exports.validateReview = async (req, res, next) => {
     let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map(el => el.message).join(', ');
        return next(new ExpressError(400, errorMessage));
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
     if(!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
     }
    next();
}