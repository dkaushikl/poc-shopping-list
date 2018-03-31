const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

module.exports = functions.https.onRequest((req, res) => {    
    return cors(req, res, () => {
        // Checking params
        if(!req.body.emails)
            return res.status(200).send({});

        Promise.all(req.body.emails.map(email => {
            console.log('Searching: ', email);
            return admin.firestore().collection('users').where('email', '==', email).get();
        }))
            .then(responses => {
                let processedResponses = {};
                responses.forEach((query, index) => {
                    query.docs.forEach(doc => {
                        processedResponses[req.body.emails[index]] = doc.data();
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