import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../ormconfig.json';

const DBDataSource = new DataSource(config as DataSourceOptions);

DBDataSource.initialize()
  .then(() => {
    console.log(config);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default DBDataSource;
