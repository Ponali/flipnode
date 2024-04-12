const fs=require("node:fs");
const { exec } = require('child_process');
function randomSound(){
	return soundFromFile('../random.wav');
}
function soundFromFile(file){
	return new Promise((resolve)=>{
		process.stdout.write("encoding "+file+": 1/3\r")
		exec("sox \""+__dirname+"\\"+file+"\" -t ima -N -r 8192 \""+__dirname+"\\output.adpcm\"",(err)=>{
			if(err){throw err;};
			process.stdout.write("encoding "+file+": 2/3\r")
			fs.readFile(__dirname+"\\output.adpcm",(err,fileBuffer)=>{
				if(err) throw err;
				process.stdout.write("encoding "+file+": 3/3\r")
				fs.unlink(__dirname+"\\output.adpcm",(err)=>{
					if(err) throw err;
					process.stdout.write("encoding "+file+": done\n")
					resolve(fileBuffer);
				})
			})
		});
	})
};
/*(async ()=>{
	console.log(await randomSound())
})();*/
module.exports={randomSound,soundFromFile};