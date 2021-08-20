const userService = require('../service/user-service');

class UserController {
  async registration(request, response, next) {
    try {
      const {email, password} = request.body;
      const userData = await userService.registration(email, password);

      return response.json(userData);
    } catch (e) {
        console.log(e)
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async activate(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async getUsers(req, res, next) {
    console.log("getUsers")
    try {
      res.json(['asdfasdfasdf'])
    } catch (e) {

    }
  }
}

module.exports = new UserController();