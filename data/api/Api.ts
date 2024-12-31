"use server";
import { unstable_cache } from "next/cache";
import * as api from "rickmortyapi";
import { Entity } from "../constants";
import type {
  Character,
  Location,
  Episode,
  ApiResponse,
  Info,
} from "rickmortyapi";

export type CharacterResponse = ApiResponse<Info<Character[]>>;
export type LocationResponse = ApiResponse<Info<Location[]>>;
export type EpisodeResponse = ApiResponse<Info<Episode[]>>;

export type RickMortyData =
  | CharacterResponse
  | LocationResponse
  | EpisodeResponse;

export type FetchRickMortyData = (q: string) => Promise<RickMortyData>;

async function searchWithCache<T extends RickMortyData>(
  namespace: Entity,
  query: string,
  fetchData: FetchRickMortyData
): Promise<T> {
  // Check if the data exists in the cache
  const cachedResponse = await unstable_cache(
    fetchData,
    [String(namespace), query],
    {
      revalidate: 60 * 60,
    }
  )(query);

  return cachedResponse as T;
}

export async function queryCharacters(
  query: string
): Promise<CharacterResponse> {
  try {
    const request = async (q: string) => {
      return await api.getCharacters({
        name: q,
      });
    };

    return await searchWithCache<CharacterResponse>(
      Entity.CHARACTER,
      query,
      request
    );
  } catch (err) {
    const message = `Error querying caracters using query: ${query}`;

    console.error(message, err);
    return {
      status: 500,
      statusMessage: `Error querying caracters using query: ${query}`,
      data: {
        results: [],
      },
    };
  }
}

export async function queryLocations(query: string): Promise<LocationResponse> {
  try {
    const request = async (q: string) => {
      return await api.getLocations({
        name: q,
      });
    };

    return await searchWithCache<LocationResponse>(
      Entity.LOCATION,
      query,
      request
    );
  } catch (err) {
    const message = `Error querying locations using query: ${query}`;

    console.error(message, err);
    return {
      status: 500,
      statusMessage: message,
      data: {
        results: [],
      },
    };
  }
}

export async function queryEpisodes(query: string): Promise<EpisodeResponse> {
  try {
    const request = async (q: string) => {
      return await api.getLocations({
        name: q,
      });
    };

    return await searchWithCache<EpisodeResponse>(
      Entity.EPISODE,
      query,
      request
    );
  } catch (err) {
    const message = `Error querying episodes using query: ${query}`;

    console.error(message, err);
    return {
      status: 500,
      statusMessage: message,
      data: {
        results: [],
      },
    };
  }
}
