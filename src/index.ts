import { randomIntFromRange } from './utils';
import './styles/main.scss';

(() => {
    const MIN_FIREWORK_RADIUS = 3;
    const PARTICLE_COUNT = 400;
    const GRAVITY = 0.005;
    const FRICTION = 0.99;
    const FIREWORK_POWER = 8;

    const canvas = document.querySelector('canvas');
    if (!canvas) {
        throw new Error('No CANVAS element found');
    }
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('No CONTEXT element found');
    }

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2,
    };

    //const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

    // Event Listeners
    addEventListener('mousemove', (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        init();
    });

    // Canvas Objects
    class Particle {
        constructor(
            public context: CanvasRenderingContext2D,
            public x: number,
            public y: number,
            public radius: number,
            public color: string,
            public velocity: { x: number; y: number },
            public alpha = 1,
        ) {}

        draw() {
            this.context.save();
            this.context.globalAlpha = this.alpha;
            this.context.beginPath();
            this.context.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2,
                false,
            );
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
            this.context.restore();
        }

        update() {
            this.draw();
            this.velocity.x *= FRICTION;
            this.velocity.y *= FRICTION;
            this.velocity.y += GRAVITY;
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.alpha -= 0.005;
        }
    }

    // Implementation
    let particles: Particle[];
    function init() {
        particles = [];
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        if (!context || !canvas) {
            throw new Error('No Canvas or Context');
        }

        context.fillStyle = 'rgba(0 ,0 ,0 , 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // paint the particles to the canvas
        particles.forEach((particle: Particle, index: number) => {
            if (particle.alpha > 0) {
                particle.update();
            } else {
                particles.splice(index, 1);
            }
        });
    }

    init();
    animate();

    window.addEventListener('click', function (event: MouseEvent) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        const angleIncrement = (Math.PI * 2) / PARTICLE_COUNT;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(
                new Particle(
                    context,
                    mouse.x,
                    mouse.y,
                    MIN_FIREWORK_RADIUS,
                    `hsl(${Math.random() * 360}, 50%, 50%`,
                    {
                        x:
                            Math.cos(angleIncrement * i) *
                            Math.random() *
                            FIREWORK_POWER,
                        y:
                            Math.sin(angleIncrement * i) *
                            Math.random() *
                            FIREWORK_POWER,
                    },
                ),
            );
        }
    });
})();
