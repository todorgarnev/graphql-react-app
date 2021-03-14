const usersResolvers = require("./users");
const postsResolvers = require("./posts");
const commentsResolver = require("./comments");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolver.Mutation
  }
};
