const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService  = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
  async registration(email, password) {
    //проверяем, нет ли уже такого email в базе данных
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      //пробрасываем ошибку, которая будет обрабатываться в контроллере
      throw new Error(`Пользователь с таким ${email} уже существует`)
    }
    //создаем пользователя, если условие не выполнилось
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({email, password: hashPassword, activationLink});
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user); //id, email, isActivated
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }
}

module.exports = new UserService();