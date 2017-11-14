
var arr = [5,1,4,2,8]

function bubbleSort(arr) {
    var length = arr.length,
        i,
        j,
        temp
    for(i = length-1; i>0; i--){
        for(j=0;j<i;j++){
            if (arr[j]>arr[j+1]){
                temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr

}

console.log(bubbleSort(arr))