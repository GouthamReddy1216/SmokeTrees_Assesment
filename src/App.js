import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios'
function App() {
  const[name,setName]=useState('');
  const[address,setAddress]=useState('');
  const [searchterm,setSearchterm]=useState('');
  const[fetchedAddresses,setFetchAddresses]=useState([]);
  const [message, setMessage] = useState('');

  const remove_whitespace=(str)=>str.trim();

  const handleusername=(e)=>{
    setName(e.target.value);
  }
  const handleaddress=(e)=>{
    setAddress(e.target.value);
  }
  const handlesubmit = async (e) => 
{
    const[iname,iaddress]=[remove_whitespace(name),remove_whitespace(address)]
    if(iname==='')
    {
      alert('please enter a name');
    }
    else if(iaddress==='')
    {
      alert('please enter an Address');
    }
    else{
    try {
      const res = await axios.post('/user', {
        name: iname,
        address: iaddress
      });
        if (res.data.success) {
        alert("Data added successfully");
        setName('');
        setAddress('');
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  }
  };
  
  const handleSearchterm=(e)=>{
    setSearchterm(e.target.value);
  }
  const handlefetch=async (e)=>{
    const[isearchterm]=[remove_whitespace(searchterm)]
    if(isearchterm==='')
    {
      alert('please enter a value');
    }
    else
    {
      try {
        const res = await axios.post('/fetch', {
          name: remove_whitespace(searchterm)
        });
        if (res.data.success) {
          if ((res.data.addresses).length === 0) {
            setMessage(`No addresses found for ${searchterm}`);
            setFetchAddresses([]);
          } else {
            setFetchAddresses(res.data.addresses);
            setMessage('');
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage('An error occurred while fetching addresses');
      }
    }
  }
  return (
    <div className="App">
      <div className='insertform'>
        <h2 className="form-title">Insert User Information</h2>
        <p className="form-description">Please enter your details below to add a new user.</p>
        <span>NAME</span>
        <input type='text' value={name} placeholder='Please enter your name' onChange={handleusername}/>
        <span>ADDRESS</span>
        <textarea value={address} placeholder='Please enter your address' onChange={handleaddress}></textarea>
        <button onClick={(e)=>{handlesubmit(e)}}>SUBMIT</button>
      </div>

      <div className='searchform'>
        <h2 className="form-title">Search User Address</h2>
        <p className="form-description">Enter a user's name to fetch their address from our database.</p>
        <span>NAME</span>
        <input type='text' value={searchterm} placeholder='Please enter a name to search' onChange={handleSearchterm}/>
        <button onClick={(e)=>{handlefetch(e)}}>FETCH MY ADDRESS</button>
        
        {message && <p className="message">{message}</p>}
        
        {fetchedAddresses.length > 0 && (
          <div className="fetched-addresses">
            <h3>Addresses found:</h3>
            <ul>
              {fetchedAddresses.map((addr, index) => (
                <li key={index}>{addr}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
