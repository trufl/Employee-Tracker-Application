const { Employee } = require('../models');

const employeeData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    roleId: 1,
  },
  {
    firstName: 'Mike',
    lastName: 'Chan',
    roleId: 2,
    managerId: 1,
  },
  {
    firstName: 'Ashley',
    lastName: 'Rodriguez',
    roleId: 3,
  },
  {
    firstName: 'Kevin',
    lastName: 'Tupik',
    roleId: 4,
    managerId: 3,
  },
  {
    firstName: 'Kunal',
    lastName: 'Singh',
    roleId: 5,
  },
  {
    firstName: 'Malia',
    lastName: 'Brown',
    roleId: 6,
    managerId: 5,
  },
  {
    firstName: 'Sarah',
    lastName: 'Lourd',
    roleId: 7,
  },
  {
    firstName: 'Tom',
    lastName: 'Allen',
    roleId: 8,
    managerId: 7,
  }
];

const seedEmployees = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployees;
