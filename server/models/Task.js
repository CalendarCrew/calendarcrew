module.exports = (sequelize,DataTypes)=>{
  const Task = sequelize.define("Task", {
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
    },
    ID: {
        type:DataTypes.ID,
        allowNull: false,
    }
  });

  return Task;
};