// import mysql from 'mysql2';
import mysql from 'mysql2/promise';

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ridanode'
// });

// const pool = mysqlPool.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ridanode'
// }); 

// local
const connection = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'ADT6nba76qPbC0',
    database: 'minigame'
});

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'minigame'
// });

// vps
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'admin',
//     password: 'Xe9y8RNfRdGAco6',
//     database: '8rmr_rida080srfd'
// });

export default connection;