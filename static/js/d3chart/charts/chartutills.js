window.addEventListener("load",function (){

	$(".download_g").click(function (){

			var imgTitle = "woori_won";
			var imgscale = 3;
			var $this = $(this);
			var svglist = $(this).parent().parent().parent().find("svg");
			var svg = svglist[0];
			if(svglist.length >= 2){
				saveSvgAsPng(svglist[1],"test.png", {scale : imgscale});
			}
			console.log(svg);
			saveSvgAsPng(svg,imgTitle, {scale : imgscale});
		}
	);

	function exportToPDF(divid) {
		var svgElement = document.getElementById(divid);
		console.log(svgElement);
		var svg = svgElement.innerHTML;
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		canvas.width = 1920;
		canvas.height = 1080;
		//var Canvg = new window.canvg.Canvg;
		var v =  canvg.Canvg.fromString(context, svg);
		v.resize(1920,1080,true);
		v.start();
		var imgData = canvas.toDataURL("image/png");
		var doc = new jspdf.jsPDF("l", "pt", [1920, 1080]);
		doc.addImage(imgData, "PNG", 0, 0, 1920, 1080);
		doc.save("svg-png-chart.pdf");
	}


});