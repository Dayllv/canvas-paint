//封装获取dom 的方法
function $(id){
	return document.getElementById(id);
}
function getTag(tagName){
	return document.getElementsByTagName(tagName);
}

//按钮状态控制
function activeBtn(obj){
	var objArr = getTag('a');
	for(var i=0;i<objArr.length;i++){
		objArr[i].index = i;
		for(var j=0;j<objArr.length;j++){
			objArr[j].className = "header-btn";
		}
		obj.className = "header-btn active-btn";	
		
	}
}

var cxt = $('canvas').getContext("2d");
var isDraw = false;
//画布设置
//默认线宽，和颜色
var dW = 2;
var dC = "black";
function settingDraw(){
	cxt.lineWidth = dW;
	cxt.strokeStyle = dC ;
}


//清除画布
$('clear-img').onclick = function(){
	cxt.clearRect(0,0,1200,598)	
}

//画笔
$('tool-pen').onclick = function(){
	activeBtn(this);
	dW = 2;
	if(dC =="white")dC = 'black';
	settingDraw();
	draw();
}

//橡皮檫
$('tool-eraser').onclick = function(){
	activeBtn(this);
	dW = 5;
	dC = "white";
	settingDraw();
	draw();
}

//油漆刷
$('tool-brush').onclick = function(){
	activeBtn(this);
	dW = 10;
	if(dC =="white")dC = 'black';
	settingDraw();
	draw();
}

//放大镜

//文本框

//形状
$('shape-line').onclick = function(){
	activeBtn(this);
	if(dC =="white")dC = 'black';
	settingDraw();
	shape(1);
}
$('shape-react').onclick = function(){
	activeBtn(this);
	if(dC =="white")dC = 'black';
	settingDraw();
	shape(2);
}
$('shape-circle').onclick = function(){
	activeBtn(this);
	if(dC =="white")dC = 'black';
	settingDraw();
	shape(3)
}
//颜色
var colorArr = ['red','blue','green','brown','yellow','pink'];
var _length = $("color-list").getElementsByTagName('li').length;
for(var i=0;i<_length;i++){
	$("color-list").getElementsByTagName('li')[i].index = i;
	$("color-list").getElementsByTagName('li')[i].onclick = function(){
		dC = colorArr[this.index];
		for(var j=0;j<_length;j++){
			$("color-list").getElementsByTagName('li')[j].style.borderColor = "transparent";
		}
		this.style.borderColor = "black";
	}
}


var start = {},end = {},isDone = false;
function shape(n){
	
	var type = n;
	$("canvas").onmousedown = function(e){
		isDone = false;
		settingDraw();
		var ev = e || event;
		posBegin = {
			x:ev.pageX - $('canvas').offsetLeft,
			y:ev.pageY - $('canvas').offsetTop
		};
		start.x = posBegin.x;
		start.y = posBegin.y;
		$("canvas").onmousemove = function(e){
			if(!isDone){
				var ev = e ||event;
				var posMove = {
					x:ev.pageX - this.offsetLeft,
					y:ev.pageY - this.offsetTop
				}
				end.x = posMove.x;
				end.y = posMove.y;
			}
			
		}
	}
	$('canvas').onmouseup = function(){
		isDone = true;
		cxt.beginPath();
		if(type ==1){
			cxt.moveTo(start.x,start.y);
			cxt.lineTo(end.x,end.y);
			cxt.stroke();
		}else if(type == 2){
			cxt.rect(start.x,start.y,end.x - start.x,end.y - start.y);
			cxt.stroke();
		}else if(type == 3){
			var r = Math.sqrt(Math.pow((end.x - start.x),2) + Math.pow((end.y - start.y),2))
			cxt.arc(start.x,start.y,r,0,360,false);
			cxt.stroke();
		}else{
			
		}
	}
}

function draw(){
	
	//画笔功能
	$('canvas').onmousedown = function(e){
		settingDraw();
		var ev = e || event;
		var posBegin = {
			x:ev.pageX - $("canvas").offsetLeft,
			y:ev.pageY - $("canvas").offsetTop
		}
		cxt.beginPath();
		cxt.moveTo(posBegin.x,posBegin.y);
		isDraw = true;
	};
	$('canvas').onmousemove = function(ev){
		if(isDraw){
			var e = ev ||event;
			var posMove = {
				x:e.pageX - this.offsetLeft,
				y:e.pageY - this.offsetTop
			}
			cxt.lineTo(posMove.x,posMove.y);
			cxt.stroke();
		}
	}	
	$('canvas').onmouseup = function(){
		cxt.closePath();
		isDraw = false;
	}
}