module.exports = (sequelize, DataType) => {
var Education = sequelize.define("Education", {
    instiution: {
        type: DataType.STRING,
        allowNull: false
     },
     field: {
        type: DataType.STRING,
        allowNull: false
     },
     strtDate: {
        type: DataType.STRING,
        allowNull: false
     },
     endDate: {
        type: DataType.STRING,
        allowNull: false
     },
     strtDate: {
        type: DataType.INTEGER,
        allowNull: true
     }
  })
  return Education;
};