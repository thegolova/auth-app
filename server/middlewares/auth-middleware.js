const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    // если не указан header {key: Authorization, value: Bearer + refreshToken}
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return  next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    //если у нас все хорошо и токен валидный, то в поле user у request мы помещаем данные пользователя,
    //которые вытащили из токена
    req.user = userData;
    next();

  } catch (e) {
      return next(ApiError.UnauthorizedError());
  }
}