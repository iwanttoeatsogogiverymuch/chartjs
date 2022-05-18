window.addEventListener("load",function (){

	$(".download_g").click(function (){

			var imgTitle = "그래프 다운로드";
			var imgscale = 3;
			var $this = $(this);
			var svglist = $(this).parent().parent().parent().find("svg");
			var svg = svglist[0];

			if(svglist.length <= 2){

				saveSvgAsPng(svglist[1],"test.png", {scale : imgscale});
			}
			console.log(svg);
			saveSvgAsPng(svg,imgTitle, {scale : imgscale});


		}

	);


});