const usersResolvers = require("./users");
const postsResolvers = require("./posts");
const commentsResolver = require("./comments");

module.exports = {
  Post: {
    likesCount: parent => parent.likes.length,
    commentsCount: parent => parent.comments.length
  },
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolver.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
};
