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

export const companyName = [
  "-",
  "Apple",
  "AutoScale",
  "CyberAgent",
  "Cybozu",
  "DeNA",
  "DMM",
  "dynave",
  "Freee",
  "Future",
  "Future Architect",
  "GMOインターネット",
  "Goldman Sachs",
  "Google",
  "KPMG",
  "LINE",
  "menu株式会社",
  "mercari",
  "NTT研究所",
  "pixiv",
  "teamLab",
  "TRUST SMITH and COMPANY",
  "VOYAGE GROUP",
  "Wantedly",
  "いい生活",
  "アイフル",
  "アカツキ",
  "エイチーム",
  "エヌエヌ生命保険",
  "クックパッド",
  "ソフトバンク",
  "マネーフォワード",
  "ミクシィ",
  "ヤフー",
  "ライスカレー",
  "リクルート",
  "ワタミ",
  "大田区の会社",
  "日本経済新聞社",
  "株式会社プレイド",
  "楽天",
  "電警",
];

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
