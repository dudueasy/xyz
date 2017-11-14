
function insertSort(arr) {

    function swap(array,i,j) {
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    var length = arr.length,
        i,
        j

    for(i =1; i<length; i++){
        for(j=0; j<i; j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1)
            }
        }
    }
    return arr

}

console.log(insertSort([2,3,5,3,1,6,3,9]))