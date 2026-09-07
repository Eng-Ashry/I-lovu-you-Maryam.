/* =========================================================
     MARYAM
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const game = document.getElementById("game");
const stars = document.getElementById("stars");
const elephant = document.getElementById("elephant");
const archeryArea = document.getElementById("archery-area");
const bow = document.getElementById("bow");
const arrow = document.getElementById("arrow");
const bowString = document.getElementById("bow-string");

const powerArea = document.getElementById("power-area");
const powerValue = document.getElementById("power-value");
const powerFill = document.getElementById("power-fill");

const hitEffect = document.getElementById("hit-effect");
const cakeArea = document.getElementById("cake-area");

const birthdayText = document.getElementById("birthday-text");
const sparkles = document.getElementById("sparkles");
const fireworks = document.getElementById("fireworks");

const loginArea = document.getElementById("login-area");
const passwordInput = document.getElementById("password-input");
const enterButton = document.getElementById("enter-button");
const errorMessage = document.getElementById("error-message");

const finalExplosion = document.getElementById("final-explosion");

const nextPage = document.getElementById("next-page");
const nextPageContent = document.getElementById("next-page-content");

const backgroundVideo =
    document.getElementById("background-video");

const birthdayMusic =
    document.getElementById("birthday-music");

const musicButton =
    document.getElementById("music-toggle");

const scrollTopButton =
    document.getElementById("scroll-top");

const scrollBottomButton =
    document.getElementById("scroll-bottom");

const pageControls =
    document.getElementById("page-controls");


/* =========================================================
   NEW ELEMENTS
========================================================= */

const finishButton =
    document.getElementById("finish-button");


/* =========================================================
   ELEPHANT SOUND
========================================================= */

const elephantSound =
    document.getElementById("elephant-sound");


/* =========================================================
   LOVE COUNTER ELEMENTS
========================================================= */

const counterYears =
    document.getElementById("counter-years");

const counterMonths =
    document.getElementById("counter-months");

const counterDays =
    document.getElementById("counter-days");

const counterHours =
    document.getElementById("counter-hours");

const counterMinutes =
    document.getElementById("counter-minutes");

const counterSeconds =
    document.getElementById("counter-seconds");


/* =========================================================
   PASSWORD
========================================================= */

const CORRECT_PASSWORD = "2092005";


/* =========================================================
   ARROW SETTINGS
========================================================= */

let isDragging = false;
let isLaunched = false;
let power = 0;
let pointerId = null;

const MAX_PULL = 125;

let currentAngle = 0;
let aimX = 0;
let aimY = 0;


/* =========================================================
   MUSIC SETTINGS
========================================================= */

const musicList = [
    "music/song1.mp3",
    "music/song2.mp3"
];

let currentSongIndex = 0;
let musicMuted = false;


/* =========================================================
   LOVE COUNTER SETTINGS
========================================================= */

const LOVE_START_DATE =
    new Date(
        2025,
        10,
        10,
        0,
        0,
        0
    );


/* =========================================================
   LOVE COUNTER
========================================================= */

function updateLoveCounter() {

    if (
        !counterYears ||
        !counterMonths ||
        !counterDays ||
        !counterHours ||
        !counterMinutes ||
        !counterSeconds
    ) {
        return;
    }

    const now = new Date();


    if (now < LOVE_START_DATE) {

        counterYears.textContent = "0";
        counterMonths.textContent = "0";
        counterDays.textContent = "0";
        counterHours.textContent = "00";
        counterMinutes.textContent = "00";
        counterSeconds.textContent = "00";

        return;
    }


    let years =
        now.getFullYear() -
        LOVE_START_DATE.getFullYear();

    let anniversary =
        new Date(LOVE_START_DATE);

    anniversary.setFullYear(
        LOVE_START_DATE.getFullYear() +
        years
    );


    if (anniversary > now) {

        years--;

        anniversary =
            new Date(LOVE_START_DATE);

        anniversary.setFullYear(
            LOVE_START_DATE.getFullYear() +
            years
        );
    }


    let months =
        now.getMonth() -
        anniversary.getMonth();


    if (months < 0) {
        months += 12;
    }


    let monthBase =
        new Date(anniversary);

    monthBase.setMonth(
        anniversary.getMonth() +
        months
    );


    if (monthBase > now) {

        months--;

        monthBase =
            new Date(anniversary);

        monthBase.setMonth(
            anniversary.getMonth() +
            months
        );
    }


    const remainingMs =
        now.getTime() -
        monthBase.getTime();


    const totalSeconds =
        Math.floor(
            remainingMs / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) /
            3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) /
            60
        );


    const seconds =
        totalSeconds %
        60;


    counterYears.textContent =
        years;

    counterMonths.textContent =
        months;

    counterDays.textContent =
        days;

    counterHours.textContent =
        String(hours).padStart(2, "0");

    counterMinutes.textContent =
        String(minutes).padStart(2, "0");

    counterSeconds.textContent =
        String(seconds).padStart(2, "0");
}


