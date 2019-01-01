// create and append canvas
(function () {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = 300;
    canvas.width = window.innerWidth;



    // create inputs as DOM objects and setting up values

    const input_circles = document.getElementById('circle');
    input_circles.value = 2;
    input_circles.setAttribute("min", 2);
    input_circles.setAttribute("max", 30);
    input_circles.setAttribute("step", 2);


    const input_size = document.getElementById('size');
    input_size.value = 50;
    input_size.setAttribute("min", 30);
    input_size.setAttribute("max", 70);
    input_size.setAttribute("step", 1);


    const input_speed = document.getElementById('speed');
    input_speed.value = 0.01;
    input_speed.setAttribute("min", 0.03);
    input_speed.setAttribute("max", 0.1);
    input_speed.setAttribute("step", 0.01);


    // setup graph
    let time = 0;
    let time_new = 0;
    let graph_translate_x = 350;
    let x_values = [];
    let y_values = [];
    let time_steps = [];

    //setup main circle

    let circle_x_center = 150;
    let circle_y_center = canvas.height / 2;

    // function drawing circles
    function draw_circles(n, x, y, newx, newy) {
        ctx.beginPath();
        ctx.arc(x + circle_x_center, y + circle_y_center, ((4 / (n * Math.PI))) * input_size.value, 0, 2 * Math.PI, false);
        ctx.moveTo(x + circle_x_center, y + circle_y_center)
        ctx.lineTo(newx + circle_x_center, newy + circle_y_center)
        ctx.stroke();
        ctx.closePath();
    }

    function render() {
        requestAnimationFrame(render);
        //update N numer in label
        document.getElementById('n_number').innerText = input_circles.value - 1;

        //clear canvas for each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        //draw axies
        ctx.fillRect(graph_translate_x, circle_y_center - 2 * input_size.value, 0.2, input_size.value * 2 * 2)
        ctx.fillRect(graph_translate_x, circle_y_center, canvas.width, 0.2)

        //update time and time_new
        time += Number(input_speed.value);
        time_new += 0.1;

        // abolute values of x and y (circle center)
        let x = 0;
        let y = 0;

        for (let n = 1; n < input_circles.value; n += 2) {
            let prevx = x;
            let prevy = y;
            x += ((4 / (n * Math.PI)) * Math.cos(n * time)) * input_size.value;
            y += ((4 / (n * Math.PI)) * Math.sin(n * time)) * input_size.value;
            draw_circles(n, prevx, prevy, x, y);
        }
        // clear memory by delete unvisible elements (out of canvas)
        if (x_values.length > canvas.width) {
            x_values.pop();
            y_values.pop();
            time_steps.pop();

        }

        //updating arrays
        x_values.unshift(y + circle_y_center);
        y_values.push(time);
        time_steps.push(time_new);

        // graph color style
        ctx.strokeStyle = "steelblue"

        //drawing black dot around circle
        ctx.beginPath();
        ctx.arc(x + circle_x_center, y + circle_y_center, 2, 0, 2 * Math.PI, false)
        ctx.fill();
        ctx.closePath();

        //drawing graph
        ctx.beginPath();
        ctx.moveTo(x + circle_x_center, y + circle_y_center)
        for (let i = 0; i < x_values.length - 1; i++) {
            ctx.lineTo(time_steps[i] * 20 + graph_translate_x, x_values[i]);

        }
        ctx.stroke();
        ctx.closePath();

    }

    //render frame
    render();
})()