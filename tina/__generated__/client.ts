import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '8581272dba0df6b0c7887328fe4ec59630a18fe6', queries,  });
export default client;
  