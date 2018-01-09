let n
initiallize()
setInterval(()=>{
    if(n>3){n-=3}

    displayNode(getImage(n))

    let next = (n%3)+1
    moveAwayNode(getImage(next))

    n+=1
}, 1000)



function initiallize(){
    n =1
    $(`.images> img:nth-child(${n})`).addClass('displaying')
        .siblings().addClass('queuing')
}

function getImage(order) {
    return $(`.images > img:nth-child(${order})`)
}

function displayNode($node) {
    $node.removeClass('displaying').addClass('left').one(
        'transitionend',(e)=>{
            $(e.currentTarget).removeClass('left').addClass('queuing')
        }
    )
}

function moveAwayNode($node){
    $node.removeClass('queuing').addClass('displaying');
}
