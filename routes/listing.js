const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const listingController = require('../controllers/listings.js');
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1501785888041-af3ef285b470";
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudconfig.js');
const upload = multer({ storage });
router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing,upload.single("listing[image]"), wrapAsync(listingController.createListing));
    
//new route
router.get('/new', isLoggedIn, wrapAsync(listingController.renderNewform));

// show route, update route, delete route
router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateListing,upload.single("listing[image]"), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditform));

module.exports = router;