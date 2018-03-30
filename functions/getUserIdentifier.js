const admin = require('firebase-admin');
const functions = require('firebase-functions');

/*const cors = require('cors')({
    origin: true,
});*/

module.exports = functions.https.onRequest((req, res) => {    
    console.log('>> ', req.body.emails);
    
    let email = 'igagajm@gmail.com';
    admin.firestore()
        .collection('users', (ref) => { return ref.where('email', '==', email) })
        .get()
        .then(user => {
            //console.log('>> Exists?: ', user.exists);
            console.log('>> Size?: ', user.size);
            console.log('>> Resp: ', user.data);
            user.docs.forEach((doc, index) => {
                console.log('>> Doc ' + index + ' => ', user.docs[index].data());

            });
            return res.status(200).send('OK! ' + JSON.stringify(user.size));
        })
        .catch(e => {
            console.log('>> Resp Error: ', e);
            return res.status(200).send('Error! ' + JSON.stringify(e));
        });
});