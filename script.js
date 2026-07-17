/* =====================================================
   Birthday Story
   Part 3A
   Configuration + Scene Controller + Lock Screen
===================================================== */


/* =========================
   Configuration
========================= */


const birthdayName = "Akram"; 
// Change NAME to your cousin's name


const images = [

    "assets/images/photo1.jpg",

    "assets/images/photo2.jpg",

    "assets/images/photo3.jpg",

    "assets/images/photo4.jpg",

    "assets/images/photo5.jpg",

    "assets/images/photo6.jpg",

    "assets/images/photo7.jpg",

    "assets/images/photo8.jpg",

    "assets/images/photo9.jpg",

    "assets/images/photo10.jpg",

    "assets/images/photo11.jpg"

];



/* =========================
   Scene Elements
========================= */


const scenes = {

    lock:
    document.getElementById("lock-screen"),

    chat:
    document.getElementById("chat-screen"),

    slide1:
    document.getElementById("slideshow-one"),

    birthday:
    document.getElementById("birthday-title"),

    slide2:
    document.getElementById("slideshow-two"),

    wishes:
    document.getElementById("wishes"),

    ending:
    document.getElementById("ending")

};



/* =========================
   Show Scene Function
========================= */


function showScene(scene){

    Object.values(scenes).forEach(item=>{

        item.classList.remove("active");

    });


    scene.classList.add("active");

}



/* =========================
   Lock Screen Clock
========================= */


function updateClock(){


    const time =
    document.getElementById("time");


    const date =
    document.getElementById("date");


    const now =
    new Date();



    let hours =
    now.getHours();


    let minutes =
    now.getMinutes();



    let ampm =
    hours >= 12 ? "PM" : "AM";



    hours =
    hours % 12;


    hours =
    hours || 12;



    minutes =
    minutes < 10
    ? "0"+minutes
    : minutes;



    time.innerHTML =

    `${hours}:${minutes} ${ampm}`;



    date.innerHTML =

    now.toDateString();



}



setInterval(updateClock,1000);

updateClock();



/* =========================
   Set Birthday Name
========================= */


document
.getElementById("birthday-name")
.innerHTML =
birthdayName;


document
.getElementById("wish-name")
.innerHTML =
birthdayName;



/* =========================
   Initial Scene
========================= */


window.onload = ()=>{


    showScene(scenes.lock);


}; 

/* =====================================================
   Part 3B
   Unlock Animation + WhatsApp Chat System
===================================================== */


/* =========================
   Unlock Screen
========================= */


const lockScreen =
document.getElementById("lock-screen");


lockScreen.addEventListener(
"click",
()=>{

    unlockScreen();

});


function unlockScreen(){


    lockScreen.classList.add(
        "unlocking"
    );


    setTimeout(()=>{


        showScene(
            scenes.chat
        );


        startChat();


    },800);


}



/* =========================
   Chat Elements
========================= */


const chatBody =
document.getElementById("chat-body");


const chatStatus =
document.getElementById("chat-status");



/* =========================
   Chat Messages
========================= */


const messages = [


    {

        type:"received",

        text:"Hey! 👋",

        time:"06:00"

    },


    {

        type:"sent",

        text:"Hi 😊",

        time:"06:01"

    },


    {

        type:"received",

        text:"Do you know what day it is today?",

        time:"06:01"

    },


    {

        type:"sent",

        text:"No... Tell me 🤔",

        time:"06:02"

    },


    {

        type:"received",

        text:"Today is our little champion's birthday! 🎂",

        time:"06:02"

    },


    {

        type:"sent",

        text:"Really? Let's surprise him! 🎉🎁",

        time:"06:03"

    }


];



/* =========================
   Start Chat
========================= */


function startChat(){


    chatBody.innerHTML="";


    showNextMessage(0);


}



/* =========================
   Message Controller
========================= */


function showNextMessage(index){


    if(index >= messages.length){


        setTimeout(()=>{


            startFirstSlideshow();


        },1500);


        return;


    }



    showTyping();



    setTimeout(()=>{


        hideTyping();



        addMessage(
            messages[index]
        );


        setTimeout(()=>{


            showNextMessage(
                index+1
            );


        },1200);



    },1500);



}



