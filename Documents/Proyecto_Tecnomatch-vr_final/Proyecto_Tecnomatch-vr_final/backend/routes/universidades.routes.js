const express = require("express");
const router = express.Router();

// GET todas las universidades
router.get("/", (req, res) => {
  const db = req.app.locals.db;

  db.query("SELECT * FROM universidades", (err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true, universidades: results });
  });
});

module.exports = router;
