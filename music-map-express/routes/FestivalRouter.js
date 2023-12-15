const express = require('express');

class FestivalRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getFestivalApi.bind(this));
    this.router.get('/:id', this.getFestivalDetails.bind(this));
  }

  async getFestivalApi(req, res) {
    res.json({ message: 'FestivalApi' });
  }

  async getFestivalDetails(req, res) {
    const festivalId = req.params.id;
    res.json({ message: `Szczegóły festiwalu o ID ${festivalId}` });
  }
}

module.exports = FestivalRouter;
