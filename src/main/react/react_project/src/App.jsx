// import React from 'react';
// import Student1 from './components/Student1';
//
// const App = () => {
//     return (
//         <div>
//             <h1>My Student Records</h1>
//             <div style={{ display: 'flex', gap: '20px'}}>
//                 <Student1 name={"Vasu Agarwal"} rollNo={1} Course={"CSE"} Year={"3rd Year"} img = {"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_lufX2EdkEtCNXEsmNPZNnFeLyxux6UNECD8OSq7uq0ovaVppO1Z9QuE&s=10"}/>
//                 <Student1  name={"Yash Singh"} rollNo={2} Course={"ECE"} Year={"2rd Year"} img = {"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmBJXdHWaunYe-aiilvMfp19Whl-WH3aAGosuqDHAPFAINNUBs5DMRzayx&s=10"}/>
//                 <Student1  name={"Ujjwal Singhal"} rollNo={4} Course={"ME"} Year={"3rd Year"} img={"https://t4.ftcdn.net/jpg/04/90/69/01/360_F_490690196_dlslwWfArjYqqYi9sda3knNBoqHIJpjH.jpg"}/>
//                 <Student1 img={"https://t4.ftcdn.net/jpg/03/85/15/17/360_F_385151769_K5O6McT4sWlgdYz4iTyiPfmc1zVF0ZeA.jpg"}/>
//             </div>
//         </div>
//     );
// };
//
// export default App;

import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
function HomePage(){
    return(
        <h1>Hello!! Welcome to the Home Page.</h1>
    )
}
function About(){
    return(
        <h1>Hello!! Welcome to the About Page.</h1>
    )
}
function ContactUs(){
    return(
        <h1>Hello!! Welcome to the Contact Page.</h1>
    )
}
const App = () =>{
    return(
      <BrowserRouter>
          <nav >
              <Link to={"/home"}>HOME</Link>
              <Link to={"/about"}>ABOUT US</Link>
              <Link to={"/phone"}>PHONE </Link>
          </nav>
          <Routes>
              <Route path ="/home" element={<HomePage/>}/>
              <Route path={"/about"} element={<About/>}/>
              <Route path={"/phone"} element={<ContactUs/>}/>
          </Routes>
      </BrowserRouter>
    )
}

export default App
