//入桶
function cube_sort(arr){
    var newArr = []
    arr.forEach(function (value, index) {
        if (newArr[value] == undefined) {
            newArr[value] = 1
        }
        else {
            newArr[value] += 1
        }
    })
    return newArr
}


//出桶
function cube_out(cube_arr){
    var newArr = []
    cube_arr.forEach(function (value, index) {
        if(value != undefined){
            for(var i=1; i<=value;i++){
                newArr.push(index)
            }
        }
    })
    return newArr
}


arr_a = [1,33,4,33,2,5,6,77,4,3,5,775,3,3,2]

newArr = cube_sort(arr_a)
console.log(newArr)
// newArr.forEach(function (value, index) { console.log(index,value) })

arr_out = cube_out(newArr)
console.log(arr_out)