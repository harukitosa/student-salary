import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Blog = {
  __typename?: "Blog";
  title: Scalars["String"];
  company_name: Scalars["String"];
  url: Scalars["String"];
  year: Scalars["String"];
  season: Scalars["String"];
};

export type BlogData = {
  __typename?: "BlogData";
  blog: Array<Blog>;
  nameList: Array<Scalars["String"]>;
};

export type Company = {
  __typename?: "Company";
  name: Scalars["String"];
  max: Scalars["Int"];
  min: Scalars["Int"];
  count: Scalars["Int"];
  workdata?: Maybe<Array<WorkData>>;
  review?: Maybe<Array<Review>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createWorkData: WorkData;
  createReview: Review;
};

export type MutationCreateWorkDataArgs = {
  input: NewWorkData;
};

export type MutationCreateReviewArgs = {
  input: NewReview;
};

export type NewReview = {
  company_name: Scalars["String"];
  content?: Maybe<Scalars["String"]>;
  create_data_js?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  reasons?: Maybe<Scalars["String"]>;
  report: Scalars["String"];
  skill?: Maybe<Scalars["String"]>;
  user_name?: Maybe<Scalars["String"]>;
};

export type NewWorkData = {
  create_data_js?: Maybe<Scalars["String"]>;
  detail?: Maybe<Scalars["String"]>;
  experience?: Maybe<Scalars["String"]>;
  is_show?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  salary: Scalars["Int"];
  term?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  workdays?: Maybe<Scalars["String"]>;
  workType?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  workdatainfo: WorkDataInfo;
  review?: Maybe<Array<Review>>;
  newreview?: Maybe<Array<Review>>;
  topcompany?: Maybe<Array<Company>>;
  company?: Maybe<Array<Company>>;
  blog: BlogData;
};

export type QueryReviewArgs = {
  id?: Maybe<Scalars["Int"]>;
};

export type QueryCompanyArgs = {
  name?: Maybe<Scalars["String"]>;
};

