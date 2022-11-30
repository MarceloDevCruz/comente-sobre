const User = require('../models/User')
const validator = require('validator')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {

    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      req.flash('message', 'Usuário não encontrado!')
      res.render('auth/login')

      return
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      req.flash('message', 'Senha inválida')
      res.render('auth/login')

      return
    }

    req.session.userid = user.id

    req.flash('success', 'Login feito com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {

    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      req.flash('message', 'As senhas não são iguais')
      res.render('auth/register')

      return
    }

    if (!validator.isEmail(email)) {
      req.flash('message', 'Digite um email válido!')
      res.render('auth/register')

      return
    }

    const checkEmail = await User.findOne({ where: { email: email } })

    if (checkEmail) {
      req.flash('message', 'Usuário já cadastrado')
      res.render('auth/register')

      return
    }

    if (!name.length > 4) {
      req.flash('message', 'Nome deve ter pelo menos 4 letras')
      res.render('auth/register')

      return
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      password: hashedPassword
    }

    try {

      const createdUser = await User.create(user)

      req.session.userid = createdUser.id

      req.flash('success', 'Cadastro realizado com sucesso!')

      req.session.save(() => {
        res.redirect('/')
      })

    } catch (err) {

      console.log(err)
    }

  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }

}
