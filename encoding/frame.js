const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
let lineLib=require("./line");
function generateRandomFrame(seed){
	let randomData=[...Array(256*192).keys()].map((_,i)=>[((i+seed)/3)%1,((i+seed*2/3)/5)%1]);
	return encodeFrame(randomData,1,2,1);
};
function ditheredData(data){
	return data.map((a)=>a.map((b)=>Math.round(b)));
	// replace this when everything's done.
}
function seperateLines(data){
	let out=[];
	for(let i=0;i<192;i++){
		out.push(data.slice(256*i,256*(i+1)));
	};
	return out;
}
function encodeFrame(data,lay1col,lay2col,paper){
	let out=[],head="00000000";
	head[0]="0"; //frame diffing (xor)
	head[1]=head[2]="0"; // translate flag?
	[head[3],head[4]]=[lay2col>>1,lay2col&1].map((a)=>a.toString());
	[head[5],head[6]]=[lay1col>>1,lay1col&1].map((a)=>a.toString());
	head[7]=paper.toString();
	head=parseInt(head,2);
	let comp=[];
	
	data=seperateLines(ditheredData(data));
	data=data.map((a)=>{let o=lineLib.encodeLine(a);comp.push(o[0]);return o[1]});
	data=data.flat(2);
	//data=[lay1enc>>1,lay1enc&1,lay2enc>>1,lay2enc&1,data].flat();
	data=chunk(data.flat(),8);
	data=data.map((a)=>{let b=0;for(let i=0;i<8;i++){b=b*2+a[i]};return b;})
		
	comp=chunk(comp,4).map((a)=>a[3]|(a[2]<<2)|(a[1]<<4)|(a[0]<<6));
	
	return [head,comp,data].flat();
};
module.exports={generateRandomFrame,encodeFrame};
//console.log(generateRandomFrame());