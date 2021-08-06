import { gql } from "@apollo/client";
import { review, workdata, workdataInfo } from "../../types/workdata";

export const HOMEPAGE_QUERY = gql`
query {
  review: newreview{
    id
    user_name
    company_name
    
    link
    create_data_js
    content
    detail
    report
  }
  workdatainfo {
    mid
    avarage
    count
    company_count
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
}
`;

export interface HomepageData {
  workdatainfo: workdataInfo | undefined;
  review: review[] | undefined;
}
