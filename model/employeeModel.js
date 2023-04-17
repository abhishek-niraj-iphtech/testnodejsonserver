const dbConn = require("./../db/db.config");
const employeeQuery = require("../sql/employeQuery");
const { genSaltSync } = require("bcrypt");
var Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.father_name = employee.father_name;
  this.mother_name = employee.mother_name;
  this.dob = employee.dob;
  this.blood_group = employee.blood_group;
  this.material_status = employee.material_status;
  this.spouse_name = employee.spouse_name;
  this.emp_id = employee.emp_id;
  this.religion = employee.religion;
  this.probation = employee.probation;
  this.written_language = employee.written_language;
  this.spoken = employee.spoken;
  this.mother_tongue = employee.mother_tongue;
  this.joininig_date = employee.joininig_date;
  this.confirmation_date = employee.confirmation_date;
  this.emp_status = employee.emp_status;
  this.pan_number = employee.pan_number;
  this.pan_file_name = employee.pan_file_name;
  this.adhar_number = employee.adhar_number;
  this.adhar_file_name = employee.adhar_file_name;
  this.passport = employee.passport;
  this.passport_file_name = employee.passport_file_name;
  this.dl_voter_id = employee.dl_voter_id;
  this.dl_voter_id_file = employee.dl_voter_id_file;
  this.flat_house_building = employee.flat_house_building;
  this.area_street_village = employee.area_street_village;
  this.town_city = employee.town_city;
  this.distric = employee.distric;
  this.state = employee.state;
  this.zipcode = employee.zipcode;
  this.contact_number = employee.contact_number;
  this.emergency_contact_number = employee.emergency_contact_number;

  this.hi_qualification = employee.hi_qualification;
  this.hi_course = employee.hi_course;
  this.hi_institute_university = employee.hi_institute_university;
  this.hi_passing_year = employee.hi_passing_year;
  this.hi_percentage = employee.hi_percentage;
  this.hi_quali_doc_name = employee.hi_quali_doc_name;

  this.in_qualification = employee.in_qualification;
  this.in_course = employee.in_course;
  this.in_institute_university = employee.in_institute_university;
  this.in_passing_year = employee.in_passing_year;
  this.in_percentage = employee.in_percentage;
  this.in_quali_doc_name = employee.in_quali_doc_name;

  this.ga_qualification = employee.ga_qualification;
  this.ga_course = employee.ga_course;
  this.ga_institute_university = employee.ga_institute_university;
  this.ga_passing_year = employee.ga_passing_year;
  this.ga_percentage = employee.ga_percentage;
  this.ga_quali_doc_name = employee.ga_quali_doc_name;

  this.po_qualification = employee.po_qualification;
  this.po_course = employee.po_course;
  this.po_institute_university = employee.po_institute_university;
  this.po_passing_year = employee.po_passing_year;
  this.po_percentage = employee.po_percentage;
  this.po_quali_doc_name = employee.po_quali_doc_name;

  this.esic_no = employee.esic_no;
  this.epf_uan_no = employee.epf_uan_no;

  this.email = employee.email;
  this.password = employee.password;
  this.emp_per_email = employee.emp_per_email;
  this.emp_role = employee.emp_role;
  this.created_at = employee.created_at;
};

/**************************************************************** Find All Employee Data *****************************************************************/

Employee.finadAll = (result) => {
  dbConn.query(employeeQuery.getAllemployee, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
/**************************************************************** Create Employee *****************************************************************/
Employee.create = (newEmp, result) => {
  try {
    dbConn.query(employeeQuery.addEmployee, newEmp, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

/**************************************************************** Get Employee By Its Id *****************************************************************/

Employee.findById = (id, result) => {
  dbConn.query(employeeQuery.getEmployeeById, id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

/**************************************************************** Update Employee data *****************************************************************/

Employee.update = (id, employee, result) => {
  const salt = genSaltSync(10);
  dbConn.query(
    employeeQuery.updateEmployeeData,
    [
      employee.first_name,
      employee.last_name,
      employee.father_name,
      employee.mother_name,
      employee.dob,
      employee.blood_group,
      employee.material_status,
      employee.emp_id,
      employee.religion,
      employee.probation,
      employee.written_language,
      employee.spoken,
      employee.mother_tongue,
      employee.joininig_date,
      employee.confirmation_date,
      employee.emp_status,
      employee.pan_number,
      employee.pan_file_name,
      employee.adhar_number,
      employee.adhar_file_name,
      employee.passport,
      employee.passport_file_name,
      employee.dl_voter_id,
      employee.dl_voter_id_file,
      employee.flat_house_building,
      employee.area_street_village,
      employee.town_city,
      employee.distric,
      employee.state,
      employee.zipcode,
      employee.contact_number,
      employee.emergency_contact_number,
      employee.esic_no,
      employee.epf_uan_no,
      employee.email,
      employee.password,
      employee.emp_per_email,
      employee.emp_role,
      employee.spouse_name,
      employee.hi_qualification,
      employee.hi_course,
      employee.hi_passing_year,
      employee.hi_institute_university,
      employee.hi_percentage,
      employee.hi_quali_doc_name,
      id,
    ],
    function (err, res) {
      if (err) {
        console.log("Error", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

// employee.written_language,
// employee.spoken,
// employee.mother_tongue,
// employee.joininig_date,
// employee.confirmation_date,
// employee.emp_status,
// employee.pan_number,

/**************************************************************** Get Email *****************************************************************/

Employee.getEmail = (email, result) => {
  dbConn.query(employeeQuery.getEmail, email, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Employee.getEmplyoeeAssignedLeave = (result) => {
  dbConn.query(
    `Select CONCAT(employee.first_name," ",employee.last_name) AS name,employee.emp_id,employee.email,employee.emp_role,
CASE
          WHEN emplyoee_leaves.emp_id IS NULL THEN 'Not Assigned'
          ELSE 'Assigned'
      END AS assinged 
from employee
LEFT JOIN
emplyoee_leaves
ON employee.emp_id = emplyoee_leaves.emp_id
GROUP BY employee.first_name`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

// Check emp_id
Employee.userAvailability = (data, result) => {
  dbConn.query(
    "SELECT emp_id  From employee where emp_id = ?",
    data,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Employee.userDob = (data, result) => {
  dbConn.query(
    "SELECT emp_id  From employee where dob = ?",
    data,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
module.exports = Employee;
