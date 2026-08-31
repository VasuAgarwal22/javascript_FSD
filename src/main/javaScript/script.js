// const num = [1,2,3,4,5,6,7,8,9,10];
// const ans = num.filter(num => num%2 === 0);
// console.log(ans);

// const num = [11,22,32,41,5,62,73,81,9];
// const ans = num.map((num)=>{
//     return num*num;
// })
// console.log(ans);

const num = [1,2,3,4,5,6,7,8,9];
const ans = num.reduce((num,acc)=>{
    return num + acc;
},0);
console.log(ans);