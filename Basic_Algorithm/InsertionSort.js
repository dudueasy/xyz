
function insertSort(arr) {

    function swap(x,y,array){
        var tmp;
        tmp = arr[x]
        array[x] = array[y]
        array[y] = tmp
    }

    var length = arr.length,
        i,  //表示已经排序过的元素, 初始为1
        j   //表示下一个要处理的元素的下标.
    for(i = 1;i<length;i++){
        for(j=i;j>0;j--){
            if(arr[j] < arr[j-1]){
                swap(j,j-1,arr)
            }
        }
    }
    return arr

}

console.log(insertSort([9,7,54,331,4,33,5,3,1,6,30,3]))