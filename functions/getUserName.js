const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

module.exports = functions.https.onRequest((req, res) => {    
    return cors(req, res, () => {
        // Checking params
        if(!req.body.userIds)
            return res.status(200).send({});

        Promise.all(req.body.userIds.map(userId => {
            console.log('Searching: ', userId);
            return admin.firestore().collection('users').where('uid', '==', userId).get();
        }))
            .then(responses => {
                let processedResponses = {};
                responses.forEach((query, index) => {
                    query.docs.forEach(doc => {
                        processedResponses[req.body.userIds[index]] = doc.data().displayName;
                    });
                });
                return res.status(200).send(processedResponses);
            })
            .catch(error => {
                console.log('Error: ', error);
                return res.status(200).send('Error');
            });
    });
});