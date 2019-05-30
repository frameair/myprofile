{
    const background = document.querySelector('#background');

    const randNum = (center, deltaMax, deltaMin) : number => {
        const min = center + deltaMin;
        const max = center + deltaMax;
        
        const rand = Math.random();
        //console.log(rand, min, max)
        const result =  rand * ( max - min ) + min;
        //console.log(result);

        return result;
    }

    // snowを用意する。
    for (let i = 0; i <= 20; i++) {
        const snow = document.createElement('div');

        snow.classList.add('snow');       
        snow.dataset.no = i.toString();

        const animateDuration = 5000;

        const startLeft = randNum(50, 40, -40);
        const endLeft = randNum(startLeft, 30, -30);
        const endTop = randNum(0, 20, 0);
        const delayTime = randNum(0, 500, -500);
        const size = randNum(20, 10, -5);

        snow.style.height = `${size}px`;
        snow.style.width = `${size}px`;

        const animate_state1 = {
            opacity: [1, 0],
            top: ['100vh', `${endTop}vh`],
            left: [`${startLeft}vw`, `${endLeft}vw`],
        };

        const animate_state2 = {
            duration: animateDuration,
            easing: 'linear',
            delay: delayTime
        }

        setTimeout((e) => {
            snow.animate(animate_state1, animate_state2);
            background.appendChild(snow);

            setInterval(() => {
                const startLeft = randNum(50, 40, -40);
                const endLeft = randNum(startLeft, 30, -30);
                const endTop = randNum(0, 20, 0);
                const delayTime = randNum(0, 500, -500);
                const size = randNum(20, 10, -5);

                //console.log(endTop);

                snow.style.height = `${size}px`;
                snow.style.width = `${size}px`;
    
                animate_state1.top = ['100vh', `${endTop}vh`];
                animate_state1.left = [`${startLeft}vw`, `${endLeft}vw`];
                animate_state2.delay = delayTime;

                snow.animate(animate_state1, animate_state2);
            }, animateDuration)
        }, i * 500)
    }
}

{
    // item classを全セレクト
    const items = document.querySelectorAll('.item');

    // animationのスタート関数。
    // view point height * viewPointRateの位置に、Subtitleが来た時点で、.item element
    // に、.item__playを付与する。
    // そうすると、animation-play-state: running; が走るという仕掛け。
    // 
    // 因みに戻り値は関数オブジェクト。viewPointRateで、位置をどうにかしたい。
    const animationStart = (viewPointRate : number) => {
        return (event) => {
            console.log('call animationStart')

            items.forEach((element : HTMLDivElement) => {
                const subtitle = element.querySelector('.item__subtitle');
    
                if (subtitle != null) {
                    const clientRect = subtitle.getBoundingClientRect();
                    const x = clientRect.top;
                    //console.log('clientRect', x);
    
                    const clientHeight = document.documentElement.clientHeight;
                    //console.log(clientHeight);
    
                    
                    if (x * 1.0 < clientHeight * viewPointRate) {
                        //console.log('OK!!');
                        element.classList.add('item__play');
                    }
                }
            });    
        }
    };
    
    // animiationStart関数を走らせる。
    // loadの状態でも見ている。一応。
    window.addEventListener('load', animationStart(0.60), false);
    document.addEventListener('scroll', animationStart(0.75), false);

}