interface Qualifications {
    position: string;
    educ_level: string;
    education?: array;
    experience?: array;
    training?: number;
    eligibility?: string;
    per_rating?: string
}
interface Per_info {
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
    school_address: string;
    ipcrf_rating?: string
}
interface Educ_attainment {
    degree: string;
    institution: string;
    year_received: number;
    board_exam: string;
    rating: number;
    date: Date;
}
// interface Equivalent_unit {
//     public_years_teaching?: number;
//     yt_equivalent?: number;
//     present_degree?: number;
//     pd_equvalent?: number;
//     private_years_teaching?: number;
//     // attachment
//     attached_permit_to_study?: string;
//     attached_omnibus?: string;
// }

interface Transcipt {
    transcipt_record?: string;
    registrar_name: string;
    registrar_email: string;
    registrar_no: number;
}
interface Service_record {

    designation: string;
    from: Date;
    to: Date;
}
interface Prof_study {
    sy: string;
    unit_no: string;
    description: string;
}