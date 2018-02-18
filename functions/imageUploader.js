const functions = require('firebase-functions');
const admin = require('firebase-admin');

const host = 'https://firebasestorage.googleapis.com/v0/b';
const bucket = 'shopping-list-db.appspot.com/o';
const altAndToken = '?alt=media&token=';

module.exports = functions.storage.object()
    .onChange((event) => {
        // The Storage object
        const object = event.data;
        const token = event.data.metadata.firebaseStorageDownloadTokens;
        const pathSlices = object.name.split('/');
        Object.keys(event.data).forEach((v) => {
            console.log('V: ' + v + ' ===> ', JSON.stringify(event.data[v]));
        });

        // If the folder/file has been delete, the value is "not_exists"
        if(object.resourceState === 'exists') {
            console.log('> Added or updated file...: ', object.name);
            console.log('> Full URL?...: ', event.resource);
            console.log(`ListId: ${pathSlices[1]}, fileName: ${pathSlices[2]}`);
            const docRef = `/shopping-lists/${pathSlices[1]}`;
            admin.firestore().doc(docRef).get()
                .then(doc => doc.ref.get())
                .then(shoppingList => {
                    let attachments = shoppingList.data().attachments || [];
                    let downloadUrl = `${host}/${bucket}/${encodeURIComponent(object.name)}${altAndToken}${token}`;
                    console.log('>> Download URL: ', downloadUrl);
                    return admin.firestore().doc(docRef).update({
                        attachments: [...attachments, {
                            name: pathSlices[2],
                            size: event.data.size,
                            ts: event.data.timeCreated,
                            url: downloadUrl
                        }]
                    });
                })
                .catch(error => console.log('Error: ', error));
        } else {
            console.log('> deleted');
            return null;
        }
    });