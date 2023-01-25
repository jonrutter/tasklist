import type { TagType } from './tagsSlice';
import { isColor } from '@/data/colors';
import type { Dictionary, EntityState } from '@reduxjs/toolkit';
import { getItem } from '@/lib/localStorage';

/** Type predicate for PriorityType */
const isTag = (tag: unknown): tag is TagType => {
  // tag should be a non-null object
  if (typeof tag !== 'object' || tag === null) return false;
  // tag should have a name and id prop
  if (!('name' in tag) || !('id' in tag)) return false;
  // if tag has a color, it must be colortype
  if ('color' in tag) return isColor((tag as TagType).color);
  // otherwise, it has all the required properties for a tag
  return true;
};

/** Takes a JSON string of a potentially correct EntityState, and returns either a full type-safe EntityState object for use in a reducer, or null if conversion is impossible. */
const buildEntityState = (state: unknown): EntityState<TagType> | null => {
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
  const entitiesList: TagType[] = [];
  for (const testEntity of Object.values(testEntities)) {
    if (isTag(testEntity)) {
      const { name, id, color } = testEntity;
      entitiesList.push({ name, id, color });
    }
  }

  // generate array of ids
  const ids = entitiesList.map((i) => i.id);
  // reduce array of entities to a normalized state object
  const entities = entitiesList.reduce((stateObj, entity) => {
    // create object with each key of entity ids, and values of entities
    stateObj[entity.id] = entity;
    return stateObj;
  }, {} as Dictionary<TagType>);

  return {
    ids,
    entities,
  };
};

/**
 * Attempts to read task state from localStorage.
 */
export const readTags = () => getItem('tags', (tags) => buildEntityState(tags));
