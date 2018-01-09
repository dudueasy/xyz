    let n
    var timerId
    initiallize()
    startLoop()

    function initiallize() {
        n = 1
        $(`.images> img:nth-child(${n})`).addClass('displaying')
            .siblings().addClass('queuing')
    }

    function getImage(order) {
        return $(`.images > img:nth-child(${order})`)
    }

    function moveAwayNode($node) {
        $node.removeClass('displaying').addClass('left').one(
            'transitionend', (e) => {
                $(e.currentTarget).removeClass('left').addClass('queuing')
            }
        )
    }

    function displayNode($node) {
        $node.removeClass('queuing').addClass('displaying');
    }

    function startLoop() {
        timerId = setInterval(() => {
            if (n > 3) {
                n -= 3
            }
            moveAwayNode(getImage(n))
            let next = (n % 3) + 1
            displayNode(getImage(next))
            n += 1

        }, 1000)
     }

