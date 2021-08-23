const userService = require('../service/user-service');

class UserController {
  async registration(request, response, next) {
    try {
      const {email, password} = request.body;
      const userData = await userService.registration(email, password);
      response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return response.json(userData);
    } catch (e) {
      //если в next попадает ApiError, он будет обработан по-нашему. Вызывая next, мы попадаем в наш error-middleware
        next(e);
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {
        next(e);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
        next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
        next(e);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
        next(e);
    }
  }

  async getUsers(req, res, next) {
    console.log("getUsers")
    try {
      res.json(['asdfasdfasdf'])
    } catch (e) {
        next(e);
    }
  }
}

module.exports = new UserController();