updateLoveCounter();

setInterval(
    updateLoveCounter,
    1000
);


/* =========================================================
   CREATE STARS
========================================================= */

function createStars() {

    if (!stars) {
        return;
    }

    const count =
        window.innerWidth <= 600
            ? 45
            : 80;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const star =
            document.createElement("span");

        star.className =
            "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        const size =
            2 + Math.random() * 3;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.animationDelay =
            Math.random() * 2 + "s";

        stars.appendChild(star);
    }
}

createStars();


/* =========================================================
   GET ELEMENT CENTER
========================================================= */

function getElementCenter(element) {

    if (!element) {

        return {
            x: 0,
            y: 0
        };
    }

    const rect =
        element.getBoundingClientRect();

    return {

        x:
            rect.left +
            rect.width / 2,

        y:
            rect.top +
            rect.height / 2
    };
}


/* =========================================================
   AIM ARROW AT ELEPHANT
========================================================= */

function aimArrowAtElephant() {

    if (
        !arrow ||
        !elephant ||
        isDragging ||
        isLaunched
    ) {
        return;
    }

    const arrowCenter =
        getElementCenter(arrow);

    const elephantCenter =
        getElementCenter(elephant);

    const dx =
        elephantCenter.x -
        arrowCenter.x;

    const dy =
        elephantCenter.y -
        arrowCenter.y;

    currentAngle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;

    arrow.style.transform =
        `rotate(${currentAngle}deg)`;
}


setTimeout(
    () => {
        aimArrowAtElephant();
    },
    300
);


window.addEventListener(
    "resize",
    () => {

        if (
            !isDragging &&
            !isLaunched
        ) {
            aimArrowAtElephant();
        }

    }
);


/* =========================================================
   START ARROW DRAG
========================================================= */

if (arrow) {

    arrow.addEventListener(
        "pointerdown",
        startArrowDrag
    );
}


function startArrowDrag(event) {

    if (isLaunched) {
        return;
    }

    event.preventDefault();

    isDragging = true;

    pointerId =
        event.pointerId;

    try {

        arrow.setPointerCapture(
            pointerId
        );

    } catch (error) {

        console.log(
            "Pointer capture unavailable"
        );
    }


    if (powerArea) {

        powerArea.classList.add("show");
    }


    arrow.style.transition =
        "none";


    if (bow) {

        bow.style.transition =
            "none";
    }


    if (bowString) {

        bowString.style.transition =
            "none";
    }


    arrow.style.zIndex =
        "200";


    updateArrowAim(
        event.clientX,
        event.clientY
    );
}


/* =========================================================
   UPDATE ARROW AIM
========================================================= */

function updateArrowAim(
    pointerX,
    pointerY
) {

    if (!elephant) {
        return;
    }

    const elephantCenter =
        getElementCenter(elephant);

    const dx =
        elephantCenter.x -
        pointerX;

    const dy =
        elephantCenter.y -
        pointerY;

    const length =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (length === 0) {
        return;
    }

    aimX =
        dx / length;

    aimY =
        dy / length;

    currentAngle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;
}


/* =========================================================
   MOVE ARROW
========================================================= */

document.addEventListener(
    "pointermove",
    moveArrow
);


