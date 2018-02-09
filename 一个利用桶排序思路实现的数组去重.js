
function unique(array){
    let length = array.length
    let container = {}
    let unique_array = []

    // 执行一次遍历
    for (let i=0; i<length; i++){
        // 获得每一次遍历时, 数组的当前元素值
        current_value = array[i]

        // 检查容器中是否有以 current_value 为key的元素.
        // 如果找不到, 那么将它入桶, 并存入 unique_array
        if( !container[current_value]){
            container[current_value] = true
            unique_array.push(current_value)
        }
    }

    return unique_array
}

console.log(unique([1,5,2,3,4,2,3,1,3,4]))