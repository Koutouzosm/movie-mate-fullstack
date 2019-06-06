import app from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.db = app.database()
    }


    // DEFINE FIREBASE METHODS
    // message is an object

    send = message => this.db.ref('chat').push(message)

    chat = () => this.db.ref('chat')


}

export default Firebase