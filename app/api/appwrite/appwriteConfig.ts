// appwrite.ts

import { Client, Storage} from "appwrite";
// Import type models for Appwrite
import { type Models } from 'appwrite';

const client: Client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e39462d784283887b3'); // Replace with your project ID

// export const account: Account = new Account(client);
// export const database: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
