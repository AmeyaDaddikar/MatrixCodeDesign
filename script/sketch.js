let symbolColor = {rr:55, gg:160, bb:0};
let symbolSize  = 16;
let streams = [];
let baseChar = 0x30A0;

function setup() {
	createCanvas(document.body.clientWidth,document.body.clientHeight);
	textSize(symbolSize);
	
	let totalStreams = width/symbolSize;
	for(let i = 0; i < totalStreams; i++){
		
		let x = i*symbolSize;
		let y = round(-random(100,400));
		let speed = round(random(3,8));
				
		let newStream = new SymbolStream(x,y,speed);
		streams.push(newStream);
	} 
}


function draw() {
	background(0,160);
	  
	streams.forEach(function(stream){
		stream.renderStream();
	});
}

var Symbol = function(x,y,speed,isGlowing){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.isGlowing = isGlowing;
	
	this.value = String.fromCharCode(
				baseChar 
				+ round(random(0,96))
				);
				
	this.symbolChangeInterval = round(random(24,59));
	
	
	this.randomizeSymbol = function(){
		this.value = String.fromCharCode(
			baseChar + round(random(0,96))
		);
	};
	
	this.renderSymbol = function(){
		
		if(frameCount % this.symbolChangeInterval == 0)
			this.randomizeSymbol();

		if(this.isGlowing)
			fill(153,255,51);
		else
			fill(symbolColor.rr, symbolColor.gg, symbolColor.bb);
	
	
		text(this.value, this.x, this.y);
		
		this.y += this.speed;
		if(this.y >= height)
			this.y = -(10*symbolSize);
	};
};

var SymbolStream = function(x,y,speed){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.symbolArr = [];
	this.symbolCount = round(random(4,16));
	
	for(let i = 0; i < this.symbolCount; i++){
		let glow  = round(random(0,9))%2 == true;

		let symbol = new Symbol(this.x,this.y-i*symbolSize,speed,glow);
		this.symbolArr.push(symbol);
	}
	
	this.renderStream = function(){
		this.symbolArr.forEach(function(symbol){
			symbol.renderSymbol();
		});
	};
}