/* =========================
   Add Message
========================= */


function addMessage(message){


    const div =
    document.createElement("div");


    div.className =

    `message ${message.type} show`;



    div.innerHTML = `

        ${message.text}

        <span class="msg-time">

        ${message.time}

        ${message.type==="sent"

        ? '<span class="msg-status">✓✓</span>'

        : ""}

        </span>

    `;



    chatBody.appendChild(div);



    chatBody.scrollTop =
    chatBody.scrollHeight;


}



/* =========================
   Typing Indicator
========================= */


function showTyping(){


    chatStatus.innerHTML =
    "typing...";


    chatStatus.classList.add(
        "typing-status"
    );


    const typing =
    document.createElement("div");


    typing.id="typing";


    typing.className =
    "message received typing";


    typing.innerHTML=

    `

    <span></span>

    <span></span>

    <span></span>

    `;


    chatBody.appendChild(
        typing
    );


}



/* =========================
   Hide Typing
========================= */


function hideTyping(){


    chatStatus.innerHTML =
    "online";


    chatStatus.classList.remove(
        "typing-status"
    );


    const typing =
    document.getElementById(
        "typing"
    );


    if(typing){

        typing.remove();

    }


} 
/* =====================================================
   Part 3C
   Photo Slideshow System
===================================================== */


/* =========================
   Slideshow Elements
========================= */


const slide1 =
document.getElementById("slide1");


const slide2 =
document.getElementById("slide2");


const slide3 =
document.getElementById("slide3");



/* =========================
   Slideshow Settings
========================= */


const slideDuration = 4000;
// 4 seconds per image



/* =========================
   First Slideshow
   Photos 2-6
========================= */


function startFirstSlideshow(){


    showScene(
        scenes.slide1
    );


    let firstImages = [

        images[1],
        images[2],
        images[3],
        images[4],
        images[5]

    ];


    playSlideshow(

        slide1,

        firstImages,

        ()=>{


            showBirthdayTitle();


        }

    );


}



/* =========================
   Generic Slideshow Function
========================= */


function playSlideshow(

    element,

    imageList,

    finished

){


    let index=0;



    function nextImage(){



        if(index >= imageList.length){


            finished();

            return;


        }



        element.classList.remove(
            "slide-enter"
        );



        void element.offsetWidth;



        element.src =
        imageList[index];



        element.classList.add(
            "slide-enter"
        );



        index++;



        setTimeout(

            nextImage,

            slideDuration

        );



    }



    nextImage();


}



/* =========================
   Birthday Title
========================= */


function showBirthdayTitle(){


    showScene(
        scenes.birthday
    );


    createConfetti();



    setTimeout(()=>{


        startSecondSlideshow();


    },5000);



}



/* =========================
   Second Slideshow
   Photos 7-9
========================= */


function startSecondSlideshow(){


    showScene(
        scenes.slide2
    );



    let secondImages=[

        images[6],
        images[7],
        images[8]

    ];



    playSlideshow(

        slide2,

        secondImages,

        ()=>{


            showWishes();


        }

    );


}



/* =========================
   Wishes Screen
========================= */


function showWishes(){


    showScene(
        scenes.wishes
    );



    setTimeout(()=>{


        startEnding();


    },7000);



}



/* =========================
   Final Slideshow
   Photos 10-11
========================= */


function startEnding(){


    showScene(
        scenes.ending
    );



    let finalImages=[

        images[9],
        images[10]

    ];



    playSlideshow(

        slide3,

        finalImages,

        ()=>{


            createFireworks();


        }

    );


} 
/* =====================================================
   Part 3D
   Birthday Name + Confetti + Fireworks Generator
===================================================== */


/* =========================
   Birthday Name
========================= */


function setBirthdayName(name){


    const birthdayText =
    document.getElementById(
        "birthday-Akram"
    );


    const wishText =
    document.getElementById(
        "wish-Akram"
    );


    if(birthdayText){

        birthdayText.innerHTML =
        name;

    }


    if(wishText){

        wishText.innerHTML =
        name;

    }

}


