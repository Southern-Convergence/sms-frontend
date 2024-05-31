


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
  supplemented_units?: number;
  ma_units?: number;
  status_of_appointment?: boolean;
  experience: string[];
  is_experience: boolean;
  or_20_ma_units: boolean;
  training_hours?: number;
  leadership_points?: array;
  rating?: array;
  sg?: string;
  attachment?: array;
  sdo_attachment?: array;
  code: string;
};
interface Rd {
  rd: {
    first_name: string;
    middle_name: string;
    last_name: string;
    ro_address: string;
    position: string;
  };
  dbm: {
    first_name: string;
    middle_name: string;
    last_name: string;
    government_agency: string;
    region: string;
    dbm_address: string;
    position: string;
  };
}


interface Leadership {
  tile: string,

}