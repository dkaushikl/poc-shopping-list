const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.someOperationInFirestore = functions.firestore
    .document('/messages/{userId}')
    .onUpdate(event => {
        // event.params.userId
    });

exports.onImageUploaded = require('./imageUploader');