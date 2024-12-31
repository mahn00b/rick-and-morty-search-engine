export enum Entity {
  CHARACTER,
  EPISODE,
  LOCATION,
}

export const EntityName: Record<Entity, string> = {
  [Entity.CHARACTER]: "character",
  [Entity.EPISODE]: "episode",
  [Entity.LOCATION]: "location",
};
