import './styles/main.scss';

(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (!canvas) {
        throw new Error('Canvas not found');
    }

    // context is type `CanvasRenderingContext2D`
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Cannot get canvas context');
    }

    const width = canvas.width;
    const height = canvas.height;

    context.textAlign = 'center';
    context.font = '30px Shadows Into Light';
    context.fillText('well... this is interesting', width / 2, height / 2 + 10);

    // eslint-disable-next-line
    console.log('Startup complete - happy coding');
})();
