#!/usr/bin/env

console.log('\n======= FIREBASE PUSHING MESSAGES =======');

// Now, using destructuring, extract the command line arguments passed
// The first one is node execution
// The second one is the own file
const [,,userIIDToken] = process.argv;
console.log('[FIREBASE PUSH MSG] Checking arguments...');
console.log('[FIREBASE PUSH MSG] Arguments passed: ', userIIDToken);
if(userIIDToken) {
    console.log('[FIREBASE PUSH MSG] Arguments are valid... token provided!!');
    const serverKey = 'AAAA98qEWGc:APA91bEYo2_2D13cnyW7PJQ427VCE4KAglwSzTpbuqagqjbcGVlPRxmZHUPm0Mw_VFfDEDjLV5sfHh8oZLOYM-e7Dzjih7WmEVKPsGR140Z9eSZ57JKJuIeZTJtMsOrvSeQywZiKTUyT';
    const targetUserIIDToken = userIIDToken;
    
    console.log('[FIREBASE PUSH MSG] Preparing the notification');
    const fetch = require('fetch').fetchUrl;
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Authorization': `key=${serverKey}`,
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({
            notification: {
                title: 'Title push',
                body: 'I am the body',
                icon: 'https://www.shareicon.net/download/2016/07/08/117548_google_512x512.png',
                click_action: 'http://localhost:8100'
            },
            to: targetUserIIDToken
        })
    }, (error, meta, body) => {
        if(error) {
            console.log('[FIREBASE PUSH MSG] Error: \n', error)
        } else {
            console.log('[FIREBASE PUSH MSG] Notification sent! Meta: ', meta);
            console.log('[FIREBASE PUSH MSG] Notification sent! Body: ', new Buffer(body).toString('utf8'));
        }
    });
} else {
    console.log('\n[FIREBASE PUSH MSG] Error... token not provided\n');
}
