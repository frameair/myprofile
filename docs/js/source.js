{
    var background_1 = document.querySelector('#background');
    var randNum_1 = function (center, deltaMax, deltaMin) {
        var min = center + deltaMin;
        var max = center + deltaMax;
        var rand = Math.random();
        //console.log(rand, min, max)
        var result = rand * (max - min) + min;
        //console.log(result);
        return result;
    };
    var _loop_1 = function (i) {
        var snow = document.createElement('div');
        snow.classList.add('snow');
        snow.dataset.no = i.toString();
        var animateDuration = 5000;
        var startLeft = randNum_1(50, 40, -40);
        var endLeft = randNum_1(startLeft, 30, -30);
        var endTop = randNum_1(0, 20, 0);
        var delayTime = randNum_1(0, 500, -500);
        var size = randNum_1(20, 10, -5);
        snow.style.height = size + "px";
        snow.style.width = size + "px";
        var animate_state1 = {
            opacity: [1, 0],
            top: ['100vh', endTop + "vh"],
            left: [startLeft + "vw", endLeft + "vw"]
        };
        var animate_state2 = {
            duration: animateDuration,
            easing: 'linear',
            delay: delayTime
        };
        setTimeout(function (e) {
            snow.animate(animate_state1, animate_state2);
            background_1.appendChild(snow);
            setInterval(function () {
                var startLeft = randNum_1(50, 40, -40);
                var endLeft = randNum_1(startLeft, 30, -30);
                var endTop = randNum_1(0, 20, 0);
                var delayTime = randNum_1(0, 500, -500);
                var size = randNum_1(20, 10, -5);
                //console.log(endTop);
                snow.style.height = size + "px";
                snow.style.width = size + "px";
                animate_state1.top = ['100vh', endTop + "vh"];
                animate_state1.left = [startLeft + "vw", endLeft + "vw"];
                animate_state2.delay = delayTime;
                snow.animate(animate_state1, animate_state2);
            }, animateDuration);
        }, i * 500);
    };
    // snowを用意する。
    for (var i = 0; i <= 20; i++) {
        _loop_1(i);
    }
}
{
    // item classを全セレクト
    var items_1 = document.querySelectorAll('.item');
    // animationのスタート関数。
    // view point height * viewPointRateの位置に、Subtitleが来た時点で、.item element
    // に、.item__playを付与する。
    // そうすると、animation-play-state: running; が走るという仕掛け。
    // 
    // 因みに戻り値は関数オブジェクト。viewPointRateで、位置をどうにかしたい。
    var animationStart = function (viewPointRate) {
        return function (event) {
            console.log('call animationStart');
            items_1.forEach(function (element) {
                var subtitle = element.querySelector('.item__subtitle');
                if (subtitle != null) {
                    var clientRect = subtitle.getBoundingClientRect();
                    var x = clientRect.top;
                    //console.log('clientRect', x);
                    var clientHeight = document.documentElement.clientHeight;
                    //console.log(clientHeight);
                    if (x * 1.0 < clientHeight * viewPointRate) {
                        //console.log('OK!!');
                        element.classList.add('item__play');
                    }
                }
            });
        };
    };
    // animiationStart関数を走らせる。
    // loadの状態でも見ている。一応。
    window.addEventListener('load', animationStart(0.60), false);
    document.addEventListener('scroll', animationStart(0.75), false);
}
