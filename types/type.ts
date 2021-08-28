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

export const companyName = ["-", "DMM", "mercari", "CyberAgent"];

export const selectType = [
  "記載なし",
  "iOS",
  "Android",
  "Mobile",
  "Web Frontend",
  "Fullstack",
  "Backend",
  "AI/ML",
  "Infra",
  "Site Reliability(SRE)",
  "Security",
  "Devops",
  "Data",
  "Networking",
  "その他",
];

export const workType = ["インターン", "アルバイト", "業務委託", "その他"];

export const experience = [
  "0.5",
  "1",
  "1.5",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10年以上",
];

export const workdays = ["1", "2", "3", "4", "5", "記載なし"];

export const term = [
  "1day",
  "2days",
  "1week",
  "2weeks",
  "3weeks",
  "1month",
  "2~3month",
  "6months",
  "1year",
  "2~3year",
  "More than 3 years",
];

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
  review?: review[];
  name: String;
  max: number;
  min: number;
  count: number;
  workdata: workdata[];
}
