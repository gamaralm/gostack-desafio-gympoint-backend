import Sequelize from 'sequelize';

import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import Registration from '../app/models/Registration';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Checkin, HelpOrder, Plan, Student, Registration, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
