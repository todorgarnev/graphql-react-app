const usersTypeDefs = require("./users");
const { gql } = require("apollo-server");

module.exports = gql`
  ${usersTypeDefs}
`;
