import React from 'react';

function outlinedRect(props) {
    const { ctx, x, y, width, height } = props;
    ctx.rect(x, y, width, height);
    ctx.stroke();
}

function filledRect(props) {
    const { ctx, x, y, width, height, color } = props;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function filledCircle(props) {
    const { ctx, x, y, radius, color } = props;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawLine(props) {
    const { ctx, x, y, prevX, prevY } = props;


    for (let i = 0; i < 6; i++) {
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.rotate(angle * Math.PI / 180);
    }

}

let width = 800;
let height = 800;
let prevX = 0;
let prevY = 0;

let symmetry = 6;
let angle = 360 / symmetry;
// let saveButton;
// let clearButton;
// let slider;
// let xoff = 0;

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        let isMouseDown = false;
    }

    componentDidMount() {
        this.updateCanvas();
        this.drawGrid();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.translate(width / 2, height / 2);
        ctx.clearRect(0, 0, 800, 800);
        // draw children “components”
        // filledRect({ ctx, x: 10 - width / 2, y: 10 - height / 2, width: 780, height: 780, color: "#2C2C2C" });
        filledCircle({ ctx, x: 0, y: 0, radius: 400, color: "#2C2C2C" });
    }
    drawGrid() {
        const ctx = this.refs.canvas.getContext('2d');
        for (let i = 0; i < 6; i++) {
            ctx.strokeStyle = "#FFFFFB";
            ctx.moveTo(0, - height);
            ctx.lineTo(0, height);
            ctx.stroke();
            ctx.rotate(angle * Math.PI / 180);
        }
    }

    handleMouseDown = (e) => {
        console.log('mouse down');

        this.isMouseDown = true;

        prevX = e.clientX - width / 2
        prevY = e.clientY - height / 2
    }

    handleMouseUp = (e) => {
        console.log('mouse up');

        this.isMouseDown = false;
    }

    handleMouseMove = (e) => {
        var x = e.clientX - width / 2 ;
        var y = e.clientY - height / 2 ;

        if (x > width / 2 - 10 || x < - width / 2 + 10 || y > height / 2 - 10 || y < - height / 2 + 10) {
            this.isMouseDown = false;
        }

        const ctx = this.refs.canvas.getContext('2d');
        if (this.isMouseDown) {


            for (let i = 0; i < 6; i++) {

                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.closePath();
                ctx.scale(-1, 1);
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.closePath();
                ctx.scale(-1, 1);


                // filledRect({ ctx, x: x, y: y, width: 5, height: 5, color: "#FFFFFB" });
                // ctx.scale(-1, 1);
                // filledRect({ ctx, x: x, y: y, width: 5, height: 5, color: "#FFFFFB" });
                // ctx.scale(-1, 1);
                ctx.rotate(angle * Math.PI / 180);
            }

            // drawLine({ ctx: ctx, x: x, y: y, prevX: prevX, prevY: prevY });
            prevX = x;
            prevY = y;
        }
    }

    render() {
        return (
            <canvas id='canvas' onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} ref="canvas" width={width} height={height} />
        );
    }
}

export default Canvas;