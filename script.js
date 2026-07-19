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
    
    "photo1.jpg",    
    
    "photo2.jpg",    
    
    "photo3.jpg",    
    
    "photo4.jpg",    
    
    "photo5.jpg",    
    
    "photo6.jpg",    
    
    "photo7.jpg",    
    
    "photo8.jpg",    
    
    "photo9.jpg",    
    
    "photo10.jpg"    
    
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
    
    showScene(scenes.chat);    
    
    startChat();    
    
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
    text:"Hey! 👋"    
},    
    
{    
    type:"sent",    
    text:"Hi 😊"    
},    
    
{    
    type:"received",    
    text:"Do you know what day it is today? 🗓"    
},    
    
{    
    type:"sent",    
    text:"No... Tell me 🤔"    
},    
    
{    
    type:"received",    
    text:"Today is our champion's birthday! 🎂"    
},    
    
{    
    type:"sent",   
    text:"oh! yeah! I forget that 🧠"
          
},   

{    
    type:"sent",
    text:"Let's surprise him! 🎉🎁🎊"
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
   Add Message - FIXED    
========================= */    
function getCurrentChatTime(){    
    
    const now = new Date();    
    
    let hours = now.getHours();    
    let minutes = now.getMinutes();    
    
    const ampm = hours >= 12 ? "PM" : "AM";    
    
    hours = hours % 12 || 12;    
    
    minutes = minutes < 10 ? "0" + minutes : minutes;    
    
    return `${hours}:${minutes} ${ampm}`;    
}    
    
    
function addMessage(message){    
    
    const div =    
    document.createElement("div");    
    
    div.className =    
    `message ${message.type}`;    
    
    const msgContent = document.createElement("div");    
    msgContent.style.display = "flex";    
    msgContent.style.flexDirection = "column";    
    
    const textSpan = document.createElement("span");    
    textSpan.textContent = message.text;    
    
    const timeSpan = document.createElement("span");    
    timeSpan.className = "msg-time";    
    timeSpan.textContent = getCurrentChatTime();    
    
    if(message.type === "sent") {    
        const statusSpan = document.createElement("span");    
        statusSpan.className = "msg-status";    
        statusSpan.textContent = " ✓✓";    
        timeSpan.appendChild(statusSpan);    
    }    
    
    msgContent.appendChild(textSpan);    
    msgContent.appendChild(timeSpan);    
    div.appendChild(msgContent);    
    
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
    
    const typingContent = document.createElement("div");    
    typingContent.innerHTML = `    
        <span></span>    
        <span></span>    
        <span></span>    
    `;    
    
    typing.appendChild(typingContent);    
    
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

    startMusic();

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
    
    
    },3000);    
    
    
    
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
    
    showScene(scenes.wishes);    
    
    const bg =    
    document.getElementById("wish-bg");    
    
    const backgrounds = [    
    
        images[8],       
    
        images[9]       
    
    ];    
    
    let index = 0;    
    
    bg.src = backgrounds[index];    
    
const bgInterval = setInterval(()=>{

    index++;

    if(index < backgrounds.length){

        bg.src = backgrounds[index];

    }else{

        clearInterval(bgInterval);

    }

},3500);
    
    setTimeout(()=>{

    clearInterval(bgInterval);

    createFireworks();

    setTimeout(()=>{

        stopMusic();

        restartBirthday();

    },5000);

},7000);
    
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
        "birthday-name"    
    );    
    
    
    const wishText =    
    document.getElementById(    
        "wish-name"    
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
    
setBirthdayName(birthdayName);    
    
    
    
    
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
    
    if(!music){    
        return;    
    }    
    
    music.volume = 1;    
    
    music.play().catch(error=>{    
        console.log(error);    
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
