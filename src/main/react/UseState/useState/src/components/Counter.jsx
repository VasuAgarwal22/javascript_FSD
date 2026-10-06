import React, {useState} from "react";
const Counter = () =>{
    let [count,setCount] = useState(0);
    const increment = ()=>{
        if(count >=10){
            alert("Count cannot be greater then 10")
            return;
        }
        setCount(count+1);
    }

    const decrement = ()=> {
        if (count <= 0) {
            alert("Count cannot be negative")
            return
        }

        setCount(count - 1);
    }

    return(

        <div style={{display:"inline",justifyContent:"center",alignItems:"center"}}>
            <h1 style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Counter App</h1>
            <button onClick={increment}>
                Click to Increase the count
            </button><br/><br/>
            <span>{count}</span>
            <br/> <br/>
            <button onClick={decrement}>
                Click to Decrease the count
            </button>
        </div>
    )
}

export default Counter;
