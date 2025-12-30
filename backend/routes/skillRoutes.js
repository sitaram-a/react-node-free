const express = require("express");
const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔵 GET ALL SKILLS (PUBLIC)
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// 🟢 ADD SKILL (ADMIN)
router.post("/", authMiddleware, async (req, res) => {
  const skill = await Skill.create(req.body);
  res.json(skill);
});

// 🔴 DELETE SKILL
router.delete("/:id", authMiddleware, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill deleted" });
});

module.exports = router;
