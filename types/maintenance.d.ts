


interface Experience {
  title: string;
  // is_ma_equivalent?: boolean;
  // master_arts?: string
}
interface PerformanceRating {
  title: string;

}
interface Education {
  title: string;

}
interface SalaryGrade {
  salary_grade: number;
  equivalent: number

}

interface Position {
  title: string;
  with_erf: boolean;
  education: string[];
  education_level?: string;
  experience: string[];
  is_experience: boolean;
  training_hours?: number;
  rating?: array;
  sg?: string;
  attachment?: array;
  sdo_attachment?: array;
};
interface Rd {
  first_name: string,
  middle_name: string,
  last_name: string,
  ro_address: string,
  position: string
}

interface Maunits {
  type: string,
  number_of_years: number,
  years_equivalent: number,
}