/*
   Change your cousin's name here

   Example:

   setBirthdayName("Ahmed");

*/

setBirthdayName(birthdayAkram);




/* =========================
   Confetti Generator
========================= */


function createConfetti(){


    const container =
    document.querySelector(
        ".confetti-container"
    );


    if(!container) return;



    container.innerHTML="";



    const colors=[

        "#ff4d6d",

        "#ffd166",

        "#06d6a0",

        "#118ab2",

        "#8338ec",

        "#ffffff"

    ];



    for(let i=0;i<80;i++){


        const piece =
        document.createElement(
            "div"
        );


        piece.className =
        "confetti";



        piece.style.left =
        Math.random()*100+"%";



        piece.style.animationDuration =

        (3 + Math.random()*4)

        +"s";



        piece.style.animationDelay =

        Math.random()*3

        +"s";



        piece.style.background =

        colors[

            Math.floor(

                Math.random()

                *

                colors.length

            )

        ];



        piece.style.transform =

        `rotate(${Math.random()*360}deg)`;



        container.appendChild(
            piece
        );


    }


}





/* =========================
   Fireworks Generator
========================= */


function createFireworks(){


    const container =
    document.querySelector(
        ".fireworks"
    );


    if(!container) return;



    container.innerHTML="";



    for(let burst=0;burst<8;burst++){



        setTimeout(()=>{


            createFireworkBurst(
                container
            );


        },

        burst*700);



    }


}





function createFireworkBurst(container){



    const centerX =

    Math.random()*80+10;



    const centerY =

    Math.random()*60+10;



    for(let i=0;i<30;i++){



        const particle =

        document.createElement(
            "div"
        );



        particle.className =
        "firework";



        particle.style.left =

        centerX+"%";



        particle.style.top =

        centerY+"%";



        const angle =

        Math.random()*Math.PI*2;



        const distance =

        50 +

        Math.random()*120;



        particle.style.setProperty(

            "--x",

            Math.cos(angle)

            *

            distance

            +

            "px"

        );



        particle.style.setProperty(

            "--y",

            Math.sin(angle)

            *

            distance

            +

            "px"

        );



        container.appendChild(
            particle
        );



        setTimeout(()=>{


            particle.remove();


        },1500);



    }


} 
/* =====================================================
   Part 3E
   Background Music + Final Optimization + Testing Flow
===================================================== */


/* =========================
   Background Music
========================= */


const music =
document.getElementById(
    "bg-music"
);



/* Music Start Function */

function startMusic(){


    if(!music) return;



    music.volume = 0.5;



    music.play()

    .catch(()=>{


        console.log(
            "Music waiting for user interaction"
        );


    });


}



/* Stop Music */

function stopMusic(){


    if(!music) return;


    music.pause();

    music.currentTime=0;


}



/* =========================
   Mobile Audio Unlock
========================= */


/*
   Mobile browsers block
   autoplay audio.

   First touch/click
   enables music.
*/


document.addEventListener(
"touchstart",
()=>{

startMusic();

},
{
once:true
});




/* =========================
   Performance Optimization
========================= */


/* Reduce unnecessary animations
   when page is hidden */


document.addEventListener(

"visibilitychange",

()=>{


    if(document.hidden){


        document
        .body
        .classList
        .add("pause-animation");


    }

    else{


        document
        .body
        .classList
        .remove("pause-animation");


    }


});




/* =========================
   Replay Function
========================= */


function restartBirthday(){


    location.reload();


}



/* =========================
   Preload Images
========================= */


function preloadImages(){


    images.forEach(src=>{


        const img =
        new Image();


        img.src=src;


    });


}



preloadImages();




/* =========================
   Final Startup
========================= */


/*
   Project starts:

   1. Lock Screen
   2. Unlock
   3. WhatsApp Chat
   4. Photos 2-6
   5. Birthday Reveal
   6. Photos 7-9
   7. Wishes
   8. Photos 10-11
   9. Fireworks

*/


console.log(

"🎂 Birthday Story Loaded Successfully!"

);
