const sequelize = require('../db/connection');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

describe('Sequelize Models', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a User', async () => {
    const user = await User.create({ username: 'testuser', email: 'testuser@example.com' });
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('testuser@example.com');
  });

  it('should create a Profile and associate with User', async () => {
    const user = await User.create({ username: 'profileuser', email: 'profileuser@example.com' });
    const profile = await Profile.create({
      bio: 'This is a bio',
      profilePicture: 'profilepic.jpg',
      birthday: '1990-01-01',
    });
    await user.setProfile(profile);
    const userWithProfile = await User.findOne({ where: { id: user.id }, include: Profile });
    expect(userWithProfile.Profile.bio).toBe('This is a bio');
  });

  it('should create a Post and associate with User', async () => {
    const user = await User.create({ username: 'postuser', email: 'postuser@example.com' });
    const post = await Post.create({
      title: 'Post Title',
      body: 'This is the body of the post',
      createdAt: '2024-01-01',
    });
    await user.addPost(post);
    const userWithPosts = await User.findOne({ where: { id: user.id }, include: Post });
    expect(userWithPosts.Posts.length).toBe(1);
    expect(userWithPosts.Posts[0].title).toBe('Post Title');
  });

  it('should create a Comment and associate with Post', async () => {
    const post = await Post.create({ title: 'Commented Post', body: 'This is a commentable post', createdAt: '2024-01-01' });
    const comment = await Comment.create({ body: 'This is a comment', createdAt: '2024-01-01' });
    await post.addComment(comment);
    const postWithComments = await Post.findOne({ where: { id: post.id }, include: Comment });
    expect(postWithComments.Comments.length).toBe(1);
    expect(postWithComments.Comments[0].body).toBe('This is a comment');
  });

  it('should create a Like and associate with User', async () => {
    const user = await User.create({ username: 'liker', email: 'liker@example.com' });
    const like = await Like.create({ reactionType: 'like', createdAt: '2024-01-01' });
    await user.addLike(like);
    const userWithLikes = await User.findOne({ where: { id: user.id }, include: Like });
    expect(userWithLikes.Likes.length).toBe(1);
    expect(userWithLikes.Likes[0].reactionType).toBe('like');
  });
});
