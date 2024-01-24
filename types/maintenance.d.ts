


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
  education: string[];
  education_level?: string;
  experience: string[];
  training_hours?: number;
  rating?: array;
  sg?: string;
  attachment?: array;
  sdo_attachment?: array;
};