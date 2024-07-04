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
  EVENTSTORAGEID,
  DATABASEID,
  TICKETSTORAGEID,
  PRODUCTSSTORAGEID,
  USERCOLLECTIONID,
  VIDEOCOLLECTIONID,
  COMMUNITYCOLLECTIONID,
  TICKETCOLLECTIONID,
  EVENTCOLLECTIONID,
  PRODUCTSCOLLECTIONID,
} from "@env";

import "react-native-get-random-values";
import { nanoid } from "nanoid";
import {
  formatDateForAppwrite,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
} from "./helpers";

export const appwriteConfig = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECTID,
  eventStorageId: EVENTSTORAGEID,
  ticketStorageId: TICKETSTORAGEID,
  salesStorageId: PRODUCTSSTORAGEID,
  databaseId: DATABASEID,
  userCollectionId: USERCOLLECTIONID,
  videoCollectionId: VIDEOCOLLECTIONID,
  communityCollectionId: COMMUNITYCOLLECTIONID,
  ticketCollectionId: TICKETCOLLECTIONID,
  eventCollectionId: EVENTCOLLECTIONID,
  productsCollectionId: PRODUCTSCOLLECTIONID,
};

const storageId = {
  event: appwriteConfig.eventStorageId,
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

    // encriptar pass

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        password: pass,
        rol: "user",
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

export async function getAllUsers() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
    );

    return users.documents;
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
    console.log("uploadFile", uploadedFile.$id);
    const fileUrl = await getFilePreview(uploadedFile.$id, "image", category);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type, category) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(storageId[category], fileId);
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

//Create Product
export async function createProduct(form) {
  try {
    const [thumbnailUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image", form.category),
    ]);

    const user = await getCurrentUser();

    const newProduct = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      ID.unique(),
      {
        title: form.title,
        description: form.description,
        price: parseInt(form.price),
        thumbnail: thumbnailUrl,
        seller: user.$id,
        community: user.community,
        state: "available",
      },
    );
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all products
export async function getAllProducts() {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
    );

    return products.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllUserProducts(userId) {
  try {
    const product = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.equal("seller", userId)],
    );

    return product.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProduct(productId) {
  try {
    const product = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.equal("$id", productId)],
    );

    return product.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}
export async function updateProduct(product) {
  const [thumbnailUrl] = await Promise.all([
    uploadFile(form.thumbnail, "image"),
  ]);

  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      product.$id,
      {
        title: product.title,
        description: product.description,
        price: product.description,
        thumbnail: thumbnailUrl,
        seller: product.seller,
        state: product.state,
        community: product.community,
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}

//Change Product Status
export async function changeStatusProduct(id, type) {
  try {
    const product = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      [Query.equal("$id", id)],
    );

    if (product.documents.length === 0) {
      throw new Error("Event no encontrado");
    }

    const productDocument = product.documents[0];

    // Eliminar producto de la lista de cada participante
    /*
    const participants = productDocument.buyers;
    for (const userId of participants) {
      const user = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
      );

      if (user) {
        const updatedItems = user.items.filter((productId) => productId !== id);
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          userId,
          { items: updatedItems },
        );
      }
    }
    */
    // Modificar evento
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      productDocument.$id,
      {
        state: type,
      },
    );

    return {
      event: productDocument,
      message: `El producto ${type === "canceled" ? "ha sido cancelado." : "se ha vendido"}`,
    };
  } catch (error) {
    throw new Error(error.message);
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
export async function createEvent(form) {
  try {
    const [thumbnailUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image", form.category),
    ]);

    const user = await getCurrentUser();

    const newEvent = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      ID.unique(),
      {
        title: form.title,
        description: form.description,
        thumbnail: thumbnailUrl,
        state: "active",
        date: form.date,
        users: user.$id,
        communities: user.community,
        ubication: form.ubication,
      },
    );
    return newEvent;
  } catch (error) {
    throw new Error(error);
  }
}
export async function editEvent(form) {
  console.log("llega", form);
  try {
    console.log("antes del thimb");
    const [thumbnailUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image", "event"),
    ]);
    console.log("formid", form);

    const event = await getEvent(form.$id); // Asegúrate de esperar a que getEvent devuelva el evento

    if (event.thumbnail) {
      const previousThumbnailId = event.thumbnail.split("/").pop();
      await storage.deleteFile(
        appwriteConfig.eventStorageId,
        previousThumbnailId,
      );
    }

    const updatedEvent = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      event.$id,
      {
        ...event,
        title: form.title,
        description: form.description,
        thumbnail: thumbnailUrl,
        state: "active",
        date: form.date,
        ubication: form.ubication,
      },
    );

    return updatedEvent;
  } catch (error) {
    console.error(error); // Loguea el error para más detalles
    throw new Error(error.message || "Error updating event");
  }
}

