function sum(a,b){
    return a+b;
}
function sumWithMessage(clbk,msg){
   const ans = clbk(20,30);
   const fresult = "Hi "+msg + " your score is : " + ans;
    console.log(fresult);
}
sumWithMessage(sum,"Mr. Vasu");