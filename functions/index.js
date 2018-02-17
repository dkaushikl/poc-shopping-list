const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.someOperationInFirestore = functions.firestore
    .document('/messages/{userId}')
    .onUpdate(event => {
        // event.params.userId
    });

exports.onImageUploaded = functions.storage.object()
    .onChange((event) => {
        const object = event.data; // The Storage object.
        const fileBucket = object.bucket; // The Storage bucket that contains the file.
        const filePath = object.name; // File path in the bucket.
        const contentType = object.contentType; // File content type.
        const resourceState = object.resourceState; // 'exists' or 'not_exists' (for file/folder deletions).
        const metageneration = object.metageneration; // Number of times metadata has been generated. 
    }); 