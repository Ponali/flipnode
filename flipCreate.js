(async ()=>{

let fs=require("node:fs");
let settings={frames:12,locked:false,thumbIdx:0,users:{
	root:{"id":"1440D700CEF78DA8","name":"Ponali"/*"root"*/},
	parent:{"id":"1440D700CEF78DA8","name":"Ponali"/*"parent"*/},
	current:{"id":"1440D700CEF78DA8","name":"Ponali"/*"current"*/}
}}
let filename=require("./encoding/filename").generateFilename();
let animData=require("./encoding/animation").createAnimationData(settings.frames,false);
let soundData=await require("./encoding/sound-group").createSoundData("","","","",7,6);
let header=require("./encoding/header").generateHeader(animData.length,soundData.length,settings.frames,settings.locked,settings.thumbIdx,settings.users.root,settings.users.parent,settings.users.current,filename,filename,filename,null);
let thumbnail=require("./encoding/thumbnail").randomThumbnail();
let out=header.concat(thumbnail,animData,soundData).flat();
fs.writeFileSync("output.ppm",Buffer.from(out));

})();