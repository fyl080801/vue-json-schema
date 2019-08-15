import vjsBus from './bus';
import vjsHelpers from './helpers';
import vjsLifecycle from './lifecycle';
import vjsModel from './model';
import vjsState from './state';
import vjsSchema from './schema';
import vjsUi from './ui';
import vjsValidation from './validation';

const vjsMethods = {
  ...vjsBus,
  ...vjsLifecycle,
  ...vjsHelpers,
  ...vjsModel,
  ...vjsSchema,
  ...vjsState,
  ...vjsUi,
  ...vjsValidation
};

export default vjsMethods;
