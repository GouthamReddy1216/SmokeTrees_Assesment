const{insert_into_db,createConnection,fetch_db}=require('./insert_into_db');

require('dotenv').config();
const path=require('path');
const express=require('express');
const app=express();
app.use(express.json());
const port=process.env.EXP_PORT ||3000;

app.use(express.static(path.join(__dirname,'../','build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../','build', 'index.html'));
});

app.post('/user', async (req, res) => {
    try {
      const { name, address } = req.body;
      const insert_res = await insert_into_db(name, address);
      if (insert_res.success) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } 
    catch (error) {
      console.error("Error in POST request:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

app.post('/fetch',async(req,res)=>{
  try{
    const {name}=req.body;
    const fetch_res=await fetch_db(name);
    if(fetch_res.success)
    {
        res.json({success:true,addresses:fetch_res.addresses});
    }
      else
      {
        res.json({success:false});
      }
      
    }
  catch(error)
  {
    console.error('error in fetching address',error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
