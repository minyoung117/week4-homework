'use strict';
const {
  Model
} = require('sequelize');
//const like = require('../migrations/like');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  likes.init({
    likeId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      },
    
    postId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
          
    
    
  },
   {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};