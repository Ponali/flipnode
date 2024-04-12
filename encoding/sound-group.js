let sndsing=require("./sound-singular.js")
function get32BitRepresentation(a){
	return [a>>24,a>>16,a>>8,a].map((a)=>a&255);
};
function getArrayFromBuffer(buf){
	let out=[];
	for(let i=0;i<buf.length;i++){
		out.push(buf[i]);
	};
	return out;
}
function createSoundHeader(bgmLen,SE1Len,SE2Len,SE3Len,playSpeed,bgmSpeed){
	let header=[];
	header=header.concat(get32BitRepresentation(bgmLen));
	header=header.concat(get32BitRepresentation(SE1Len));
	header=header.concat(get32BitRepresentation(SE2Len));
	header=header.concat(get32BitRepresentation(SE3Len));
	header=header.concat(8-playSpeed,8-bgmSpeed);
	header=header.concat("0".repeat(14).split("").map(()=>0));
	return header;
}
async function createSoundData(bgmFile,SE1File,SE2File,SE3File,playSpeed,bgmSpeed){
	let bgmData = await sndsing.randomSound();
	let SE1Data = await sndsing.randomSound();
	let SE2Data = await sndsing.randomSound();
	let SE3Data = await sndsing.randomSound();
	[bgmData,SE1Data,SE2Data,SE3Data]=[bgmData,SE1Data,SE2Data,SE3Data].map((a)=>getArrayFromBuffer(a));
	let header = createSoundHeader(bgmData.length,SE1Data.length,SE2Data.length,SE3Data.length,playSpeed,bgmSpeed);
	return [header,bgmData,SE1Data,SE2Data,SE3Data].flat();
};
/*(async ()=>{
	console.log(await createSoundData("","","","",7,6));
})();*/
module.exports={createSoundData};