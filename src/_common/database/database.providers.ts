import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from './database.config';
import { ConfigService } from '@nestjs/config';

export const databaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async (configService: ConfigService) => {
    const sequelizeOptions: SequelizeOptions = config(configService);
    let sequelizeInstance: Sequelize = new Sequelize(sequelizeOptions);
    await sequelizeInstance.sync();
    return sequelizeInstance;
  },
  inject: [ConfigService]
};
