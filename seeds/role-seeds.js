const { Role } = require('../models');

const roleData = [
  {
    title: 'Sales Lead',
    salary: 100000,
  },
  {
    title: 'Sales Person',
    salary: 80000,
  },
  {
    title: 'Lead Engineer',
    salary: 150000,
  },
  {
    title: 'Software Engineer',
    salary: 120000,
  },
  {
    title: 'Account Manager',
    salary: 160000,
  },
  {
    title: 'Accountant',
    salary: 125000,
  },
  {
    title: 'Legal Team Lead',
    salary: 250000,
  },
  {
    title: 'Lawyer',
    salary: 190000,
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
