const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Witaj na stronie festiwali muzycznych!' });
});

router.get('/:id', (req, res) => {
  const festivalId = req.params.id;
  res.json({ message: `Szczegóły festiwalu o ID ${festivalId}` });
});

module.exports = router;