function moveArrow(event) {

    if (
        !isDragging ||
        isLaunched ||
        !elephant ||
        !arrow
    ) {
        return;
    }


    if (
        pointerId !== null &&
        event.pointerId !== pointerId
    ) {
        return;
    }


    event.preventDefault();


    const elephantCenter =
        getElementCenter(elephant);


    const dx =
        elephantCenter.x -
        event.clientX;


    const dy =
        elephantCenter.y -
        event.clientY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (distance > 0) {

        aimX =
            dx / distance;

        aimY =
            dy / distance;

        currentAngle =
            Math.atan2(dy, dx) *
            180 /
            Math.PI;
    }


    const pull =
        Math.min(
            MAX_PULL,
            Math.max(
                0,
                distance * 0.25
            )
        );


    power =
        Math.round(
            (
                pull /
                MAX_PULL
            ) *
            100
        );


    power =
        Math.max(
            0,
            Math.min(
                100,
                power
            )
        );


    if (powerValue) {
        powerValue.textContent = power;
    }


    if (powerFill) {
        powerFill.style.width =
            power + "%";
    }


    const pullX =
        -aimX * pull;

    const pullY =
        -aimY * pull;


    arrow.style.transform =
        `
        translate(
            ${pullX}px,
            ${pullY}px
        )
        rotate(${currentAngle}deg)
        `;


    if (bowString) {

        bowString.style.transform =
            `
            translate(
                ${pullX * 0.35}px,
                ${pullY * 0.35}px
            )
            `;
    }


    if (bow) {

        bow.style.transform =
            `
            rotate(
                ${currentAngle - 20}deg
            )
            `;
    }


    arrow.style.boxShadow =
        `
        0 0 ${5 + power * 0.12}px #ffffff,
        0 0 ${10 + power * 0.2}px
        rgba(211, 82, 255, .8),
        0 0 ${20 + power * 0.25}px
        rgba(255, 60, 220, .35)
        `;
}


/* =========================================================
   RELEASE ARROW
========================================================= */

document.addEventListener(
    "pointerup",
    releaseArrow
);


function releaseArrow(event) {

    if (
        !isDragging ||
        isLaunched
    ) {
        return;
    }


    if (
        pointerId !== null &&
        event.pointerId !== pointerId
    ) {
        return;
    }


    isDragging = false;

    pointerId = null;


    if (power < 10) {

        resetArrow();

        return;
    }


    launchArrow();
}


/* =========================================================
   POINTER CANCEL
========================================================= */

document.addEventListener(
    "pointercancel",
    () => {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        pointerId = null;

        resetArrow();
    }
);


/* =========================================================
   RESET ARROW
========================================================= */

function resetArrow() {

    if (
        !arrow ||
        !elephant
    ) {
        return;
    }


    const arrowCenter =
        getElementCenter(arrow);

    const elephantCenter =
        getElementCenter(elephant);

    const dx =
        elephantCenter.x -
        arrowCenter.x;

    const dy =
        elephantCenter.y -
        arrowCenter.y;


    const angle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;


    currentAngle =
        angle;


    arrow.style.transition =
        "transform .45s cubic-bezier(.2,.8,.3,1)";


    if (bow) {
        bow.style.transition =
            "transform .45s ease";
    }


    if (bowString) {
        bowString.style.transition =
            "transform .45s ease";
    }


    arrow.style.transform =
        `rotate(${angle}deg)`;


    if (bowString) {
        bowString.style.transform =
            "translate(0, 0)";
    }


    if (bow) {
        bow.style.transform =
            "rotate(-25deg)";
    }


    arrow.style.boxShadow =
        "none";


    arrow.style.zIndex =
        "100";


    power = 0;


    if (powerValue) {
        powerValue.textContent = "0";
    }


    if (powerFill) {
        powerFill.style.width = "0%";
    }


    setTimeout(
        () => {

            if (powerArea) {

                powerArea.classList.remove(
                    "show"
                );
            }

        },
        350
    );
}


/* =========================================================
   LAUNCH ARROW
========================================================= */

