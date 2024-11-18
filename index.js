const sequelize = require('./db/connection');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Like);
Like.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
