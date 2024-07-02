import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

import {
  ENDPOINT,
  PLATFORM,
  PROJECTID,
  STORAGEID,
  DATABASEID,
  TICKETSTORAGEID,
  SALESSTORAGEID,
  USERCOLLECTIONID,
  VIDEOCOLLECTIONID,
  COMMUNITYCOLLECTIONID,
  TICKETCOLLECTIONID,
} from "@env";

import "react-native-get-random-values";
import { nanoid } from "nanoid";

export const appwriteConfig = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECTID,
  storageId: STORAGEID,
  ticketStorageId: TICKETSTORAGEID,
  salesStorageId: SALESSTORAGEID,
  databaseId: DATABASEID,
  userCollectionId: USERCOLLECTIONID,
  videoCollectionId: VIDEOCOLLECTIONID,
  communityCollectionId: COMMUNITYCOLLECTIONID,
  ticketCollectionId: TICKETCOLLECTIONID,
};

const storageId = {
  event: appwriteConfig.storageId,
  ticket: appwriteConfig.ticketStorageId,
  sell: appwriteConfig.salesStorageId,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// Register user
export async function createUserAuth(data) {
  const { email, pass, username } = data;
  try {
    const newAccount = await account.create(ID.unique(), email, pass, username);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, pass);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}
export async function createUser(email, password, username, rol, thumbnail) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
      rol,
      thumbnail,
      "123",
    );

    if (!newAccount) throw Error;

    const avatarUrl = thumbnail.uri;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        rol: rol,
        community: "123",
      },
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type, category) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId[category],
      ID.unique(),
      asset,
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100,
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

//Create Ticket
export async function createTicket(form) {
  try {
    const [thumbnailUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image", form.category),
    ]);

    const user = await getCurrentUser();

    const newTicket = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ticketCollectionId,
      ID.unique(),
      {
        title: form.title,
        description: form.description,
        date: form.date,
        creator: user.$id,
        thumbnail: thumbnailUrl,
        community: user.community,
        state: "active",
      },
    );
    return newTicket;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllTickets() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ticketCollectionId,
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)],
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)],
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    m;
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)],
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// create community
export async function createCommunity() {
  try {
    let code;
    let findCommunity;

    const resp = await getCurrentUser();
    if (resp && resp.community) {
      throw new Error("El usuario ya tiene una comunidad asociada");
    }

    do {
      code = nanoid(6); // Generar código alfanumérico de longitud 6

      findCommunity = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.communityCollectionId,
        [Query.equal("code", code)],
      );

      console.log("findCommunity total:", findCommunity.total); // Log para verificar total de documentos encontrados
    } while (findCommunity.total > 0); // Hacer esto hasta que no encuentre el código listado en la base de datos

    const newCommunity = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.communityCollectionId,
      ID.unique(),
      { code },
    );

    console.log("newCommunity:", newCommunity); // Log para verificar la nueva comunidad creada

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      resp.$id,
      { community: code },
    );

    console.log("Community updated for user:", resp.$id); // Log para verificar la actualización del usuario

    return newCommunity;
  } catch (error) {
    console.error("Error in createCommunity:", error);
    throw new Error(error);
  }
}

export async function selectCommunity(code) {
  try {
    const resp = await getCurrentUser();
    if (!resp) {
      throw new Error("No se pudo obtener la cuenta del usuario");
    }

    if (resp.community) {
      throw new Error("El usuario ya tiene una comunidad asociada");
    }

    let findCommunity = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.communityCollectionId,
      [Query.equal("code", code)],
    );

    if (findCommunity.total === 0) {
      throw new Error("No existe una comunidad con ese código.");
    }

    console.log("code", code);
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      resp.$id,
      { community: code },
    );

    // Actualización exitosa, devolver el objeto `resp` actualizado
    return resp;
  } catch (error) {
    throw new Error(error.message);
  }
}