function launchArrow() {

    if (
        isLaunched ||
        !arrow ||
        !elephant
    ) {
        return;
    }


    isLaunched = true;


    if (powerArea) {

        powerArea.classList.remove(
            "show"
        );
    }


    const arrowCenter =
        getElementCenter(arrow);

    const elephantRect =
        elephant.getBoundingClientRect();


    const targetX =
        elephantRect.left +
        elephantRect.width / 2;

    const targetY =
        elephantRect.top +
        elephantRect.height / 2;


    const distanceX =
        targetX -
        arrowCenter.x;

    const distanceY =
        targetY -
        arrowCenter.y;


    const angle =
        Math.atan2(
            distanceY,
            distanceX
        ) *
        180 /
        Math.PI;


    currentAngle =
        angle;


    const duration =
        Math.max(
            280,
            950 -
            power * 6
        );


    arrow.style.transition =
        "none";


    void arrow.offsetWidth;


    arrow.style.transition =
        `
        transform
        ${duration}ms
        cubic-bezier(.08,.72,.18,1)
        `;


    arrow.style.transform =
        `
        translate(
            ${distanceX}px,
            ${distanceY}px
        )
        rotate(${angle}deg)
        `;


    if (bowString) {

        bowString.style.transition =
            `
            transform
            ${Math.min(
                duration,
                300
            )}ms
            ease
            `;

        bowString.style.transform =
            "translate(0, 0)";
    }


    /*
       السهم وصل للفيل هنا بالضبط.
       تشغيل الصوت أولاً ثم تأثير الإصابة.
    */

    setTimeout(
        () => {

            if (elephantSound) {

                elephantSound.currentTime =
                    0;

                elephantSound.play()
                    .catch(
                        () => {}
                    );
            }


            hitElephant(
                targetX,
                targetY
            );

        },
        duration
    );
}


/* =========================================================
   HIT ELEPHANT
========================================================= */

function hitElephant(
    x,
    y
) {

    /*
       مفيش تشغيل لصوت الفيل هنا.
       الصوت بيتشغل في launchArrow
       لحظة وصول السهم للفيل.
    */


    if (hitEffect) {

        hitEffect.style.left =
            x + "px";

        hitEffect.style.top =
            y + "px";


        hitEffect.classList.remove(
            "active"
        );


        void hitEffect.offsetWidth;


        hitEffect.classList.add(
            "active"
        );
    }


    if (elephant) {

        elephant.classList.add(
            "hit"
        );
    }


    if (archeryArea) {

        archeryArea.classList.add(
            "hidden"
        );
    }


    if (arrow) {

        arrow.style.opacity =
            "0";
    }


    setTimeout(
        () => {

            if (hitEffect) {

                hitEffect.classList.remove(
                    "active"
                );
            }

        },
        900
    );


    setTimeout(
        () => {

            startCake();

        },
        650
    );
}


/* =========================================================
   CAKE
========================================================= */

function startCake() {

    if (!cakeArea) {
        return;
    }


    cakeArea.classList.add(
        "show"
    );


    cakeArea.classList.add(
        "build"
    );


    setTimeout(
        () => {

            createSparkles();

        },
        2100
    );


    setTimeout(
        () => {

            showBirthday();

        },
        3000
    );
}


/* =========================================================
   FINISH EVERYTHING BUTTON
========================================================= */

if (finishButton) {

    finishButton.addEventListener(
        "click",
        finishBirthdayImmediately
    );
}


