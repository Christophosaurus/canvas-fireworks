import './styles/main.scss';

//(() => {
//    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
//
//    if (!canvas) {
//        throw new Error('Canvas not found');
//    }
//
//    // context is type `CanvasRenderingContext2D`
//    const context = canvas.getContext('2d');
//
//    if (!context) {
//        throw new Error('Cannot get canvas context');
//    }
//
//    const width = canvas.width;
//    const height = canvas.height;
//})();



import { randomIntFromRange } from './utils';

(() => {
    const canvas = document.querySelector('canvas')
    if( !canvas ) {
        throw new Error('No canvas element found');
    }
    const context = canvas.getContext('2d')

    canvas.width = innerWidth
    canvas.height = innerHeight

    const mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
    }

    //const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

    // Event Listeners
    addEventListener('mousemove', (event: MouseEvent) => {
        mouse.x = event.clientX
        mouse.y = event.clientY
    })

    addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight

        init()
    })

    // Canvas Objects
    class CanvasObject {

        constructor(
            public context: CanvasRenderingContext2D,
            public x: number,
            public y: number,
            public radius: number,
            public color: string
        ) {}

        draw() {
            this.context.beginPath()
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            this.context.fillStyle = this.color
            this.context.fill()
            this.context.closePath()
        }

        update() {
            this.draw()
        }
    }

    // Implementation
    let objects: CanvasObject[];
    function init() {
        objects = []

        for (let i = 0; i < 400; i++) {
            objects.push()
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate)

        if( !context || !canvas ) {
            throw new Error('No Canvas or Context');
        }

        context.clearRect(0, 0, canvas.width, canvas.height)

        // objects.forEach(object => {
        //  object.update()
        // })

    }

    init()
    animate()
})();
