function getUCS2Notation(str,len){
	let buf=Buffer.from(str,"ucs-2"),out=[];
	for(let i=0;i<buf.length;i++){out.push(buf[i]);}
	if(len){while(out.length<len){out.push(0);}}
	return out;
}
function hexStringToBytes(hx,len){
	if(hx.length%2){hx="0"+hx;}
	hx=hx.split("").map((a)=>parseInt(a,16));
	let out=[];
	for(let i=0;i<hx.length;i+=2){
		out.push((hx[i]<<4)|(hx[i+1]));
	};
	while(out.length<len){out=[0].concat(out);}
	return out;
}
function generateMetadata(locked,thumbFrameIdx,rootAuth,parentAuth,currentAuth,parentFile,filename,rootFile,modifiedDate){
	let fnLib=require("./filename");
	// rootAuth, parentAuth and currentAuth are objects with keys "name" and "id"
	if(modifiedDate){modifiedDate=modifiedDate.getTime();}else{modifiedDate=Date.now();}
	modifiedDate=Math.floor(modifiedDate/1000)-(2000-1970)*365*24*60*60;
	
	thumbFrameIdx=thumbFrameIdx&65535;
	let meta=[0,locked,thumbFrameIdx>>8,thumbFrameIdx&255];
	meta=meta.concat(getUCS2Notation(rootAuth.name,22));
	meta=meta.concat(getUCS2Notation(parentAuth.name,22));
	meta=meta.concat(getUCS2Notation(currentAuth.name,22));
	meta=meta.concat(hexStringToBytes(parentAuth.id));
	meta=meta.concat(hexStringToBytes(currentAuth.id));
	//meta=meta.concat(parentAuth.id,currentAuth.id));
	meta=meta.concat(fnLib.primaryFilenameNotation(parentFile));
	meta=meta.concat(fnLib.primaryFilenameNotation(filename));
	meta=meta.concat(hexStringToBytes(rootAuth.id));
	meta=meta.concat(fnLib.rootFilenameFragment(rootFile));
	meta=meta.concat((modifiedDate>>24)&255,(modifiedDate>>16)&255,(modifiedDate>>8)&255,modifiedDate&255);
	return meta.concat(0,0);
};
function generateHeader(animData,soundData,frameCount,locked,thumbFrameIdx,rootAuth,parentAuth,currentAuth,parentFile,filename,rootFile,modifiedDate){
	[animData,soundData,frameCount]=[animData,soundData,frameCount].map((a)=>a-1)
	console.log(parentAuth);
	let header = "PARA".split("").map((a)=>a.charCodeAt());
	//[animData,soundData]=[animData,soundData].map((a)=>a.length&0xffffffff);
	header.push((animData>>24)&255,(animData>>16)&255,(animData>>8)&255,animData&255);
	//header.push((animData>>16)&255,(animData>>8)&255,animData&255);
	//header.push((soundData>>16)&255,(soundData>>8)&255,soundData&255);
	header.push((soundData>>24)&255,(soundData>>16)&255,(soundData>>8)&255,soundData&255);
	header.push(frameCount>>8,frameCount&255);
	//header.push(0,0x24) // format version
	header.push(0x24,0) // format version
	header=header.concat(generateMetadata(locked,thumbFrameIdx,rootAuth,parentAuth,currentAuth,parentFile,filename,rootFile,modifiedDate));
	return header;
};
module.exports={generateHeader}