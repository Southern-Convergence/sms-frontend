export default defineNuxtPlugin(() => {
  const sex = ['Male', 'Female']
  const school_type = ['Private', 'Public']
  // USER TYPE
  const user_type = ['School Division Office', 'Regional Office', 'School']
  // USER ROLES
  const school_roles = ['Teacher', 'Principal', 'Admin']
  const sdo_roles = ['Administrative Officer IV', 'Evaluator', 'Verifier', 'Recommending Approver', 'Approver', 'Admin',]
  const ro_roles = ['Administrative Officer IV', 'Evaluator', 'Verifier', 'Recommending Approver', 'Approver', 'Admin',]
  const divisions = ["Manila", "Quezon City", "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong", "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "Pateros", "San Juan", "Taguig"
  ]
  const salary_items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  const education_level = ['Elementary', 'Secondary']

  return {
    provide: {
      sex: sex,
      school_type: school_type,
      user_type: user_type,
      school_roles: school_roles,
      sdo_roles: sdo_roles,
      ro_roles: ro_roles,
      salary_items: salary_items,
      education_level: education_level,
      divisions: divisions
    }
  }
});