function finishBirthdayImmediately() {

    isLaunched = true;
    isDragging = false;
    pointerId = null;


    if (elephant) {

        elephant.classList.add(
            "hit"
        );
    }


    if (archeryArea) {

        archeryArea.classList.add(
            "hidden"
        );
    }


    if (powerArea) {

        powerArea.classList.remove(
            "show"
        );
    }


    if (arrow) {

        arrow.style.opacity =
            "0";
    }


    if (cakeArea) {

        cakeArea.classList.add(
            "show"
        );

        cakeArea.classList.add(
            "build"
        );


        const cakeLayers =
            cakeArea.querySelectorAll(
                ".cake-layer"
            );


        cakeLayers.forEach(
            layer => {

                layer.style.animationDelay =
                    "0s";

                layer.style.opacity =
                    "1";

                layer.style.transform =
                    "translateY(0) scale(1)";
            }
        );


        const icing =
            cakeArea.querySelectorAll(
                ".cake-icing"
            );


        icing.forEach(
            item => {

                item.style.animationDelay =
                    "0s";

                item.style.opacity =
                    "1";
            }
        );


        const candle =
            document.getElementById("candle");

        const flame =
            document.getElementById("flame");


        if (candle) {

            candle.style.opacity =
                "1";

            candle.style.visibility =
                "visible";
        }


        if (flame) {

            flame.style.opacity =
                "1";

            flame.style.visibility =
                "visible";
        }
    }


    if (birthdayText) {

        birthdayText.innerHTML =
            "";


        const text =
            "HAPPY🎁BIRTHDAY TO YOU MARYAM🫀🥰";


        [...text].forEach(
            character => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.className =
                    "char visible";

                span.textContent =
                    character === " "
                        ? "\u00A0"
                        : character;

                birthdayText.appendChild(
                    span
                );
            }
        );
    }


    if (sparkles) {

        sparkles.innerHTML = "";

        createSparkles();
    }


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        setTimeout(
            () => {

                createFirework(
                    Math.random() *
                    window.innerWidth,

                    Math.random() *
                    window.innerHeight *
                    0.8
                );

            },
            i * 80
        );
    }


    if (loginArea) {

        loginArea.classList.add(
            "show"
        );


        loginArea.style.opacity =
            "1";


        loginArea.style.visibility =
            "visible";


        loginArea.style.transform =
            "translateX(-50%) scale(1)";
    }


    if (finishButton) {

        finishButton.style.display =
            "none";
    }


    setTimeout(
        () => {

            if (passwordInput) {

                passwordInput.focus();
            }

        },
        150
    );
}


/* =========================================================
   BIRTHDAY MESSAGE
========================================================= */

function showBirthday() {

    if (!birthdayText) {
        return;
    }


    const text =
        "HAPPY BIRTHDAY TO YOU MARYAM";


    birthdayText.innerHTML =
        "";


    const characters =
        [...text];


    characters.forEach(
        (
            character,
            index
        ) => {

            const span =
                document.createElement(
                    "span"
                );


            span.className =
                "char";


            span.textContent =
                character === " "
                    ? "\u00A0"
                    : character;


            birthdayText.appendChild(
                span
            );


            setTimeout(
                () => {

                    span.classList.add(
                        "visible"
                    );

                },
                index * 130
            );
        }
    );


    const totalTime =
        characters.length *
        130;


    setTimeout(
        () => {

            if (loginArea) {

                loginArea.classList.add(
                    "show"
                );
            }


            setTimeout(
                () => {

                    if (passwordInput) {

                        passwordInput.focus();
                    }

                },
                500
            );

        },
        totalTime + 800
    );
}


/* =========================================================
   SPARKLES
========================================================= */

function createSparkles() {

    if (!sparkles) {
        return;
    }


    const count =
        window.innerWidth < 600
            ? 30
            : 55;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const sparkle =
            document.createElement(
                "span"
            );


        sparkle.style.position =
            "absolute";


        sparkle.style.left =
            Math.random() * 100 + "%";


        sparkle.style.top =
            Math.random() * 100 + "%";


        const size =
            Math.random() * 6 + 3;


        sparkle.style.width =
            size + "px";


        sparkle.style.height =
            size + "px";


        sparkle.style.borderRadius =
            "50%";


        sparkle.style.background =
            Math.random() > .5
                ? "#ffffff"
                : "#ff72dd";


        sparkle.style.boxShadow =
            `
            0 0 8px
            ${sparkle.style.background},

            0 0 20px
            ${sparkle.style.background}
            `;


        sparkle.style.pointerEvents =
            "none";


        sparkle.style.animation =
            `
            sparkleAnimation
            ${1 + Math.random()}s
            ease-in-out
            infinite
            alternate
            `;


        sparkles.appendChild(
            sparkle
        );
    }
}


/* =========================================================
   SPARKLE ANIMATION
========================================================= */

const sparkleStyle =
    document.createElement(
        "style"
    );


sparkleStyle.textContent = `

@keyframes sparkleAnimation {

    0% {
        opacity: .15;
        transform: scale(.3);
    }

    50% {
        opacity: 1;
        transform: scale(1.5);
    }

    100% {
        opacity: .25;
        transform: scale(.6);
    }
}

`;


document.head.appendChild(
    sparkleStyle
);


/* =========================================================
   FIREWORK
========================================================= */

