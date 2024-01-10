// User Management
// interface SmsUser {
//   username?: string;
//   password?: string;
//   firstname: string;
//   middlename?: string;
//   lastname: string;
//   email: string;
//   contact_number: number;
//   type: string;
//   role: string;
//   division?: string;
//   school_name: string,

//   // school?: School
// }

interface Smsuser {
  username?: String;
  password?: String;
  admin?: Boolean;
  email: String;
  created?: Date;
  lastname: String;
  middlename?: String;
  firstname: String;
  contact_number: String;
  type: String;
  role: String;
  designation_information: {
    division: string;
    school: string;
  }
  status: string;
}
