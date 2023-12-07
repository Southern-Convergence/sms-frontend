interface School {
  division?: string;
  school_name?: string;
  principal?: string;
  address?: string;
  school_email?: string;
}


interface Experience {
  title: string;
  is_ma_equivalent?: boolean;
  master_arts?: string
}

interface Position {
  title: string;
  education: string[];
  education_level?: string;
  experience: string[];
  training_hours?: number;
  rating?: array;
  sg?: string
};