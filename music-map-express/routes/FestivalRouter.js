const express = require('express')
const DbManager = require('../utils/DbManager')

class FestivalRouter {
  constructor () {
    this.db = new DbManager()
    this.router = express.Router()
    this.initializeRoutes()
  }

  initializeRoutes () {
    this.router.get('/dateRange', this.getFestivalsWithinDateRange.bind(this))
  }

  /**
   * @swagger
   * /api/festival/dateRange:
   *   get:
   *     summary: Retruns festival list based on date range.
   *     parameters:
   *       - in: query
   *         name: startDate
   *         required: true
   *         description: Start date.
   *         schema:
   *           type: string
   *           format: date
   *         example: "2024-01-01"
   *       - in: query
   *         name: endDate
   *         required: true
   *         description: End date.
   *         schema:
   *           type: string
   *           format: date
   *         example: "2024-12-01"
   *     responses:
   *       200:
   *         description: Festivals in given data range
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  message:
   *                    type: string
   *                  festivals:
   *                     type: array
   *                     items:
   *                       $ref: '#/components/schemas/Festival'
   *
   * components:
   *   schemas:
   *     Festival:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: Festival id
   *         name:
   *           type: string
   *           description: Festival name
   *         latitude:
   *           type: number
   *           format: float
   *           description: Latitude of festival
   *         longitude:
   *           type: number
   *           format: float
   *           description: Longitude of festival
   *         start_date:
   *           type: string
   *           format: date
   *           description: Festival start date
   *         end_date:
   *           type: string
   *           format: date
   *           description: Festival end date
   *
   */

  async getFestivalsWithinDateRange (req, res) {
    const { startDate, endDate } = req.query

    const festivals = await this.db.getFestivalsByDateRange(startDate, endDate)

    res.json({ message: 'success', festivals: festivals })
  }
}

module.exports = FestivalRouter
