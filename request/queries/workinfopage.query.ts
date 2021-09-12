import { gql } from "@apollo/client";
import { company } from "../../types/type";

export const WORKINFOTOPPAGE_QUERY = gql`
  query {
    company {
      max
      min
      count
      name
      workdata {
        salary
        name
        workType
      }
    }
  }
`;

export interface WORKINFOTOPPAGE_QUERY_DATA {
  company: company[] | undefined;
}

export const WORKINFOPAGE_QUERY = gql`
  query Company($name: String) {
    company(name: $name) {
      max
      min
      count
      name
      workdata {
        id
        salary
        name
        detail
        workType
        experience
        is_show
        term
        type
        workdays
        workType
        create_data_js
      }
      review {
        id
        company_name
        detail
        content
        create_data_js
        link
        reasons
        report
        skill
        user_name
      }
    }
  }
`;

export interface WORKINFOPAGE_QUERY_DATA {
  company: company[] | undefined;
}

export const CREATE_WORKDATA = gql`
  mutation createWorkData(
    $name: String!
    $salary: Int!
    $experience: String
    $detail: String
    $term: String
    $workType: String
    $type: String
    $workdays: String
  ) {
    createWorkData(
      input: {
        name: $name
        salary: $salary
        experience: $experience
        detail: $detail
        term: $term
        workType: $workType
        type: $type
        workdays: $workdays
      }
    ) {
      id
    }
  }
`;

// const ADD_TODO = gql`
//   mutation AddTodo($text: String!) {
//     addTodo(text: $text) {
//       id
//       text
//     }
//   }
// `;
