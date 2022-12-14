var can=document.getElementById("can");
var cc=can.getContext("2d");
var canWidth=can.width;var canHeight=can.height;
var centerOfSystem = { x:canWidth*0.1, y:canHeight*0.5 }

var dt=0;//deltatime
var lastTime=new Date();

var path1 = new Path2D("M31.324,25.224c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,3.859,3.141,7,7,7S31.324,29.083,31.324,25.224zM24.324,30.224c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S27.081,30.224,24.324,30.224z");
var path2 = new Path2D("M23.324,34.09v6.134c0,0.553,0.447,1,1,1s1-0.447,1-1V34.09c0-0.553-0.447-1-1-1S23.324,33.537,23.324,34.09z");
var path3 = new Path2D("M23.324,10.224v6.134c0,0.552,0.447,1,1,1s1-0.448,1-1v-6.134c0-0.552-0.447-1-1-1S23.324,9.671,23.324,10.224z");
var path4 = new Path2D("M34.224,36.537c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L31.3,30.786c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L34.224,36.537z");
var path5 = new Path2D("M13.011,13.91c-0.391,0.391-0.391,1.023,0,1.414l4.338,4.337c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-4.338-4.337C14.034,13.52,13.401,13.52,13.011,13.91z");
var path6 = new Path2D("M39.324,24.224H33.19c-0.553,0-1,0.448-1,1s0.447,1,1,1h6.134c0.553,0,1-0.448,1-1S39.877,24.224,39.324,24.224z");
var path7 = new Path2D("M8.324,25.224c0,0.552,0.447,1,1,1h6.134c0.553,0,1-0.448,1-1s-0.447-1-1-1H9.324C8.771,24.224,8.324,24.671,8.324,25.224z");
var path8 = new Path2D("M34.224,13.91l-4.338,4.338c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l4.338-4.338c0.391-0.391,0.391-1.023,0-1.414S34.614,13.52,34.224,13.91z");
var path9 = new Path2D("M13.718,36.83c0.256,0,0.512-0.098,0.707-0.293l4.338-4.337c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0l-4.338,4.337c-0.391,0.391-0.391,1.023,0,1.414C13.206,36.732,13.462,36.83,13.718,36.83z");


var y = 0;

function draw(){
    //updating dt\
    dt=(new Date()-lastTime)/500;
    lastTime=new Date();
    y = 5*Math.sin(lastTime/100) + 5*Math.sin(lastTime/110);
    //updating and rendering
    cc.clearRect(0,0,can.width,can.height);
    drawAtmosphere();
    particleSystem.draw(cc,dt,y);
    drawSun();
    requestAnimationFrame(draw);
}

function drawSun(){
    cc.save();
    cc.fillStyle = "yellow";
    cc.translate(can.width*0.1-25,can.height*0.5-25);
    cc.fill(path1);
    cc.fill(path2);
    cc.fill(path3);
    cc.fill(path4);
    cc.fill(path5);
    cc.fill(path6);
    cc.fill(path7);
    cc.fill(path8);
    cc.fill(path9);
    cc.restore();
}

function drawAtmosphere(){
    cc.save();
    cc.strokeStyle = "white";
    cc.fillStyle = "SkyBlue";
    cc.lineWidth = 1;
    cc.beginPath();
    cc.arc(can.width+1070,can.height/2,1510,3*Math.PI/5,7*Math.PI/5);
    cc.fill();
    cc.stroke();
    cc.closePath();
    cc.fillStyle = "LightBlue";
    cc.lineWidth = 1;
    cc.beginPath();
    cc.arc(can.width+1070,can.height/2,1300,3*Math.PI/5,7*Math.PI/5);
    cc.fill();
    cc.stroke();
    cc.restore();
    drawReceptor();
    drawGraph();
}

var hitCount = [];
var receptor = {
    x:can.width-40,
    y:can.height/2,
    eyeSize: 30
}

var particleSystem=new ParticlesSystem(100,{x:canWidth*0.1,y:canHeight*0.5},0.2,0.5,190,195,receptor);

function drawReceptor(){
    cc.save();
    cc.strokeStyle = "white";
    cc.fillStyle = "White";
    cc.lineWidth = 1;
    cc.beginPath();
    cc.arc(receptor.x,receptor.y,receptor.eyeSize,0,2*Math.PI);
    cc.fill();
    cc.stroke();
    cc.closePath();
    cc.strokeStyle = "black";
    cc.fillStyle = "black";
    cc.lineWidth = 1;
    cc.beginPath();
    cc.arc(receptor.x-15,receptor.y,receptor.eyeSize/3,0,2*Math.PI);
    cc.fill();
    cc.stroke();
    cc.closePath();
    cc.restore();
}

var xAxis = 261;
var startX = 20;
var yAxis = 150;
var startY = can.height/4;
var arrowLength = 5;

function drawGraph(){
    cc.save();
    cc.strokeStyle = "white";
    cc.beginPath();
    cc.moveTo(startX,startY);
    cc.lineTo(startX+xAxis,startY);
    cc.stroke();
    cc.lineTo(startX+xAxis-arrowLength,startY-arrowLength);
    cc.stroke();
    cc.moveTo(startX+xAxis,startY);
    cc.lineTo(startX+xAxis-arrowLength,startY+arrowLength);
    cc.stroke();
    cc.moveTo(startX,startY);
    cc.lineTo(startX,startY-yAxis);
    cc.stroke();
    cc.lineTo(startX-arrowLength,startY-yAxis+arrowLength);
    cc.stroke();
    cc.moveTo(startX,startY-yAxis);
    cc.lineTo(startX+arrowLength,startY-yAxis+arrowLength);
    cc.stroke();
    cc.closePath();
    cc.restore();
    for(var i=0;i<xAxis;i++){
        cc.beginPath();
        cc.fillStyle = "hsl("+i+",100%,50%)";
        cc.arc(startX+i,startY-particleSystem.hitCount[i],2,0,2*Math.PI);
        cc.fill();
        cc.closePath();
        
    }
    console.log(particleSystem.hitCount[50]);
}

var soundTrack = new Audio("important.mp3");
var began = false;
function begin(){
    if(began == false){
        draw();
        began = true;
        document.getElementById("click").style = "display: none";
    }
}

document.getElementById("can").addEventListener("click", function(){
    begin();
    soundTrack.play();
});