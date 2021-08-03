import { gql } from "@apollo/client";
import { review, workdata } from "../../types/workdata";

export const HOMEPAGE_QUERY = gql`
  query {
    review: newreview {
      id
      user_name
      company_name
      link
      create_data_js
      report
    }
    workdata {
      id
      name
      salary
      create_data_js
      experience
      is_show
      salary
      term
      type
      workdays
      workType
    }
  }
`;

export interface HomepageData {
  workdata: workdata[] | undefined;
  review: review[] | undefined;
}
