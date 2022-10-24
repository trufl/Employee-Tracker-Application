const { Role } = require('../models');

const roleData = [
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
