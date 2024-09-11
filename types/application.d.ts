
interface Applicant {
    created_date: String;
    qualification: Qualifications;
    personal_information: PersonalInformation;
    designation: Designation;
    educational_attainment: EducationalAttainment[];
    equivalent_unit?: EquivalentUnit;
    transcript: Transcript;
    service_record: ServiceRecord[];
    professional_study: ProfessionalStudy[];
    attachments?: { [key: string]: Att };
    status: string;
    signatories: Signatory[];
    control_number: String
}

interface Att {
    link: string[];
    valid: null;
    remarks: string;
    signatory: Signatory;
}

interface Signatory {
    _id?: string;
    name: string;
    signature: string;
    role: string;
    date: Date;
}

interface Qualifications {
    position?: string;
    educ_level: string;
    education?: string[];
    experience?: any[];
    training?: number;
    eligibility?: string;
    per_rating?: string
}

interface PersonalInformation {
    lastname: string;
    firstname: string;
    middlename?: string;
    email: string;
    birthday: Date;
    gender: string
}

interface Designation {
    current_position: string;
    employee_no: string;
    plantilla_no: string;
    division: string;
    district?: string;
    item_no: string;
    school: string;
    ipcrf_rating?: string
}


interface EducationalAttainment {
    degree: string;
    institution: string;
    year_received: number;
    board_exam: string;
    rating: number;
    date: Date;
}

interface EquivalentUnit {
    public_years_teaching?: number;
    yt_equivalent?: number;
    present_degree?: number;
    pd_equivalent?: number;
    private_years_teaching?: number;
}

interface Transcipt {
    registrar_name: string;
    registrar_email: string;
    registrar_no: number;
}

interface ServiceRecord {

    type: string,
    designation: string;
    from: Date | string;
    to: Date | string;
    school: string;
    school_acronym: string;
    count: number,
    equivalent: number

}
interface AdmExperience {
    type: string,
    designation: string,
    from: string,
    to: string,
    school: string,
    school_acronym: string,
    count: number,
    equivalent: number,
}

interface ProfessionalStudy {
    sy: number;
    unit_no: string;
    description: string;
}


interface Endorsement {
    applicants: Array,
    branch_code: string,
    division: string,
    position: string,
}


