const mysql = require('mysql2');

const config = require('./config');


const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

connection.getConnection((err, connection) => {
  connection.connect((err) => {
    if(err) {
      console.log('连接失败', err)
    }
    else{
      console.log('连接成功~');
    }
  })
})

module.exports = connection.promise();