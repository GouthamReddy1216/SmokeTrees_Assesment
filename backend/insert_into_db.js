const mysql=require('mysql2');
require('dotenv').config(); // Load environment variables from .env

// Function to create a single connection
function createConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true,
    enableKeepAlive: true, 
    keepAliveInitialDelay: 10000, 
  });
}

function insert_into_db(name, address) {
    return new Promise((resolve, reject) => {
      const connection=createConnection();
      connection.connect((err)=>{
        if(err)
        {
            console.log('connecting to DB from insertDB',err);
        }
        else{
        console.log("Connected to DB");
        const search_if_user_exists=`select ID from USERS where NAME=?`
        const query1 = 'INSERT INTO users (name) VALUES (?)';
        const query2='INSERT INTO ADDRESS (address,user_ID) VALUES(?,?)';
        
        connection.query(search_if_user_exists,[name],(err,res)=>{
            if(err)
            {
                console.error("Error executing searcing id of existing user:", err);
                return reject({ success: false });
            }
            if(res.length===0)
            {
              console.log('excuting new name query')
              connection.query(query1, [name], (err, res) => {
                if (err) {
                  console.error("Error executing query1:", err);
                  return reject({ success: false });
                }
                const user_id=res.insertId;
                connection.query(query2,[address,user_id],(err,res)=>{
                  if (err) {
                      console.error("Error executing query2:", err);
                      return reject({ success: false });
                    }
                    console.log("Data inserted successfully");
                    connection.end();
                    resolve({ success: true });
                })
                
              });
            }
            else
            {
              console.log('excueting existing user id')
              console.log(res);
                const user_id=res[0].ID;
                connection.query(query2,[address,user_id],(err,res)=>{
                    if (err) {
                        console.error("Error executing query2:", err);
                        return reject({ success: false });
                      }
                      console.log("Data inserted successfully");
                      connection.end();
                      resolve({ success: true });
                  })
            }
        })
      }
      });
    });
  }
function fetch_db(name){
  return new Promise((resolve,reject)=>{
    const connection=createConnection();
    const query1=`select ID from users where name=?`
    const query2=`select a.address as Your_Address from address a inner join users u on u.ID=a.user_ID where user_ID=?;`;
    connection.connect((err)=>{
        if(err)
        {
            console.log(err);
            reject({success:false});
        }
        else{
            connection.query(query1,[name],(err,res)=>{
                if(err){
                    console.log(err);
                    reject({success:false});
                    connection.end();
                }
                else{
                    if(res.length>0)
                    {
                    const user_id=res[0].ID;
                    connection.query(query2,[user_id],(err,res)=>
                    {
                        if(err)
                        {
                            console.log(err);
                            connection.end();
                        }
                        else
                        {
                            const newdata=res.map((ele)=>{return ele.Your_Address});
                            resolve({success:true,iswrongname:false,addresses:newdata});
                            connection.end();
                        }
                    }
                    )
                  }
                  else{
                    resolve({success:true,iswrongname:true,addresses:[]});
                    connection.end();
                  }
                }
            })
       
        }
    })
  })
}
module.exports={
    insert_into_db,
    createConnection,
    fetch_db
};
