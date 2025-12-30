const express = require("express");
const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET PROFILE (Public)
router.get("/", async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// UPDATE PROFILE (Admin)
router.post("/", authMiddleware, async (req, res) => {
  const data = req.body;
  let profile = await Profile.findOne();

  if (profile) {
    profile = await Profile.findByIdAndUpdate(profile._id, data, { new: true });
  } else {
    profile = await Profile.create(data);
  }

  res.json({ message: "Profile saved", profile });
});

module.exports = router;