function createFirework(
    x,
    y
) {

    if (!fireworks) {
        return;
    }


    const colors = [
        "#ff4fd8",
        "#9d5cff",
        "#ffffff",
        "#65d9ff",
        "#ffd65a"
    ];


    const color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    const particles = 20;


    for (
        let i = 0;
        i < particles;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.style.position =
            "absolute";


        particle.style.left =
            x + "px";


        particle.style.top =
            y + "px";


        particle.style.width =
            "5px";


        particle.style.height =
            "5px";


        particle.style.borderRadius =
            "50%";


        particle.style.background =
            color;


        particle.style.boxShadow =
            `0 0 10px ${color}`;


        particle.style.pointerEvents =
            "none";


        fireworks.appendChild(
            particle
        );


        const angle =
            (
                Math.PI *
                2 /
                particles
            ) * i;


        const distance =
            45 +
            Math.random() * 70;


        const dx =
            Math.cos(angle) *
            distance;


        const dy =
            Math.sin(angle) *
            distance;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",

                    opacity:
                        1
                },

                {
                    transform:
                        `
                        translate(
                            calc(-50% + ${dx}px),
                            calc(-50% + ${dy}px)
                        )
                        scale(0)
                        `,

                    opacity:
                        0
                }
            ],
            {
                duration:
                    900 +
                    Math.random() * 500,

                easing:
                    "cubic-bezier(.1,.7,.2,1)",

                fill:
                    "forwards"
            }
        );


        setTimeout(
            () => {

                particle.remove();

            },
            1500
        );
    }
}


/* =========================================================
   RANDOM FIREWORKS
========================================================= */

let fireworksStarted =
    false;


function startFireworks() {

    if (
        fireworksStarted ||
        !fireworks
    ) {
        return;
    }


    fireworksStarted =
        true;


    setInterval(
        () => {

            if (
                birthdayText &&
                birthdayText.children.length === 0
            ) {
                return;
            }


            const x =
                window.innerWidth *
                (
                    .1 +
                    Math.random() * .8
                );


            const y =
                window.innerHeight *
                (
                    .1 +
                    Math.random() * .6
                );


            createFirework(
                x,
                y
            );

        },
        1800
    );
}


startFireworks();


/* =========================================================
   PASSWORD EVENTS
========================================================= */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        checkPassword
    );
}


if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                checkPassword();
            }

        }
    );
}


/* =========================================================
   CHECK PASSWORD
========================================================= */

function checkPassword() {

    if (!passwordInput) {
        return;
    }


    const entered =
        passwordInput.value.trim();


    if (
        entered ===
        CORRECT_PASSWORD
    ) {

        correctPassword();

    } else {

        wrongPassword();
    }
}


/* =========================================================
   WRONG PASSWORD
========================================================= */

function wrongPassword() {

    if (
        !errorMessage ||
        !passwordInput
    ) {
        return;
    }


    errorMessage.classList.remove(
        "show"
    );


    void errorMessage.offsetWidth;


    errorMessage.classList.add(
        "show"
    );


    passwordInput.value =
        "";


    passwordInput.focus();


    passwordInput.animate(
        [
            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-8px)"
            },

            {
                transform:
                    "translateX(8px)"
            },

            {
                transform:
                    "translateX(-5px)"
            },

            {
                transform:
                    "translateX(5px)"
            },

            {
                transform:
                    "translateX(0)"
            }
        ],
        {
            duration:
                450
        }
    );
}


/* =========================================================
   CORRECT PASSWORD
========================================================= */

function correctPassword() {

    if (errorMessage) {

        errorMessage.classList.remove(
            "show"
        );
    }


    if (enterButton) {

        enterButton.disabled =
            true;
    }


    if (passwordInput) {

        passwordInput.disabled =
            true;
    }


    if (loginArea) {

        loginArea.animate(
            [
                {
                    opacity: 1,

                    transform:
                        "translateX(-50%) scale(1)"
                },

                {
                    opacity: 0,

                    transform:
                        "translateX(-50%) scale(.7)"
                }
            ],
            {
                duration:
                    500,

                fill:
                    "forwards"
            }
        );
    }


    setTimeout(
        () => {

            if (finalExplosion) {

                finalExplosion.classList.remove(
                    "active"
                );


                void finalExplosion.offsetWidth;


                finalExplosion.classList.add(
                    "active"
                );
            }


            for (
                let i = 0;
                i < 15;
                i++
            ) {

                setTimeout(
                    () => {

                        createFirework(
                            Math.random() *
                            window.innerWidth,

                            Math.random() *
                            window.innerHeight *
                            .8
                        );

                    },
                    i * 90
                );
            }

        },
        350
    );


    setTimeout(
        () => {

            if (nextPage) {

                nextPage.classList.add(
                    "active"
                );

                nextPage.classList.add(
                    "show"
                );

                nextPage.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }


            if (pageControls) {

                pageControls.classList.add(
                    "visible"
                );
            }


            playBackgroundVideo();

            startMusic();

        },
        1400
    );
}


