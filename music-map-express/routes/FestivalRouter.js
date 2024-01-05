const express = require('express')
const DbManager = require('../utils/DbManager')

class FestivalRouter {
  constructor () {
    this.db = new DbManager()
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes () {
    this.router.get('/', this.getFestivalApi.bind(this))
    this.router.get('/id:id', this.getFestivalDetails.bind(this))
    this.router.get('/dateRange', this.getFestivalsWithinDateRange.bind(this))
  }

  async getFestivalApi (req, res) {
    res.json({ message: 'FestivalApi' })
  }

  async getFestivalDetails (req, res) {
    const festivalId = req.params.id
    res.json({ message: `Szczegóły festiwalu o ID ${festivalId}` })
  }
  async getFestivalsWithinDateRange (req, res) {
    const { startDate, endDate } = req.query

    const festivals = await this.db.getFestivalsByDateRange(startDate, endDate)

    res.json({ message: 'success', festivals: festivals })
  }
}

module.exports = FestivalRouter
