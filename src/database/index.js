import Sequelize from 'sequelize';

import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Plan, Student, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
