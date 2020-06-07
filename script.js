let userImg;

window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            // let img = new Image();
            // img.onload = convertImageToCanvas;
            // img.onerror = failed;
            // img.src = URL.createObjectURL(this.files[0]);
            userImg = URL.createObjectURL(this.files[0]);
        }
    });

    document.querySelector('button').addEventListener('click', () => convertImageToCanvas())
});

/* https://davidwalsh.name/convert-canvas-image */
function convertImageToCanvas() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        makeStatementText(ctx);
        convertCanvasToImage(canvas)
    }
    img.src = userImg;
}

function convertCanvasToImage(canvas) {
    let image = new Image();
    image.src = canvas.toDataURL("image/png");
    image.setAttribute("id", "wmb_Img");
    document.querySelector('body').appendChild(image);
}

function makeStatementText(ctx) {
    let [, name, verb, color] = Array.from(document.querySelectorAll('#wmb_form input'));
    let { height, width } = ctx.canvas;
    let smallFont = '14px';
    let fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--sticker-font');
    //Set default font styles
    ctx.font = `${smallFont} ${fontFamily}`;
    ctx.fillStyle = color.value;
    ctx.textAlign = "center";

    //Top Text
    ctx.textBaseline = "top";
    ctx.fillText(`${name.value}, Human`, width / 2, 20);

    //Middle Text
    ctx.textBaseline = "middle";
    ctx.font = `20px ${fontFamily}`;
    ctx.fillText(`I ${verb.value} #withmybreath.`, width / 2, height / 2);

    //Underline verb
    let iText = ctx.measureText(`I`);
    let verbText = ctx.measureText(verb.value);
    // console.log(width / 2);
    // console.log(iText.width);

    // fillRect( x, y, width, height );
    ctx.fillRect(iText, (height / 2) + 10, verbText.width, 2);

    //Bottom Text
    ctx.font = `${smallFont} ${fontFamily}`;
    ctx.textBaseline = "bottom";
    ctx.fillText('Being black with breath in your body has power.', width / 2, height - 40);
    ctx.fillText('We ain\'t taking our breath for granted.', width / 2, height - 20);

}

function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}