const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const Client = require("../models/Client");

// @route     GET /role/:id
// @desc      Get the role of the user
// @access    Private
router.get("/role/:id", async (req, res) => {
  try {
    let user = await Admin.findById(req.params.id).select("-password");
    if (!user) {
      user = await Client.findById(req.params.id).select("-password");
      return res.json("Client");
    }
    return res.json("Admin");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
