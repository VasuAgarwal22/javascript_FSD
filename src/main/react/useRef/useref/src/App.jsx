import React, {createContext, Fragment, useContext, useState} from "react";
import {useRef} from "react";

function mycontext (){
  const myname = createContext('vasu');
  const value = useContext(myname);
  return(
      <div>
        <h1>value from context is : {value}</h1>
      </div>
  )
}

const App = () =>{
  // const focus = useRef(null);
  // const onClick = () =>{
  //   focus.current.value = "Hello Ujjawal";
  //   focus.current.focus();
  // }
  return(
       mycontext()
        // {/*<Fragment>*/}
        // {/*  <div>*/}
        // {/*    <button onClick={onClick}>ACTION</button><br/><br/>*/}
        // {/*  </div>*/}
        // {/*  <label>Click on the action button</label><br/>*/}
        // {/*  <textarea name="" id="" cols="10" rows="5" ref={focus}></textarea>*/}
        // {/*</Fragment>*/}
  )
}
export default App