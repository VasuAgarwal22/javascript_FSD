import React, {useEffect, useState} from "react";
import UseEffect from "./components/useEffect.jsx";
const App = ()=>{
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  });
  useEffect(() => {
    console.log("form data received", formData);
  }, [formData]);

  const handleSubmit= (e)=>{
    e.preventDefault();
    alert("Registration is done successfully");
    console.log(formData);
  }

    const handleChange=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
        [e.target.email]:e.target.value,
        [e.target.password]:e.target.value
      })
    }

  return(
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' placeholder="Enter the name " value={formData.name} onChange={handleChange}/>
          <br/><br/>
          <input type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleChange}/>
          <br/> <br/>
          <input type="password" name='password' placeholder="Enter the password" value={formData.password} onChange={handleChange}/>
          <br/><br/>
          <button type='submit' >Register Yourself</button>
        </form>
      </div>
  )
}

export default App;
