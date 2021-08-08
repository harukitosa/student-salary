import { gql } from "@apollo/client";
import { company, review } from "../../types/type";

export const WORKINFOPAGE_QUERY = gql`
  query Company($name: String) {
    company(name: $name) {
      max
      min
      count
      name
      workdata {
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
  company: company | undefined;
}
