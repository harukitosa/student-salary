export interface workdataInfo {
  mid: Number;
  avarage: Number;
  count: Number;
  company_count: Number;
  workdata: workdata[];
}

export interface workdata {
  id: Number;
  create_data_js: String;
  detail: String;
  experience: String;
  is_show: Boolean;
  name: String;
  salary: Number;
  term: String;
  type: String;
  workdays: String;
  workType: String;
}

export interface review {
  id: number;
  company_name: String;
  detail: String;
  content: String;
  create_data_js: String;
  link: String;
  reasons: String;
  report: String;
  skill: String;
  user_name: String;
}

export interface company {
  name: String;
  max: number;
  min: number;
  count: number;
}
