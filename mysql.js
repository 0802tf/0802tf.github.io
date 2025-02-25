import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '0000',
    database: 'mysql'
});
connection.connect(error => {
    if (error) {
        console.log('error connecting: ' + error.stack);
        return;
    }
    console.log('success');
});
connection.query('SELECT * FROM user', (error, results) => {
    if (error) {
        console.log('error: ' + error.stack);
        return;
    }
    console.log(results);
});