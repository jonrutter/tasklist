import type { TaskType, PriorityType } from './tasksSlice';
import type { Dictionary, EntityState } from '@reduxjs/toolkit';
import { getItem } from '@/lib/localStorage';

type PartialEntity = Partial<TaskType> & {
  name: string;
  description: string;
  id: string;
};

/** Type predicate for PriorityType */
const isPriority = (p: unknown): p is PriorityType =>
  typeof p === 'number' && p >= 1 && p <= 4;

/** Takes a partial entity loaded from localStorage (which may or may not be formatted correctly) and returns a correctly formatted state entity. */
const processEntity = (entity: PartialEntity): TaskType => {
  // we know that name, description, and id are present and correctly typed
  const { name, description, id } = entity;
  // return an object where all properties are either built from the passed entity (if correctly typed), or from defaults
  return {
    name,
    description,
    id,
    completed: typeof entity.completed === 'boolean' ? entity.completed : false,
    date: typeof entity.date === 'string' ? entity.date : new Date().toJSON(),
    priority: isPriority(entity.priority) ? entity.priority : 4,
    ...(typeof entity.due === 'string' ? { due: entity.due } : {}),
    ...(typeof entity.tag === 'string' ? { tag: entity.tag } : {}),
  };
};

/** Type predicate for task entity objects guaranteed to have correctly-typed 'name', 'description', and 'id' properties. */
const isPartialEntityType = (entity: unknown): entity is PartialEntity => {
  // there should be a 'name', 'description', and 'id' property, which should all be strings
  if (
    ('name' in (entity as PartialEntity) &&
      'description' in (entity as PartialEntity) &&
      'id' in (entity as PartialEntity) &&
      typeof (entity as PartialEntity).name === 'string',
    typeof (entity as PartialEntity).description === 'string',
    typeof (entity as PartialEntity).id === 'string')
  ) {
    return true;
  } else {
    return false;
  }
};

/** Takes a JSON string of a potentially correct EntityState, and returns either a full type-safe EntityState object for use in a reducer, or null if conversion is impossible. */
const buildEntityState = (state: unknown): EntityState<TaskType> | null => {
  // to ensure type safety across different application versions, need to check for various corruptions of state data
  // at a baseline, state should be a non-null object
  if (typeof state !== 'object' || state === null) return null;
  // state should be normalized: so it should have properties `ids` and `entities`
  if (!('ids' in state) || !('entities' in state)) return null;
  // only need to get the entities, because ids will be inferred from entities later
  const testEntities = state.entities;
  // entities must be a non-null object
  if (typeof testEntities !== 'object' || testEntities === null) return null;

  // build a new entities list by iterating over testEntities and constructing a new entity for each entry
  const entitiesList: TaskType[] = [];
  for (const testEntity of Object.values(testEntities)) {
    if (isPartialEntityType(testEntity)) {
      entitiesList.push(processEntity(testEntity));
    }
  }

  // generate array of ids
  const ids = entitiesList.map((i) => i.id);
  // reduce array of entities to a normalized state object
  const entities = entitiesList.reduce((stateObj, entity) => {
    // create object with each key of entity ids, and values of entities
    stateObj[entity.id] = entity;
    return stateObj;
  }, {} as Dictionary<TaskType>);

  return {
    ids,
    entities,
  };
};

/**
 * Attempts to read task state from localStorage.
 */
export const readTasks = () =>
  getItem('tasks', (tasks) => buildEntityState(tasks));
