
var arr = [5,1,4,2,8,9,5,22,3,5,6,889,0,7,6,4,3,2,4,455]

// 1,4,2,5,8
//1,2,4,5,8
//
//

function bubbleSort (array){
    var length = array.length,
        i,
        j,
        tmp
    for(i = length-1; i>1;i--){
        for(j=0;j<i;j++){
            if(array[j] > array[j+1]){
                tmp = array[j+1]
                array[j+1] = array[j]
                array[j] = tmp
            }
        }
    }
    return array
}

console.log(bubbleSort(arr))








// function bubbleSort(arr) {
//     var length = arr.length,
//         i,
//         j,
//         temp
//     for(i = length-1; i>0; i--){
//         for(j=0;j<i;j++){
//             if (arr[j]>arr[j+1]){
//                 temp = arr[j+1]
//                 arr[j+1] = arr[j]
//                 arr[j] = temp
//             }
//         }
//     }
//     return arr
//
// }
//
// console.log(bubbleSort(arr))