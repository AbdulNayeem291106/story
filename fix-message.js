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
    timeSpan.textContent = message.time;

    if(message.type === "sent") {
        const statusSpan = document.createElement("span");
        statusSpan.className = "msg-status";
        statusSpan.textContent = "✓✓";
        timeSpan.appendChild(statusSpan);
    }

    msgContent.appendChild(textSpan);
    msgContent.appendChild(timeSpan);
    div.appendChild(msgContent);

    chatBody.appendChild(div);

    chatBody.scrollTop =
    chatBody.scrollHeight;

}
