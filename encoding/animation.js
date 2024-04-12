let frameLib=require("./frame");
function generateOffsetTable(animData){
	let a=[],b=0;
	for(let i=0;i<animData.length;i++){
		a.push(b);
		b+=animData[i].length;
	} // should it be swapped?
	return a;
}
function createAnimationData(frameCount,loop){
	let animData=[];
	for(let i=0;i<frameCount;i++){
		animData.push(frameLib.generateRandomFrame(i));
		console.log("frame "+i+"/"+frameCount+" complete")
	}
	let offsetTable=generateOffsetTable(animData);console.log("offset table:\n",offsetTable);
	let header=[],flags=0x40;
	flags=flags|(loop*0x2);
	console.log("flags = 0x"+flags.toString(16))
	let offLen=offsetTable.length*4;
	header.push(offLen&255,offLen>>8,0,0,0,0,flags&255,flags>>8);
	for(let i=0;i<offsetTable.length;i++){
		let a=offsetTable[i]
		header=header.concat([a>>24,a>>16,a>>8,a].map((a)=>a&255));
	}
	return [header,animData].flat(2);
};
module.exports={createAnimationData};