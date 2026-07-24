let button = document.querySelector("button");


button.addEventListener("click", function() {

    let meteor = document.createElement("div");

    meteor.classList.add("meteor");

    document.body.appendChild(meteor);


    let path = getMeteorPath();

    let start = path.start;
    let end = path.end;

    while (
    Math.abs(start.x - end.x) < window.innerWidth / 3 &&
    Math.abs(start.y - end.y) < window.innerHeight / 3
    ) {
        end = randomEdgePoint();
    }


    let x = start.x;
    let y = start.y;


    let distanceX = end.x - start.x;
    let distanceY = end.y - start.y;


    let distance = Math.sqrt(
        distanceX ** 2 + distanceY ** 2
    );


    let speed = Math.random() * (45 - 20) + 10;
    let velocityX = (distanceX / distance) * speed;
    let velocityY = (distanceY / distance) * speed;
    let angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;
    let trailLength = speed * 8;
    meteor.style.setProperty("--trail-length", trailLength + "px");
    meteor.style.transform = `rotate(${angle}deg)`;

    let glow = speed / 2;
    meteor.style.filter = `drop-shadow(0 0 ${glow}px red)`;

    function moveMeteor() {

        x += velocityX;
        y += velocityY;


        meteor.style.left = x + "px";
        meteor.style.top = y + "px";


        if (
            x < -500 ||
            x > window.innerWidth + 500 ||
            y < -500 ||
            y > window.innerHeight + 500
        ) {
            meteor.remove();
            return;
        }


        requestAnimationFrame(moveMeteor);

    }


    moveMeteor();

});

function getMeteorPath() {

    let side = Math.floor(Math.random() * 4);

    let padding = 50;


    // Enter from top, exit bottom
    if (side === 0) {
        return {
            start: {
                x: Math.random() * window.innerWidth,
                y: -padding
            },
            end: {
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + padding
            }
        };
    }


    // Enter from right, exit left
    if (side === 1) {
        return {
            start: {
                x: window.innerWidth + padding,
                y: Math.random() * window.innerHeight
            },
            end: {
                x: -padding,
                y: Math.random() * window.innerHeight
            }
        };
    }


    // Enter from bottom, exit top
    if (side === 2) {
        return {
            start: {
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + padding
            },
            end: {
                x: Math.random() * window.innerWidth,
                y: -padding
            }
        };
    }


    // Enter from left, exit right
    return {
        start: {
            x: -padding,
            y: Math.random() * window.innerHeight
        },
        end: {
            x: window.innerWidth + padding,
            y: Math.random() * window.innerHeight
        }
    };

}