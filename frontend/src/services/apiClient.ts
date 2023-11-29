import { setupAPIClient } from "./api";
import { setupAPIClientTmdb } from "./apiTmdb";

export const api = setupAPIClient();
export const apiTmdb = setupAPIClientTmdb();
