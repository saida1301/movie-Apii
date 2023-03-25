const favoriteModel = require("../../models/favorite.model");
const responseHandler = require("../../handlers/response.handler");
const addFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            movieId: req.body.movieId
          });
      
          if (isFavorite) return responseHandler.ok(res, isFavorite);
      
          const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
          });
      
          await favorite.save();
      
          responseHandler.created(res, favorite);
    } catch (error) {
      responseHandler.error(res);
    }
};
const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId
    });

    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesOfUser
};