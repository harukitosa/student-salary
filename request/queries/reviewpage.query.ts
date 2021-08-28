import { gql } from "@apollo/client";
import { review } from "../../types/type";

export const REVIEW_QUERY = gql`
  query {
    review {
      id
      company_name
      content
      detail
      user_name
      skill
      detail
      report
    }
  }
`;
export interface ReviewPageData {
  review: review[] | undefined;
}

export const REVIEWBYID_QUERY = gql`
  query getreview($id: Int) {
    review(id: $id) {
      id
      company_name
      content
      detail
      user_name
      skill
      detail
      report
    }
  }
`;
export interface ReviewBYIDPageData {
  review: review[] | undefined;
}

export const CREATE_REVIEW = gql`
  mutation createReview(
    $company_name: String!
    $content: String
    $link: String
    $reasons: String
    $report: String!
    $skill: String
    $user_name: String
  ) {
    createReview(
      input: {
        company_name: $company_name
        content: $content
        link: $link
        reasons: $reasons
        report: $report
        skill: $skill
        user_name: $user_name
      }
    ) {
      id
    }
  }
`;
