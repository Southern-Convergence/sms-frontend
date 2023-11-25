interface Qualifications {
    position: string;
    educ_level: string;
    education: string;
    experience: string;
    training: string;
    eligibility: string;
    per_rating: string
}
interface Per_info {
    lastname: string;
    firstname: string;
    middlename: string;
    email: string;
    birthday: string;
    gender: string
}
interface Designation {
    current_position: string;
    employee_no: string;
    plantilla_no: string;
    division: string;
    district: string;
    item_no: string;
    school: string;
    school_address: string;
    ipcrf_rating: number
}
interface Educ_attainment {
    date: string;
    degree: string;
    institution: string;
    year_received: string;
    board_exam: string;
    rating: string;

}
interface Transcipt {
    transcipt_record: string;
    registrar_name: string;
    registrar_email: string;
    registrar_no: string;
}
interface Service_record {
    designation: string;
    from: string;
    to: string;
}
interface Prof_study {
    sy: string;
    unit_no: string;
    description: string;
}