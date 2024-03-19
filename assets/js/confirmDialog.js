const button = document.getElementById("subscribe");
const modalSubscribe = document.getElementById("dialog-subs");
const modalOk = document.getElementById("dialog-ok");
const yesButton = document.getElementById("bt-yes");
const notButton = document.getElementById("bt-not");
const okButton = document.getElementById("bt-ok");
const divNotSub = document.getElementById("div-not-sub");

button.onclick = function(event)
{
    event.preventDefault();
    modalSubscribe.showModal();
};
notButton.onclick = function(event)
{
    event.preventDefault();
    modalSubscribe.close();
}
yesButton.onclick = function(event)
{
    event.preventDefault();
    modalSubscribe.close();
    modalOk.showModal();
}

okButton.onclick = function(event)
{
    modalOk.close();
    button.innerHTML = "Inscrito";
    divNotSub.classList.add("border-no-active-no-click");
}


