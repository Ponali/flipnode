const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
function useColorPalette(data){
	let colors=["ffffff","525252","ffffff","9c9c9c","ff4844","c8514f","ffadac","00ff00","4840ff","514fb8","adabff","00ff00","b657b7","00ff00","00ff00","00ff00"];
	colors=colors.map((a,i)=>[i,parseInt(a.slice(0,2),16),parseInt(a.slice(2,4),16),parseInt(a.slice(4,6),16)]);
	//console.log(colors);
	function get_closest_color(colors, [r2, g2, b2]) { // https://stackoverflow.com/a/69880443
	  const [[closest_color_id]] = (
		colors
		.map(([id, r1,g1,b1]) => (
		  [id, Math.sqrt((r2-r1)**2 + (g2-g1)**2 + (b2-b1)**2)]
		))
		.sort(([, d1], [, d2]) => d1 - d2)
	  );
	  return colors.find(([id]) => id == closest_color_id);
	};
	data=data.map((a)=>[a>>16,a>>8,a].map((b)=>b&255));
	data=data.map((a)=>get_closest_color(colors,a)[0]);
	return data;
}
function encodeThumbnail(data){
	data=useColorPalette(data);
	data=chunk(data,2).map((a)=>(a[0]<<4)|a[1]);
	return data;
}
function randomThumbnail(){
	return encodeThumbnail([...Array(64*48).keys()].map(()=>Math.random()*0xffffff));
}
module.exports={randomThumbnail,encodeThumbnail}