const seedDepartments = require('./department-seeds');
const seedRoles = require('./role-seeds');
const seedEmployees = require('./employee-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedDepartments();

  await seedRoles();

  await seedEmployees();

  process.exit(0);
};

seedAll();
