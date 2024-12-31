import { useState } from "react";
import { EntityName, Entity } from "@/data/constants";
import { Select, type Option } from "@/components/Select";
import { capitalize } from "@/utils";

const entityOptions: Option<Entity>[] = Object.keys(EntityName).map((k) => ({
  value: +k,
  label: capitalize(EntityName[+k as Entity]),
}));

export interface EntitySelectProps {
  defaultEntity?: Entity;
  onSelectEntity: (e: Entity) => void;
}

export function EntitySelect({
  onSelectEntity,
  defaultEntity = Entity.CHARACTER,
}: EntitySelectProps) {
  const [entity, setEntity] = useState(defaultEntity);

  const handleChange = (value: Entity) => {
    if (Entity[value] && value !== entity) {
      onSelectEntity(value);
      setEntity(value);
    }
  };

  return (
    <Select options={entityOptions} value={entity} onChange={handleChange} />
  );
}

export default EntitySelect;
