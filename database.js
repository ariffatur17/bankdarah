const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    database : 'auth_db',
    user : 'root',
    password : ''
});

connection.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log('MySQLDatabase is connected Successfully');
    }
})