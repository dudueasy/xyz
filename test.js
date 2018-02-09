// let array_n = [2, 3, 4, 3, 2, 24, 4, 5, 4, 23, 1, 23, 12, 32, 3, 24, 3, 5, 6, 6, 87, 9, 8, 8, 76, 75, 6, 45, 45]
//
// function switchIndex(array, i, j) {
//     let temp = array[i]
//     array[i] = array[j]
//     array[j] = temp
// }
//
// function bubbleSort(array) {
//     for (var i = 0 ; i < array.length-2 ; i++) {
//         for (var j = array.length-1 ; j>0 ;j--) {
//
//              if (array[i] > array[i+1]) {
//                 switchIndex(array, i, (i+1))
//             }
//         }
//     }
//     return array
// }
//
// console.log(bubbleSort(array_n))

// 假设有数组 array = [1,5,2,3,4,2,3,1,3,4]
// 你要写一个函数 unique，使得
// unique(array) 的值为 [1,5,2,3,4]
