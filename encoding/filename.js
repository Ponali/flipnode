let hex="0123456789ABCDEF";
function randomHex(len){
	return "0".repeat(len).split("").map(()=>hex[Math.floor(Math.random()*hex.length)]).join("")
}
function generateFilename(){
	let out="";
	while(!out.match(/[0-9A-F]{6}_[0-9A-F]{13}_[0-9]{3}/)){
		out=randomHex(6)+"_"+randomHex(5)+randomHex(8)+"_000";
	}
	console.log("using filename "+out);
	return out;
}
function rootFilenameFragment(fn){
	let a,b;
	a=fn.split("_")[0];
	b=fn.split("_")[1].slice(0,10);
	[a,b]=[a,b].map((c)=>c.match(/.{1,2}/g).map((a)=>parseInt(a,16)));
	return a.concat(b);
};
function primaryFilenameNotation(fn){
	console.log("got "+fn)
	let mac=fn.split("_")[0];
	let str=fn.split("_")[1];
	let edit=parseInt(fn.split("_")[2]);
	let out=[];
	console.log("mac="+mac+" str="+str+" edit="+edit);
	out=out.concat(mac.match(/.{1,2}/g).map((c)=>parseInt(c,16)));
	out=out.concat(str.split("").map((a)=>a.charCodeAt()));
	out=out.concat(edit>>8,edit&255);
	out=out.flat();
	console.log("returned",out)
	return out;
}
module.exports={generateFilename,rootFilenameFragment,primaryFilenameNotation};