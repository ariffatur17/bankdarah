const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    database : 'auth_db',
    user : 'root',
    password : ''
});

db.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log('MySQLDatabase is connected Successfully');
    }
})