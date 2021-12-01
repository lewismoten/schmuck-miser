import {
  createRoutine,
  createRoutineCreator,
  defaultRoutineStages,
} from 'redux-saga-routines';

const actionBuilder = (domain, emoji) => {
  const actionTypePrefix = (action) => `${domain} ${emoji} ${action}`;

  const build = (action) => createRoutine(actionTypePrefix(action));

  const withProgress = (action) => {
    const creator = createRoutineCreator([
      ...defaultRoutineStages,
      'PROGRESS',
      'ABORT',
    ]);
    return creator(actionTypePrefix(action));
  };

  build.progress = withProgress;

  return build;
};

export default actionBuilder;
