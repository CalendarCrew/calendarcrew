module.exports = (sequelize,DataTypes)=>{
    const Birthday = sequelize.define("Birthday", {
      name: {
          type:DataTypes.STRING,
          allowNull: false,
      },
      date: {
          type:DataTypes.STRING,
          defaultValue: Date.now().toString(),
          allowNull: false,
      },
      ID: {
          type:DataTypes.ID,
          allowNull: false,
      }
    });
  
    return Birthday;
  };