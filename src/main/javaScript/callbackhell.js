function test1(clbk){
    setTimeout(()=>{
        console.log("Test1");
        clbk();
    },2000)
}

function test2(clbk){
    setTimeout(()=>{
        console.log("Test2");
        clbk();
    },1000)
}
function test3(clbk){
    setTimeout(()=>{
        console.log("test3");
        clbk();
    },200);
}
function test4(clbk){
    setTimeout(()=>{
        console.log("test4");
        clbk();
    },100);
}
//   Pyramid Shape This is known as callback hell and it is resolved with the help of promises..

test1(()=>{
    test2(()=>{
        test3(()=>{
            test4(()=>{
                console.log("Hello ")
            });
        });
    });
});