/* =========================================================
   BACKGROUND VIDEO
========================================================= */

function playBackgroundVideo() {

    if (!backgroundVideo) {
        return;
    }


    backgroundVideo.muted =
        true;

    backgroundVideo.volume =
        0;


    backgroundVideo.play()
        .catch(
            () => {

                console.log(
                    "Background video waiting..."
                );

            }
        );
}


/* =========================================================
   MUSIC SYSTEM
========================================================= */

function playCurrentSong() {

    if (!birthdayMusic) {
        return;
    }


    birthdayMusic.src =
        musicList[
            currentSongIndex
        ];


    birthdayMusic.load();


    birthdayMusic.currentTime =
        0;


    birthdayMusic.muted =
        musicMuted;


    birthdayMusic.volume =
        musicMuted
            ? 0
            : 1;


    birthdayMusic.play()
        .then(
            () => {

                console.log(
                    "🎵 Playing:",
                    musicList[
                        currentSongIndex
                    ]
                );

            }
        )
        .catch(
            () => {

                console.log(
                    "Music playback waiting..."
                );

            }
        );
}


/* =========================================================
   START MUSIC
========================================================= */

function startMusic() {

    if (!birthdayMusic) {
        return;
    }


    currentSongIndex =
        0;


    musicMuted =
        false;


    birthdayMusic.muted =
        false;

    birthdayMusic.volume =
        1;


    updateMusicButton();

    playCurrentSong();
}


/* =========================================================
   NEXT SONG
========================================================= */

if (birthdayMusic) {

    birthdayMusic.addEventListener(
        "ended",
        () => {

            currentSongIndex++;


            if (
                currentSongIndex >=
                musicList.length
            ) {

                currentSongIndex =
                    0;
            }


            playCurrentSong();

        }
    );
}


/* =========================================================
   MUTE / UNMUTE
========================================================= */

function toggleMusic() {

    if (!birthdayMusic) {
        return;
    }


    musicMuted =
        !musicMuted;


    birthdayMusic.muted =
        musicMuted;


    birthdayMusic.volume =
        musicMuted
            ? 0
            : 1;


    updateMusicButton();


    if (!musicMuted) {

        birthdayMusic.play()
            .catch(
                () => {}
            );
    }
}


/* =========================================================
   UPDATE MUSIC BUTTON
========================================================= */

function updateMusicButton() {

    if (!musicButton) {
        return;
    }


    if (musicMuted) {

        musicButton.textContent =
            "🔇";


        musicButton.setAttribute(
            "aria-label",
            "تشغيل الصوت"
        );


        musicButton.setAttribute(
            "title",
            "تشغيل الصوت"
        );

    } else {

        musicButton.textContent =
            "🔊";


        musicButton.setAttribute(
            "aria-label",
            "كتم الصوت"
        );


        musicButton.setAttribute(
            "title",
            "كتم الصوت"
        );
    }
}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (musicButton) {

    musicButton.classList.add(
        "page-control-button"
    );


    musicButton.addEventListener(
        "click",
        toggleMusic
    );


    updateMusicButton();
}


/* =========================================================
   SCROLL FUNCTION
========================================================= */

function scrollNextPageTo(
    position
) {

    if (!nextPageContent) {
        return;
    }


    const target =
        position === "top"
            ? 0
            : nextPageContent.scrollHeight;


    try {

        nextPageContent.scrollTo(
            {
                top: target,
                behavior: "smooth"
            }
        );

    } catch (error) {

        nextPageContent.scrollTop =
            target;
    }


    setTimeout(
        () => {

            if (!nextPageContent) {
                return;
            }


            if (position === "top") {

                nextPageContent.scrollTop =
                    0;

            } else {

                nextPageContent.scrollTop =
                    nextPageContent.scrollHeight;
            }

        },
        500
    );
}


