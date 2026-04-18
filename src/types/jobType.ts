export type TJob = {
  id: number;
  company_id: number;
  category_id: number;
  country_id: number;
  industry_id: number;
  city_id: number | null;
  designation_id: number;

  job_title: string;
  slug: string;
  priority: number;
  address: string | null;

  company_name: string;
  industry_name: string;

  is_active: number;

  salary_type: "monthly" | string;
  currency: string;
  min_salary: number;
  max_salary: number;

  employment_type: "full_time" | string;
  gender: "male" | "female" | "any" | string;

  min_age: number;
  max_age: number;
  vacancy: number;

  experience: string;
  edu_title_id: number;

  job_desc: string;
  job_requirement: string;
  recruitment_process: string;

  type: "overseas" | string;
  expiry: string;

  medical_service: number;
  visa_profession: string | null;

  accommodation: number;
  food_option: string | null;
  food_amount: number | null;
  transportation: number;
  iqama: number;

  is_trending: number;
  is_hot: number;
  view_count: number;

  office_rate: number | null;

  start_time: string | null;
  end_time: string | null;

  is_overtime_allowed: number;
  working_days: number;
  working_hours: number;
  break_hours: number | null;

  job_collar: "blue" | "white" | string;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  soft_skills: string[];
  hard_skills: string[];

  benefits: Benefit[];
  languages: Language[];

  company: Company;
  category: Category;
  country: Country;
  city: City | null;
};

type Benefit = {
  id: number;
  name: string;
  pivot: {
    job_id: number;
    company_benefit_id: number;
  };
};

type Language = {
  id: number;
  name: string;
  pivot: {
    job_id: number;
    language_id: number;
  };
};

type Company = {
  id: number;
  name: string;
  slug: string;
  desc: string;
  image: string;
  industry_id: number;
  country_id: number;
  industry: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};

type Country = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
};
