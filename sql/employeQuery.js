const getAllemployee = `Select * from employee`;
const addEmployee = `INSERT INTO employee set ?`;
const getEmployeeById = `Select * from employee where emp_id = ?`;
const updateEmployeeData = `UPDATE employee SET first_name = COALESCE(?,first_name),last_name = COALESCE(?,last_name),father_name = COALESCE(?,father_name),mother_name = COALESCE(?,mother_name),dob = COALESCE(?,dob),blood_group = COALESCE(?,blood_group),material_status = COALESCE(?,material_status),emp_id = COALESCE(?,emp_id),religion = COALESCE(?,religion),probation = COALESCE(?,probation),written_language = COALESCE(?,written_language),spoken = COALESCE(?,spoken),mother_tongue = COALESCE(?,mother_tongue),joininig_date = COALESCE(?,joininig_date),confirmation_date = COALESCE(?,confirmation_date),emp_status = COALESCE(?,emp_status),pan_number = COALESCE(?,pan_number),pan_file_name = COALESCE(?,pan_file_name),adhar_number = COALESCE(?,adhar_number),adhar_file_name = COALESCE(?,adhar_file_name),passport = COALESCE(?,passport),passport_file_name = COALESCE(?,passport_file_name),dl_voter_id = COALESCE(?,dl_voter_id),dl_voter_id_file = COALESCE(?,dl_voter_id_file),flat_house_building = COALESCE(?,flat_house_building),area_street_village = COALESCE(?,area_street_village), town_city = COALESCE(?,town_city),distric = COALESCE(?,distric),state =COALESCE(?,state),zipcode = COALESCE(?,zipcode),contact_number = COALESCE(?,contact_number),emergency_contact_number = COALESCE(?,emergency_contact_number),esic_no = COALESCE(?,esic_no),epf_uan_no = COALESCE(?,epf_uan_no),email  = COALESCE(?,email),password = COALESCE(?,password),emp_per_email = COALESCE(?,emp_per_email),emp_role = COALESCE(?,emp_role),spouse_name = COALESCE(?,spouse_name),
hi_qualification = COALESCE(?,hi_qualification),
hi_course = COALESCE(?,hi_course),
hi_passing_year = COALESCE(?,hi_passing_year),
hi_institute_university = COALESCE(?,hi_institute_university),
hi_percentage = COALESCE(?,hi_percentage),
hi_quali_doc_name = COALESCE(?,hi_quali_doc_name)
 WHERE emp_id = ?`;

const getEmail = `Select * from employee  where email = ? `;
module.exports = {
  getAllemployee,
  addEmployee,
  getEmployeeById,
  updateEmployeeData,
  getEmail,
};
