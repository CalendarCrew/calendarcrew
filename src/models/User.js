module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User", {
        userId:{
            type:DataTypes.STRING ,
            defaultValue: Date.now().toString(),
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            isEmail: true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
            allowNull:false
        }
    });
    User.associate = (models)=>{
        User.hasMany(models.People, {
            onDelete: 'cascade',
            foreignKey:'userId',
            as:"Author"
        })
    }
  return User
};