const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8',
  database: 'webData'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Error executing MySQL query');
      return;
    }
    res.json(results);
    console.log("dsadads")
  });
});

// 在这里编写你的Express路由和处理程序


module.exports = mysqlQuery;



// router.post('/users', (req, res) => {
//     const { name } = req.body;
//   // 处理表单数据
//   res.json({ message: 'User created successfully!' });
// });