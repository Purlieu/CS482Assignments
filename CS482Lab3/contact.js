function getSubmitButton(){
	let button, input;
	button = document.getElementsByTagName("INPUT");
	for(let i = 0; i < button.length; i++){
	    if(button[i].getAttribute("type", "submit")){
	        input = button[i];
        }
    }
    	return input;
}

function getEmailInputs(){
	let button;
	let input = [];
	button = document.getElementsByTagName("INPUT");
	for(let i = 0; i < button.length; i++){
		if(button[i].getAttribute("type", "email")){
			input.push(button[i]);
		}
	}
	return input;
}

function removeElement(){
    let targetElement = event.target;
    targetElement.parentNode.parentNode.removeChild(targetElement.parentNode);
}

function makeNew(){
	let div = document.createElement('div');
	div.innerHTML = '<input type="email" id="email" name="emails[]" placeholder="robert.paulson@hotmail.com" required /> <a href="javascript:void(0);">[\-]</a>'
	let button = getSubmitButton();
	button.parentNode.insertBefore(div, button);
    let anchors = div.getElementsByTagName("a");
        anchors[0].onclick = function() {
            removeElement();
        }
}

function check(){
    let emails = getEmailInputs();
    emails.sort();
    let check = true;
    for(let i = 0; i < emails.length; i++){
        emails[i].style.color = 'black';
        for(let j = 0; j < emails.length; j++) {
            if (i != j && emails[i].value == emails[j].value) {
                emails[i].style.color = 'red';
                check = false;
            }
        }
    }
    return check;
}
function startup(){
    document.getElementById('new').addEventListener("click", makeNew);
    threeTimes();
    document.getElementById("form").setAttribute("onsubmit", "return check()");
}
function threeTimes()
{
	for(let i = 0; i < 3; i++){
		document.getElementById('new').click();
	}
}

window.addEventListener("load", startup);
