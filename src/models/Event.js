module.exports = (sequelize,DataTypes)=>{
  const Event = sequelize.define("Event", {
    title: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type:DataTypes.STRING,
        defaultValue: Date.now().toString(),
        allowNull: false,
    },
    description: {
        type:DataTypes.STRING,
    },/*
    id: {
        type:DataTypes.ID,
        allowNull: false,
    }
    */
  });

  return Event;
};