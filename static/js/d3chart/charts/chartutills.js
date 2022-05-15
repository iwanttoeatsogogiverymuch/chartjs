window.addEventListener("load",function (){

	$(".download_g").click(function (){

			var imgscale = 3;
			var $this = $(this);
			var svglist = $(this).parent().parent().parent().find("svg");
			var svg = svglist[0];

			if(svglist.length <= 2){

				saveSvgAsPng(svglist[1],"test.png", {scale : imgscale});
			}
			console.log(svg);
			saveSvgAsPng(svg,"test.png", {scale : imgscale});


		}

	);
	//
	// function changeDataFormatTo3dimemsion(rawData){
	//
	// 	if(rawData !== undefined)
	// 	{
	// 		var newArray
	// 		var tempArray = rawData.map(function (d){
	// 				var keyandvalue = Object.entries().map(function (d){
	//
	// 					var row;
	// 					row.AREA =
	// 					return newArray.push();
	// 				});
	// 		});
	// 	}
	// 	else{
	// 		console.warn(rawData,"no data defined...");
	// 	}
	// }


});