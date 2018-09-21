let open = false;
var input;
var button;
var chatbox;

var message;
var blocked;

var nameDiv;
var username;
var count = 0;

var messageLink;

var questions = [];
var questionNum;

var blocked;

var chatLink;



function setup() {
	blocked = false;
  	var canvas = createCanvas(300, 400);
  	chatbox = select('#chatbox');
  	canvas.parent('sketch-holder');

  	chatLink = select("#chatLink");
  	chatLink.mouseClicked(openMessage);

 	input = createInput();
  	input.position(1, 372);
  	input.size(230, 25)
  	input.parent('sketch-holder');
  	input.hide();
  	chatbox.hide();

  	
  	button = createButton('send');
  	button.id('send');
  	button.position(247, 377);
  	button.parent('sketch-holder');
  	



  	questions = ["Hey!", "what's your name?","are you a guy or a girl?", "how old are you?", 
  	"where do you live?", "what kind of stuff do you like?", "what sort of music do you listen to?",
  	"whats your favourite movie?", "did you go to university?", "where did you go to university?", "do you work?", 
  	"where about's do you work?", 
  	"Okay the first couple of things we had in common I could understand, but this is just creepy now. " ,
  	"I don't know what's wrong with you if you think you can just steal someone's identity. Stay away from me. " ];

  	username = 'User';
  	questionNum = 0;

  	nameDiv = createDiv(username);
	nameDiv.id('theirname');
	nameDiv.parent(chatbox);

	message = createDiv(questions[0]);
	message.id('received');
	message.parent(chatbox);	
	input.value('');
	textSize(15);
	textFont('Segoe UI');

  	

}

function draw(){

	if(open == false){
		if(count < 50){
			count++;
	}
	else {
		count = 0;
	}

	input.hide();
	button.hide();
	chatbox.hide()
	clear();
	noStroke();
	if(blocked == false){
		if(count < 25){
			fill('#0086FF');
		}
		else{
			fill('#4dacff');
		}
	} else {
		fill('#b8d4ed');
	}		

	rect(0, 370, 300, 30);	
	
		if(blocked == false){	
			fill('#4BCB1C');	
			ellipse(15, 385, 15, 15);

			fill('#000000');
			text(username + ' sent you a message!', 30, 390);
		}
		else {			
			fill('#000000');
			text(username + ' is offline', 10, 390);
		}
	}
	else {

  	noStroke();
	fill('#FFFFFF');
	rect(0, 370, 300, 30);

	if(blocked == false){
		fill('#0086FF');
	} else {
		fill('#b8d4ed');
	}

	rect(0, 0, 300, 30);
	input.show();
	//button.show();
	chatbox.show();	

	button.position(247, 377);
	
	fill('#0086FF');
	quad(250, 377, 280, 387, 250, 397, 255, 387);



	if(blocked == false){
		fill('#4BCB1C');	
		ellipse(15, 15, 15, 15);

		fill('#000000');		
		text(username, 30, 20);
	} else {
		print('test');
		fill('#000000');		
		text(username, 10, 20);
	}


	button.mousePressed(sendMessage);
	
	}

}

function keyTyped(){
	print("key pressed " + keyCode);
	if(keyCode == 13 && open == true){
		sendMessage();
	}
}

function sendMessage(){
	if(input.value() != '' && blocked == false){

		nameDiv = createDiv('you');
		nameDiv.id('yourname');
		nameDiv.parent(chatbox);

		message = createDiv(input.value());
		message.id('sent');
		message.parent(chatbox);	

		
		nameDiv = createDiv(username);
		nameDiv.id('theirname');
		nameDiv.parent(chatbox);

		message = createDiv(answer(input.value()));
		message.id('received');
		message.parent(chatbox);	
		input.value('');


	} else if(input.value() != '' && blocked == true){

		nameDiv = createDiv('you');
		nameDiv.id('yourname');
		nameDiv.parent(chatbox);

		message = createDiv(input.value());
		message.id('sent');
		message.parent(chatbox);	


		blocked = createDiv("This user has blocked you");
		blocked.id("blocked");
		blocked.parent(chatbox);
		input.value('');
	}

}