export async function getEvent(eventId) {
  try {
    console.log("id eventoo: ", eventId);
    const event = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [
        Query.equal("$id", eventId), // Utiliza Query.equal para filtrar por ID específico
      ],
    );
    console.log("eventoo: ", event.documents[0]);
    return event.documents[0];
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

//Get Ticket by Id
export async function getTicket(ticketId) {
  try {
    const ticket = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ticketCollectionId,
      [Query.equal("$id", ticketId)],
    );
    return ticket.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}

// near event
export async function getNearestEvent() {
  try {
    const currentDateTime = new Date();
    const dateOnly = currentDateTime.toISOString().split("T")[0];

    const startTime = new Date(`${dateOnly}T00:00:00.000Z`);
    const endTime = new Date(`${dateOnly}T23:59:59.999Z`);

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [
        Query.greaterThanEqual("date", currentDateTime.toISOString()), // Filtrar eventos con fecha y hora mayores que la hora actual
        Query.greaterThanEqual("date", startTime.toISOString()),
      ],
      {
        order: "asc", // Orden ascendente para obtener el evento más cercano
        limit: 1,
      },
    );

    if (posts.documents.length > 0) {
      return posts.documents[0];
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get all events by day
export async function getAllEvents(date) {
  try {
    console.log("dateee", date);
    const dateOnly = date.split("T")[0];
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [
        Query.greaterThanEqual("date", `${dateOnly}T00:00:00.000+00:00`),
        Query.lessThan("date", `${dateOnly}T23:59:59.999+00:00`),
      ],
    );
    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
// Get all events by week
export async function getAllEventsWeek(date) {
  try {
    const { firstDayOfWeek, lastDayOfWeek } = getStartAndEndOfWeek(date);

    const firstDayString = `${firstDayOfWeek.toISOString().split("T")[0]}T00:00:00.000+00:00`;
    const lastDayString = `${lastDayOfWeek.toISOString().split("T")[0]}T23:59:59.999+00:00`;

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [
        Query.greaterThanEqual("date", firstDayString),
        Query.lessThan("date", lastDayString),
      ],
    );

    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get all events by month
export async function getAllEventsMonth(date) {
  try {
    const { firstDayOfMonth, lastDayOfMonth } = getStartAndEndOfMonth(date);

    const firstDayString = `${firstDayOfMonth.toISOString().split("T")[0]}T00:00:00.000+00:00`;
    const lastDayString = `${lastDayOfMonth.toISOString().split("T")[0]}T23:59:59.999+00:00`;

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [
        Query.greaterThanEqual("date", firstDayString),
        Query.lessThan("date", lastDayString),
      ],
    );

    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changeStatusEvent(id, type) {
  try {
    const event = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [Query.equal("$id", id)],
    );

    if (event.documents.length === 0) {
      throw new Error("Event no encontrado");
    }

    const eventDocument = event.documents[0];
    console.log("evento encontrado: ", eventDocument);

    // Eliminar evento de la agenda de cada participante
    const participants = eventDocument.participants;
    for (const userId of participants) {
      const user = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
      );

      if (user) {
        const updatedAgenda = user.agenda.filter((eventId) => eventId !== id);
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          userId,
          { agenda: updatedAgenda },
        );
      }
    }
    // Modificar evento
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      eventDocument.$id,
      {
        state: type,
      },
    );

    return {
      event: eventDocument,
      message: `El evento ${type === "canceled" ? "ha sido cancelado." : "ha finalizado"}`,
    };
  } catch (error) {
    throw new Error(error.message);
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
// Get events created by user
export async function getUserEvents() {
  try {
    const user = await getCurrentUser();
    const events = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [Query.equal("users", user.$id)],
    );

    return events.documents;
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

export async function addEventToAgenda(idEvent) {
  try {
    const resp = await getCurrentUser();
    console.log("Usuario actual:", resp);

    if (resp && resp.agenda.includes(idEvent)) {
      throw new Error("Ya has confirmado tu participación en este evento.");
    }

    const eventResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [Query.equal("$id", idEvent)],
    );

    console.log("Respuesta del evento:", eventResponse);

    if (!eventResponse.documents.length) {
      throw new Error("No se ha encontrado el evento");
    }

    const event = eventResponse.documents[0];
    console.log("Evento encontrado:", event);

    if (event.participants.includes(resp.$id)) {
      throw new Error("Ya estás participando en el evento.");
    }

    const userId = resp.$id.toString();
    const eventId = idEvent.toString();

    console.log("ID del usuario:", userId);
    console.log("ID del evento:", eventId);
    console.log("Participantes antes de la actualización:", event.participants);

    console.log("Actualizando participantes del evento...");
    const updateEventResponse = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      event.$id,
      {
        participants: [...event.participants, userId],
      },
    );
    console.log("Respuesta de actualización del evento:", updateEventResponse);

    console.log("Agenda del usuario antes de la actualización:", resp.agenda);
    console.log("Actualizando agenda del usuario...");
    const updateUserResponse = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        agenda: [...resp.agenda, eventId],
      },
    );
    console.log("Respuesta de actualización del usuario:", updateUserResponse);

    return resp;
  } catch (error) {
    console.error("Error al agendar:", error.message, error);
    throw new Error(error.message);
  }
}
export async function removeEventToAgenda(idEvent) {
  try {
    const resp = await getCurrentUser();
    console.log("Usuario actual:", resp);

    const eventResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      [Query.equal("$id", idEvent)],
    );

    console.log("Respuesta del evento:", eventResponse);

    if (!eventResponse.documents.length) {
      throw new Error("No se ha encontrado el evento");
    }

    const event = eventResponse.documents[0];
    console.log("Evento encontrado:", event);

    if (!event.participants.includes(resp.$id)) {
      throw new Error("No estás participando en el evento.");
    }

    const userId = resp.$id.toString();
    const eventId = idEvent.toString();

    console.log("ID del usuario:", userId);
    console.log("ID del evento:", eventId);
    console.log("Participantes antes de la actualización:", event.participants);

    console.log("Actualizando participantes del evento...");
    const updateEventResponse = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventCollectionId,
      event.$id,
      {
        participants: event.participants.filter((item) => item !== userId),
      },
    );
    console.log("Respuesta de actualización del evento:", updateEventResponse);

    console.log("Agenda del usuario antes de la actualización:", resp.agenda);
    console.log("Actualizando agenda del usuario...");
    const updateUserResponse = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        agenda: resp.agenda.filter((item) => item != eventId),
      },
    );
    console.log("Respuesta de actualización del usuario:", updateUserResponse);

    return resp;
  } catch (error) {
    console.error("Error cancelar participación:", error.message, error);
    throw new Error(error.message);
  }
}

export async function getAgenda() {
  try {
    const resp = await getCurrentUser();

    if (!resp || resp.agenda.length === 0) {
      return [];
    }

    const agendaPromises = resp.agenda.map(async (item) => {
      const event = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.eventCollectionId,
        [Query.equal("$id", item)],
      );
      if (!event.documents[0]) {
        throw new Error("No se ha encontrado el evento");
      }
      return event.documents[0];
    });

    const agenda = await Promise.all(agendaPromises);

    return agenda;
  } catch (error) {
    console.error("Error al traer la agenda:", error);
    throw new Error(error.message);
  }
}
