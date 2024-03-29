import { openDB } from "idb";

const initdb = async () =>
	openDB("pwate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("pwate")) {
				console.log("pwate database already exists");
				return;
			}
			db.createObjectStore("pwate", { keyPath: "id", autoIncrement: true });
			console.log("pwate database created");
		},
	});

// Accepts some content and add it to the database.
export const putDb = async (content) => {
	console.log("PUT to the database");

	// Create a connection to the database and version we want to use.
	const jateDb = await openDB("pwate", 1);

	// Create a new transaction and specify the database and data privileges.
	const tx = jateDb.transaction("pwate", "readwrite");

	// Open up the desired object store.
	const store = tx.objectStore("pwate");

	// Use the .put() method to update data in the database.
	// The text editor consists of one field of information that is repeatedly retrieved and updated.
	const request = store.put({ id: 1, value: content });

	// Get confirmation of the request.
	const result = await request;
	console.log("🚀 - data saved to the database", result);
};

// Gets all the content from the database.
export const getDb = async () => {
	console.log("GET from the database");

	// Create a connection to the database and version we want to use.
	const jateDb = await openDB("pwate", 1);

	// Create a new transaction and specify the database and data privileges.
	const tx = jateDb.transaction("pwate", "readonly");

	// Open up the desired object store.
	const store = tx.objectStore("pwate");

	// Use the .get() method to get the one text editor entry from the database.
	const request = store.get(1);

	// Get confirmation of the request.
	const result = await request;
	// If there is a text editor entry, return it.
	result
		? console.log("🚀 - data retrieved from the database", result.value)
		: console.log("🚀 - data not found in the database");
	return result?.value;
};

initdb();
