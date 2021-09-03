# GraphQL schema example
#
# https://gqlgen.com/getting-started/
type Query {
  workdatainfo: WorkDataInfo!
  review(id: Int): [Review!]
  newreview: [Review!]
  topcompany: [Company!]
  company(name: String): [Company!]
}

type Company {
  name: String!
  max: Int!
  min: Int! 
  count: Int!
  workdata: [WorkData!]
  review: [Review!]
}

type WorkData {
  id: ID!
  create_data_js: String
  detail: String
  experience: String
  is_show: Boolean
  name: String!
  salary: Int!
  term: String
  type: String
  workdays: String
  workType: String
}

type Review {
  id: ID!
  company_name: String
  detail: String
  content: String
  create_data_js: String
  link: String
  reasons: String
  report: String
  skill: String
  user_name: String
}

type WorkDataInfo {
  company_count: Int!
  avarage: Int!
  count: Int!
  mid: Int!
  workdata: [WorkData!]
}


input NewWorkData {
  create_data_js: String
  detail: String
  experience: String
  is_show: Boolean
  name: String
  salary: Int!
  term: String
  type: String
  workdays: String
  workType: String
}

input NewReview {
  company_name: String!
  content: String
  create_data_js: String
  link: String
  reasons: String
  report: String!
  skill: String
  user_name: String 
}

type Mutation {
  createWorkData(input: NewWorkData!): WorkData!
  createReview(input: NewReview!): Review!
}