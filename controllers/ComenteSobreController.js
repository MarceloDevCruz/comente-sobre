const ComenteSobre = require('../models/ComenteSobre')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ComenteSobreController {

  static async showComenteSobre(req, res) {

    let search = ''

    if (req.query.search) search = req.query.search

    let order = 'DESC'

    req.query.order === 'old' ? (order = 'ASC') : (order = 'DESC')

    const comentesobre = await ComenteSobre.findAll({
      include: User,
      where: {
        [Op.or]: [{
          title: { [Op.like]: `%${search}%` }
        }, {
          commentary: {
            [Op.like]: `%${search}%`
          },
        }]
      }, order: [['createdAt', order]],
    })

    const date = comentesobre.map((result) => result.get({ plain: true }))

    let searchQtdResults = date.length

    res.render('comentesobre/home', { date, search, searchQtdResults })
  }

  static async showDashboard(req, res) {

    const userId = req.session.userid

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: ComenteSobre,
      plain: true,
    })

    if (!user) res.redirect('/login')

    const comentesobres = user.ComenteSobres.map((result) => result.dataValues)

    let isEmpty = false

    if (comentesobres.length === 0) isEmpty = true

    res.render('comentesobre/dashboard', { comentesobres, isEmpty })

  }

  static createComenteSobre(req, res) {
    res.render('comentesobre/create')
  }

  static async createComenteSobreSave(req, res) {

    const comentesobre = {
      title: req.body.title,
      commentary: req.body.commentary,
      UserId: req.session.userid,
    }

    try {

      await ComenteSobre.create(comentesobre)
      req.flash('success', 'Comentário criado com sucesso')

      req.session.save(() => {
        res.redirect('/comentesobre/dashboard')

      })
    } catch (err) {
      console.log(err)
    }
  }

  static async removeComenteSobre(req, res) {

    const id = req.body.id

    const UserId = req.session.userid

    try {
      await ComenteSobre.destroy({
        where: { id: id, Userid: UserId }
      })

      req.flash('success', 'Comentário removido com sucesso')

      req.session.save(() => {
        res.redirect('/comentesobre/dashboard')
      })
    } catch (err) {
      console.log(err)
    }

  }

  static async createComenteSobreUpdate(req, res) {
    const id = req.params.id

    const comentesobre = await ComenteSobre.findOne({
      where: { id: id }, raw: true
    })

    res.render('comentesobre/edit', { comentesobre })
  }

  static async createComenteSobreUpdateSave(req, res) {

    const id = req.body.id

    const comentesobre = {
      title: req.body.title,
      commentary: req.body.commentary
    }

    try {
      await ComenteSobre.update(comentesobre, { where: { id: id } })
      req.flash('success', 'Comentário atualizado com sucesso')

      req.session.save(() => {
        res.redirect('/comentesobre/dashboard')

      })
    } catch (err) {
      console.log(err)
    }
  }
}

