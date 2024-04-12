function rawEncode(data){
	// this must not be used much, when you're done testing, add other compression algorithms
	let out=[[],[]];
	for(let i=0;i<256;i++){
		out[0].push(data[i][0])
		out[1].push(data[i][1])
	};
	// out=chunk(out.flat(),8); // seperate into 8bit chunks
	// out=out.map((a)=>{let b=0;for(let i=0;i<8;i++){b=b*2+a[i]};return b;}) // turn into 8bit numbers
	return out;
}

function encodeLine(data){
	return [3,rawEncode(data)];
}

module.exports={encodeLine}