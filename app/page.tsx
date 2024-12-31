"use client";
import { useState, useEffect } from "react";
import { Autocomplete } from "@/containers/Autocomplete";
import { EntitySelect } from "@/containers/EntitySelect";
import { EntityName, Entity } from "@/data/constants";
import {
  type FetchRickMortyData,
  queryCharacters,
  queryEpisodes,
  queryLocations,
} from "@/data/api";
import { useDebounce } from "@/utils";

const SearchHelpers: Record<Entity, FetchRickMortyData> = {
  [Entity.CHARACTER]: queryCharacters,
  [Entity.LOCATION]: queryLocations,
  [Entity.EPISODE]: queryEpisodes,
};

/**
 * We would love to invite you to a phone screen,
 * however we believe that phone screens are not the best way for us both
 * to understand your skills and accomplishments.
 * We have created a small exercise where you can really show off your knowledge and skills.
 * Spend no more than 30 mins-1 hour (the length of a phone screen) on the exercise.
 * Make sure to share the code and paste your link into wellfound.
 *
 *
 * At rings, we are always fetching and manipulating data
 * Your objective is to create an autocomplete search component using a graphql API
 *
 * Here are the basic requirements:
 * - The user should be able to search for least ONE types of entity
 * - After the user types something in, they should see a list suggestions
 * - When a user clicks on a suggestion, it should complete the search field with the name
 *
 *
 * We want to see from you:
 * - Translating the requirements into a solution
 * - An understanding of NextJS and GraphQL
 * - Responsive and clean interface
 *
 *
 * You are free to use any libraries you want
 * And approach the solution to this problem that you prefer
 * There is no perfect solution but you should meet the requirements
 *
 * GraphQL API
 * https://rickandmortyapi.com/documentation * https://rickandmortyapi.com/graphql
 *
 */

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [entity, setEntity] = useState<Entity>(Entity.CHARACTER);

  const search = (q: string) => {
    setQuery(q);
  };

  const populate = useDebounce(async () => {
    const res = await SearchHelpers[entity](query);

    const {
      data: { results = [] },
    } = res;
    setSuggestions(results.map((entity) => entity.name));
  }, 300);

  useEffect(() => {
    if (query !== "") {
      populate();
    } else {
      setQuery("");
      setSuggestions([]);
    }
  }, [query]);

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="w-100 flex-col space-evenly">
        <EntitySelect
          onSelectEntity={setEntity}
          defaultEntity={Entity.CHARACTER}
        />
        <div className="mt-3">
          <Autocomplete
            label={`Start typing a ${EntityName[entity]} name`}
            onChange={search}
            suggestions={suggestions}
          />
        </div>
      </div>
    </main>
  );
}
