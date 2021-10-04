import { gql } from "@apollo/client";
import { review, workdataInfo, company } from "../../types/type";

export const HOMEPAGE_QUERY = gql`
  query HomePage {
    review: newreview {
      id
      user_name
      company_name
      link
      create_data_js
      content
      detail
      report
    }
    company: topcompany {
      name
      max
      min
      count
    }
    companylist: company {
      name
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
  company: company[] | undefined;
  companylist: company[] | undefined;
}