function answer(msg){
	var t = msg.toLowerCase();
	if(match(t, "hello|hey|hi") != null && questionNum == 0){
		questionNum = 1;
		return questions[questionNum];
	}
	else if(match(t, "hello|hey|hi") != null && questionNum != 0 && questionNum < 12){
		return "Hi! " + questions[questionNum];
	}
	else if(match(t, "who|what|where|why|how") != null && questionNum != 0){
		if(questionNum < 12){ 
		return "This is more fun if i ask the questions... " + questions[questionNum];
		}
		else {
			questionNum = 13;
			blocked = true;
			return "I'm the one asking the questions here. " + questions[questionNum];
		}
	}
	else if(questionNum == 1){ //answer name
		username = t.charAt(0).toUpperCase() + t.substr(1, 13);
		questionNum = 2;	
		select("#nameDisplay").html(username);
		select("#privacyNotice")
		.html("People who aren't friends with " + username + " see only some of their profile information. If you know " + username + " personally, send them a message.");
		nameReceived = true;
			return "Huh? That's my name too! " + questions[2];
			
	} 
	else if(questionNum == 2){
		if(match(t, "girl|female|woman|lady") != null){ //girl
			select("#profilePic").style('background-image', 'url("img/profileFemale.png")');
			select("#gender").html("Woman");

			questionNum = 3;
			return "Oh same here! " + questions[3];

		} else if(match(t, "guy|male|man|dude|boy") != null){
			select("#profilePic").style('background-image', 'url("img/profileMale.png")');
			select("#gender").html("Man");

			questionNum = 3;
			return "Oh same here! " + questions[3];

		} else {
			select("#profilePic").style('background-image', 'url("img/profileOther.png")');
			select("#gender").html("Other");

			questionNum = 3;
			return "Interesting... " + questions[3];
		}
	}

	else if(match(t, "(^|[^0-9])[1-9][0-9]($|[^0-9])") != null && questionNum == 3){ //answer age
		select('#age').html((match(t, "(^|[^0-9])[1-9][0-9]($|[^0-9])"))[0]);
		questionNum = 4;
		return "Oh we're even the same age! " + questions[4];		

	} else if(match(t, ",") != null && questionNum == 4){ //answer location
		select('#location').html((match(t, "^(.+?),")) [0]);
		questionNum = 5;
		return "No way!  Thats where I live! " + questions[5];		

	} 
	else if(questionNum == 4){ //answer location
		questionNum = 5;
		select('#location').html(t);
		return "No way!  Thats where I live! " + questions[5];	
	} 
	else if(questionNum == 5){ //interests
		select('#interests').html(t);
		questionNum = 6;
		return "Wow we have so much in common :) " + questions[6];
	} 
	else if(questionNum == 6){ //music
		select('#music').html(t);

		questionNum = 7;
		return "You have excellent taste :) "+ questions[7];
	}
	else if(questionNum == 7){ //movie
		select('#movie').html(t);

		questionNum = 8;
		return "Oh great choice, I totally agree. So "+ questions[8];
	}
	else if(questionNum == 8 && 
	match(t, "yes|yea|of course|i did(?!n)|i do(?!n)|totally|definitely|ya|no|not|never|didn't|i don't|dont|didnt|na") != null){ //
		if(match(t, "yes|yea|of course|i did(?!n)|i do(?!n)|totally|definitely|ya") != null) { //uni yes/no

			questionNum = 9;
			return "Oh cool me too! "+ questions[9];
		} else if(match(t, "no|not|never|didn't|didnt|dont|i don't|na") != null) {

			select('#college').html("didn't go");
			questionNum = 10;
			return "Same here... now this is getting weird... "+ questions[10];
		}
	}
	else if(questionNum == 9){ //uni where

		select('#college').html(t);
		questionNum = 10;
		return "Okay now this is getting weird... "+ questions[10];
	}
	else if(questionNum == 10 && 
	match(t, "yes|yea|of course|i did(?!n)|i do(?!n)|totally|definitely|ya|no|not|never|didn't|i don't|dont|didnt|na") != null){ //work yes/no
		if(match(t, "yes|yea|of course|i did(?!n)|i do(?!n)|totally|definitely|ya") != null) { 

			questionNum = 11;
			return "Same... "+ questions[11];
		} else if(match(t, "no|not|never|didn't|didnt|dont|i don't|na") != null) {

			select('#job').html("unemployed");
			questionNum = 12;
			return "What the hell? "+ questions[12];
		}
	} 
	else if(questionNum == 11){ //work where

		select('#job').html(t);
		questionNum = 12;
		return "What the hell? "+ questions[12];
	} else if(questionNum == 12) {

		blocked = true;
		questionNum = 13;
		return questions[13];
	} else if (questionNum == 13){

		return "blocked";
	}

	else {
		if(questionNum == 0){
			questionNum = 1;
			return "I'm not sure... anyway " + questions[1];
		} 
		else {
			return "who knows... anyway " + questions[questionNum];
		}
	}
	
}

function mouseClicked(){

if(open == false && mouseX > 0 && mouseX < width && mouseY < height && mouseY > 370){
	open = true;
}
else if(open == true && mouseX > 0 && mouseX < width && mouseY < 30 && mouseY > 0){
	open = false;
} else if (open == true && mouseX > 245 && mouseX < 285 && mouseY > 375 && mouseY < 405){
	sendMessage();
}


}

function openMessage(){
	open = true;
	
}