import { Client, Account,ID,Databases,Storage } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6523b6220646984a7d37');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {client, account, databases, storage, ID} 