/* =========================================================
   SCROLL TO TOP
========================================================= */

if (scrollTopButton) {

    scrollTopButton.classList.add(
        "page-control-button"
    );


    scrollTopButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            scrollNextPageTo("top");

        }
    );
}


/* =========================================================
   SCROLL TO BOTTOM
========================================================= */

if (scrollBottomButton) {

    scrollBottomButton.classList.add(
        "page-control-button"
    );


    scrollBottomButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            scrollNextPageTo("bottom");

        }
    );
}


/* =========================================================
   IMAGE 2 / 3 / 4 EXPAND SYSTEM
========================================================= */

function setupImageExpand() {

    if (!nextPageContent) {
        return;
    }


    const images =
        nextPageContent.querySelectorAll(
            ".image-row-234 img"
        );


    images.forEach(
        image => {

            image.addEventListener(
                "click",
                () => {

                    images.forEach(
                        otherImage => {

                            otherImage.classList.remove(
                                "expanded"
                            );

                        }
                    );


                    image.classList.add(
                        "expanded"
                    );

                }
            );

        }
    );
}


setupImageExpand();


/* =========================================================
   CONTENT VIDEO SYSTEM
========================================================= */

/*
   مفيش أي زرار تحت الفيديو.

   الضغط على الفيديو نفسه:
   - لو واقف → يشتغل.
   - لو شغال → يقف.

   تشغيل فيديو جديد:
   - يوقف الفيديو القديم.
   - يوقف الأغنية.
*/


function setupContentVideos() {

    if (!nextPageContent) {
        return;
    }


    const videos =
        nextPageContent.querySelectorAll(
            "video"
        );


    videos.forEach(
        video => {

            /*
               إلغاء أزرار التحكم الأصلية.
            */

            video.controls = false;


            /*
               الضغط على الفيديو نفسه.
            */

            video.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    /*
                       لو الفيديو شغال:
                       أوقفه.
                    */

                    if (!video.paused) {

                        video.pause();

                        return;
                    }


                    /*
                       أوقف كل الفيديوهات الأخرى.
                    */

                    videos.forEach(
                        otherVideo => {

                            if (
                                otherVideo !== video &&
                                !otherVideo.paused
                            ) {

                                otherVideo.pause();
                            }

                        }
                    );


                    /*
                       أوقف الأغنية.
                    */

                    if (birthdayMusic) {

                        birthdayMusic.pause();
                    }


                    /*
                       شغل الفيديو الذي ضغطنا عليه.
                    */

                    video.play()
                        .catch(
                            () => {}
                        );

                }
            );


            /*
               أول ما الفيديو يبدأ فعلياً:
               تأكيد إيقاف الأغنية.
            */

            video.addEventListener(
                "play",
                () => {

                    if (birthdayMusic) {

                        birthdayMusic.pause();
                    }

                }
            );


            /*
               عند انتهاء الفيديو:
               ترجع الأغنية.
            */

            video.addEventListener(
                "ended",
                () => {

                    if (
                        birthdayMusic &&
                        !musicMuted
                    ) {

                        birthdayMusic.play()
                            .catch(
                                () => {}
                            );
                    }

                }
            );

        }
    );
}


setupContentVideos();


/* =========================================================
   PREVENT IMAGE DRAGGING
========================================================= */

document.addEventListener(
    "dragstart",
    event => {

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();
        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "💜 Happy Birthday Maryam"
);

console.log(
    "🏹 اسحب السهم للخلف ثم اتركه!"
);

console.log(
    "🎵 Music system ready"
);

console.log(
    "🔊🔇 Music control ready"
);

console.log(
    "⬆️⬇️ Page controls ready"
);

console.log(
    "🫂 Love counter started: 10/11/2025"
);

console.log(
    "🎬 Content video system ready"
);

console.log(
    "🐘 Elephant sound ready"
);

console.log(
    "⚡ Finish button ready"
);

console.log(
    "🖼️ Image expand system ready"
);







