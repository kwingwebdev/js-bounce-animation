document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var gravity = 0.3;
    var friction = 0.8;
    var imageSources = ['images/abcow1.PNG', 'images/abcow2.PNG']; // Array of image paths

    function ImageBall(x, y, dx, dy, imageSrc) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.image = new Image();
        this.image.src = imageSrc;
        this.size = canvas.width / 10; // Dynamic size based on canvas width

        this.draw = function() {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        };

        this.update = function() {
            if (this.y + this.size + this.dy > canvas.height) {
                this.dy = -this.dy * friction;
            } else {
                this.dy += gravity;
            }
            if (this.x + this.size + this.dx > canvas.width || this.x + this.dx < 0) {
                this.dx = -this.dx;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        };
    }

    var ballArray = [];
    for (var i = 0; i < imageSources.length; i++) {
        var x = Math.random() * (canvas.width - 100);
        var y = Math.random() * (canvas.height - 100);
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;
        ballArray.push(new ImageBall(x, y, dx, dy, imageSources[i]));
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < ballArray.length; i++) {
            ballArray[i].update();
        }
    }

    animate();

    // Mouse and Touch Interaction
    function interact(event) {
        var x = (event.clientX || event.touches[0].clientX) - canvas.getBoundingClientRect().left;
        var y = (event.clientY || event.touches[0].clientY) - canvas.getBoundingClientRect().top;

        ballArray.forEach(function(ball) {
            if (x > ball.x && x < ball.x + ball.size &&
                y > ball.y && y < ball.y + ball.size) {
                ball.dx = (Math.random() - 0.5) * 20;
                ball.dy = (Math.random() - 0.5) * 20;
            }
        });
    }

    canvas.addEventListener('click', interact);
    canvas.addEventListener('touchstart', interact);

    // Resizing
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ballArray.forEach(function(ball) {
            ball.size = canvas.width / 10; // Adjust size on resize
        });
    });
});