export type QueryBlogArgs = {
  company_name?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type Review = {
  __typename?: "Review";
  id: Scalars["ID"];
  company_name?: Maybe<Scalars["String"]>;
  detail?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  create_data_js?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  reasons?: Maybe<Scalars["String"]>;
  report?: Maybe<Scalars["String"]>;
  skill?: Maybe<Scalars["String"]>;
  user_name?: Maybe<Scalars["String"]>;
};

export type WorkData = {
  __typename?: "WorkData";
  id: Scalars["ID"];
  create_data_js?: Maybe<Scalars["String"]>;
  detail?: Maybe<Scalars["String"]>;
  experience?: Maybe<Scalars["String"]>;
  is_show?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  salary: Scalars["Int"];
  term?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  workdays?: Maybe<Scalars["String"]>;
  workType?: Maybe<Scalars["String"]>;
};

export type WorkDataInfo = {
  __typename?: "WorkDataInfo";
  company_count: Scalars["Int"];
  avarage: Scalars["Int"];
  count: Scalars["Int"];
  mid: Scalars["Int"];
  workdata?: Maybe<Array<WorkData>>;
};

export type GetBlogQueryVariables = Exact<{
  company_name?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
}>;

export type GetBlogQuery = {
  __typename?: "Query";
  blog: {
    __typename?: "BlogData";
    nameList: Array<string>;
    blog: Array<{
      __typename?: "Blog";
      title: string;
      company_name: string;
      url: string;
      season: string;
      year: string;
    }>;
  };
};

export type GetHomePageQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomePageQuery = {
  __typename?: "Query";
  review?: Maybe<
    Array<{
      __typename?: "Review";
      id: string;
      user_name?: Maybe<string>;
      company_name?: Maybe<string>;
      link?: Maybe<string>;
      create_data_js?: Maybe<string>;
      content?: Maybe<string>;
      detail?: Maybe<string>;
      report?: Maybe<string>;
    }>
  >;
  company?: Maybe<
    Array<{
      __typename?: "Company";
      name: string;
      max: number;
      min: number;
      count: number;
    }>
  >;
  companylist?: Maybe<Array<{ __typename?: "Company"; name: string }>>;
  workdatainfo: {
    __typename?: "WorkDataInfo";
    mid: number;
    avarage: number;
    count: number;
    company_count: number;
    workdata?: Maybe<
      Array<{
        __typename?: "WorkData";
        id: string;
        name: string;
        salary: number;
        create_data_js?: Maybe<string>;
        experience?: Maybe<string>;
        is_show?: Maybe<boolean>;
        term?: Maybe<string>;
        type?: Maybe<string>;
        detail?: Maybe<string>;
        workdays?: Maybe<string>;
        workType?: Maybe<string>;
      }>
    >;
  };
};

export type ReviewQueryVariables = Exact<{ [key: string]: never }>;

export type ReviewQuery = {
  __typename?: "Query";
  review?: Maybe<
    Array<{
      __typename?: "Review";
      id: string;
      company_name?: Maybe<string>;
      content?: Maybe<string>;
      user_name?: Maybe<string>;
      skill?: Maybe<string>;
      detail?: Maybe<string>;
      report?: Maybe<string>;
    }>
  >;
};

export type GetreviewQueryVariables = Exact<{
  id?: Maybe<Scalars["Int"]>;
}>;

export type GetreviewQuery = {
  __typename?: "Query";
  review?: Maybe<
    Array<{
      __typename?: "Review";
      id: string;
      company_name?: Maybe<string>;
      content?: Maybe<string>;
      user_name?: Maybe<string>;
      skill?: Maybe<string>;
      report?: Maybe<string>;
      reasons?: Maybe<string>;
    }>
  >;
};

export type CreateReviewMutationVariables = Exact<{
  company_name: Scalars["String"];
  content?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  reasons?: Maybe<Scalars["String"]>;
  report: Scalars["String"];
  skill?: Maybe<Scalars["String"]>;
  user_name?: Maybe<Scalars["String"]>;
}>;

export type CreateReviewMutation = {
  __typename?: "Mutation";
  createReview: { __typename?: "Review"; id: string };
};

export type GetWorkinfoQueryVariables = Exact<{ [key: string]: never }>;

export type GetWorkinfoQuery = {
  __typename?: "Query";
  company?: Maybe<
    Array<{
      __typename?: "Company";
      max: number;
      min: number;
      count: number;
      name: string;
      workdata?: Maybe<
        Array<{
          __typename?: "WorkData";
          id: string;
          salary: number;
          name: string;
          workType?: Maybe<string>;
        }>
      >;
    }>
  >;
};

export type CompanyQueryVariables = Exact<{
  name?: Maybe<Scalars["String"]>;
}>;

export type CompanyQuery = {
  __typename?: "Query";
  company?: Maybe<
    Array<{
      __typename?: "Company";
      max: number;
      min: number;
      count: number;
      name: string;
      workdata?: Maybe<
        Array<{
          __typename?: "WorkData";
          id: string;
          salary: number;
          name: string;
          detail?: Maybe<string>;
          workType?: Maybe<string>;
          experience?: Maybe<string>;
          is_show?: Maybe<boolean>;
          term?: Maybe<string>;
          type?: Maybe<string>;
          workdays?: Maybe<string>;
          create_data_js?: Maybe<string>;
        }>
      >;
    }>
  >;
  blog: {
    __typename?: "BlogData";
    blog: Array<{
      __typename?: "Blog";
      title: string;
      company_name: string;
      url: string;
      season: string;
      year: string;
    }>;
  };
};

export type CreateWorkDataMutationVariables = Exact<{
  name: Scalars["String"];
  salary: Scalars["Int"];
  experience?: Maybe<Scalars["String"]>;
  detail?: Maybe<Scalars["String"]>;
  term?: Maybe<Scalars["String"]>;
  workType?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  workdays?: Maybe<Scalars["String"]>;
}>;

export type CreateWorkDataMutation = {
  __typename?: "Mutation";
  createWorkData: { __typename?: "WorkData"; id: string };
};

export const GetBlogDocument = gql`
  query getBlog($company_name: String, $limit: Int) {
    blog(company_name: $company_name, limit: $limit) {
      blog {
        title
        company_name
        url
        season
        year
      }
      nameList
    }
  }
`;

/**
 * __useGetBlogQuery__
 *
 * To run a query within a React component, call `useGetBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogQuery({
 *   variables: {
 *      company_name: // value for 'company_name'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetBlogQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBlogQuery, GetBlogQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBlogQuery, GetBlogQueryVariables>(
    GetBlogDocument,
    options
  );
}
export function useGetBlogLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBlogQuery, GetBlogQueryVariables>(
    GetBlogDocument,
    options
  );
}
export type GetBlogQueryHookResult = ReturnType<typeof useGetBlogQuery>;
export type GetBlogLazyQueryHookResult = ReturnType<typeof useGetBlogLazyQuery>;
export type GetBlogQueryResult = Apollo.QueryResult<
  GetBlogQuery,
  GetBlogQueryVariables
>;
export const GetHomePageDocument = gql`
  query getHomePage {
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
        detail
        workdays
        workType
      }
    }
  }
`;

/**
 * __useGetHomePageQuery__
 *
 * To run a query within a React component, call `useGetHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHomePageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetHomePageQuery,
    GetHomePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetHomePageQuery, GetHomePageQueryVariables>(
    GetHomePageDocument,
    options
  );
}
export function useGetHomePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetHomePageQuery,
    GetHomePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetHomePageQuery, GetHomePageQueryVariables>(
    GetHomePageDocument,
    options
  );
}
export type GetHomePageQueryHookResult = ReturnType<typeof useGetHomePageQuery>;
export type GetHomePageLazyQueryHookResult = ReturnType<
  typeof useGetHomePageLazyQuery
>;
export type GetHomePageQueryResult = Apollo.QueryResult<
  GetHomePageQuery,
  GetHomePageQueryVariables
>;
export const ReviewDocument = gql`
  query review {
    review {
      id
      company_name
      content
      user_name
      skill
      detail
      report
    }
  }
`;

/**
 * __useReviewQuery__
 *
 * To run a query within a React component, call `useReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useReviewQuery(
  baseOptions?: Apollo.QueryHookOptions<ReviewQuery, ReviewQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReviewQuery, ReviewQueryVariables>(
    ReviewDocument,
    options
  );
}
export function useReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReviewQuery, ReviewQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReviewQuery, ReviewQueryVariables>(
    ReviewDocument,
    options
  );
}
export type ReviewQueryHookResult = ReturnType<typeof useReviewQuery>;
export type ReviewLazyQueryHookResult = ReturnType<typeof useReviewLazyQuery>;
export type ReviewQueryResult = Apollo.QueryResult<
  ReviewQuery,
  ReviewQueryVariables
>;
export const GetreviewDocument = gql`
  query getreview($id: Int) {
    review(id: $id) {
      id
      company_name
      content
      user_name
      skill
      report
      reasons
    }
  }
`;

/**
 * __useGetreviewQuery__
 *
 * To run a query within a React component, call `useGetreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetreviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetreviewQuery(
  baseOptions?: Apollo.QueryHookOptions<GetreviewQuery, GetreviewQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetreviewQuery, GetreviewQueryVariables>(
    GetreviewDocument,
    options
  );
}
export function useGetreviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetreviewQuery,
    GetreviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetreviewQuery, GetreviewQueryVariables>(
    GetreviewDocument,
    options
  );
}
export type GetreviewQueryHookResult = ReturnType<typeof useGetreviewQuery>;
export type GetreviewLazyQueryHookResult = ReturnType<
  typeof useGetreviewLazyQuery
>;
export type GetreviewQueryResult = Apollo.QueryResult<
  GetreviewQuery,
  GetreviewQueryVariables
>;
export const CreateReviewDocument = gql`
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
export type CreateReviewMutationFn = Apollo.MutationFunction<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      company_name: // value for 'company_name'
 *      content: // value for 'content'
 *      link: // value for 'link'
 *      reasons: // value for 'reasons'
 *      report: // value for 'report'
 *      skill: // value for 'skill'
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useCreateReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >(CreateReviewDocument, options);
}
export type CreateReviewMutationHookResult = ReturnType<
  typeof useCreateReviewMutation
>;
export type CreateReviewMutationResult =
  Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<
  CreateReviewMutation,
  CreateReviewMutationVariables
>;
export const GetWorkinfoDocument = gql`
  query getWorkinfo {
    company {
      max
      min
      count
      name
      workdata {
        id
        salary
        name
        workType
      }
    }
  }
`;

/**
 * __useGetWorkinfoQuery__
 *
 * To run a query within a React component, call `useGetWorkinfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkinfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkinfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkinfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWorkinfoQuery,
    GetWorkinfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWorkinfoQuery, GetWorkinfoQueryVariables>(
    GetWorkinfoDocument,
    options
  );
}
export function useGetWorkinfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkinfoQuery,
    GetWorkinfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetWorkinfoQuery, GetWorkinfoQueryVariables>(
    GetWorkinfoDocument,
    options
  );
}
export type GetWorkinfoQueryHookResult = ReturnType<typeof useGetWorkinfoQuery>;
export type GetWorkinfoLazyQueryHookResult = ReturnType<
  typeof useGetWorkinfoLazyQuery
>;
export type GetWorkinfoQueryResult = Apollo.QueryResult<
  GetWorkinfoQuery,
  GetWorkinfoQueryVariables
>;
export const CompanyDocument = gql`
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
    }
    blog(company_name: $name, limit: 3) {
      blog {
        title
        company_name
        url
        season
        year
      }
    }
  }
`;

/**
 * __useCompanyQuery__
 *
 * To run a query within a React component, call `useCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCompanyQuery(
  baseOptions?: Apollo.QueryHookOptions<CompanyQuery, CompanyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyQuery, CompanyQueryVariables>(
    CompanyDocument,
    options
  );
}
export function useCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CompanyQuery, CompanyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyQuery, CompanyQueryVariables>(
    CompanyDocument,
    options
  );
}
export type CompanyQueryHookResult = ReturnType<typeof useCompanyQuery>;
export type CompanyLazyQueryHookResult = ReturnType<typeof useCompanyLazyQuery>;
export type CompanyQueryResult = Apollo.QueryResult<
  CompanyQuery,
  CompanyQueryVariables
>;
export const CreateWorkDataDocument = gql`
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
export type CreateWorkDataMutationFn = Apollo.MutationFunction<
  CreateWorkDataMutation,
  CreateWorkDataMutationVariables
>;

/**
 * __useCreateWorkDataMutation__
 *
 * To run a mutation, you first call `useCreateWorkDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkDataMutation, { data, loading, error }] = useCreateWorkDataMutation({
 *   variables: {
 *      name: // value for 'name'
 *      salary: // value for 'salary'
 *      experience: // value for 'experience'
 *      detail: // value for 'detail'
 *      term: // value for 'term'
 *      workType: // value for 'workType'
 *      type: // value for 'type'
 *      workdays: // value for 'workdays'
 *   },
 * });
 */
export function useCreateWorkDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateWorkDataMutation,
    CreateWorkDataMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateWorkDataMutation,
    CreateWorkDataMutationVariables
  >(CreateWorkDataDocument, options);
}
export type CreateWorkDataMutationHookResult = ReturnType<
  typeof useCreateWorkDataMutation
>;
export type CreateWorkDataMutationResult =
  Apollo.MutationResult<CreateWorkDataMutation>;
export type CreateWorkDataMutationOptions = Apollo.BaseMutationOptions<
  CreateWorkDataMutation,
  CreateWorkDataMutationVariables
>;
