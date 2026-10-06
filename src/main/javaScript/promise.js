    function f1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Hi !!");
            resolve();
        },4000)
    })
    }

    function f2(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("ABES Engineering College");
                resolve();
            },2000);
        })
    }
    f1().then(f2).catch((err)=>{
        console.log("ERROR",err);
    })
