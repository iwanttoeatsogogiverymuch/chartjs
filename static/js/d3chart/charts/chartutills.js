window.addEventListener("load",function (){

	/**
	 * svg그래프 다운로드 기능 버튼에 추가
	 * @requires savesvgaspng
	 * @requires jquery
	 */
	$(".download_g").click(function (){

			var imgTitle = "woori_won";
			var imgscale = 3;
			var $this = $(this);
			var svglist = $(this).parent().parent().parent().find("svg");
			var svg = svglist[0];
			if(svglist.length >= 2){
				saveSvgAsPng(svglist[1],"test.png", {scale : imgscale});
			}
			saveSvgAsPng(svg,imgTitle, {scale : imgscale});
		}
	);

	/**
	 * svg파일을 pdf로 다운로드하는 기능
	 * @requires jspdf
	 * @param divid {string}
	 */
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



	/**
	 * 브라우저체크
	 * @returns {string}
	 */
	function getBrowserType() {

		var agent = window.navigator.userAgent.toLowerCase();
		var browserType ="";

		if(agent.indexOf('trident')>-1){
			browserType = "IE";
		}else if(agent.indexOf('safari')>-1){
			browserType = "safari";
		}else if(agent.indexOf('chrome')>-1){
			browserType = "chrome";
		}else if(agent.indexOf('firefox')>-1){
			browserType = "firefox";
		}else if(agent.indexOf('opera')>-1){
			browserType = "opera";
		}

		console.log(browserType);
		return browserType;
	}

	/**
	 * @TODO 그래프 다운로드 버튼 IE브라우저에서 삭제하는기능
	 */
		function deleteDownloadSvgButtonInIE() {

		var svgDownloadButtonId = "download_g";
		var browserType = getBrowserType();
		var button = document.getElementsByClassName(svgDownloadButtonId);

		if(browserType === "IE")
		{
			while(button.length > 0) button[0].parentNode.removeChild(button[0]);
		}
	}
	deleteDownloadSvgButtonInIE();



	/**
	 * svg 요소 2개를 한개의 svg로 ( div ) 안에 합치는 기능
	 * @param firstDivId {string}  : 첫번째 svg를 child로 가지고있는 div의 id값
	 * @param secondDivId {string} : 두번째 svg를 child로 가지고있는 div의 id값
	 */
	function mergeTwoSvg(firstDivId, secondDivId) {

		var svgNS = "http://www.w3.org/2000/svg";
		var mergedDiv = document.createElement("div");
		var mergedSvg = document.createElementNS(svgNS,"svg");

		mergedDiv.setAttribute("id","mergedDiv");
		mergedDiv.appendChild(mergedSvg);


		var firstSvgContainer = document.getElementById(firstDivId);
		var secondSvgContainer = document.getElementById(secondDivId);

		var firstContent = Array.from(firstSvgContainer.getElementsByTagName("svg")[0].childNodes);
		var secondContent = Array.from(secondSvgContainer.getElementsByTagName("svg")[0].childNodes);

		for (let i = 0; i < chartContent.length; i++) {
			mergedSvg.appendChild(firstContent[i]);
		}
		for (let i = 0; i < legendContent.length; i++) {
			mergedSvg.appendChild(secondContent[i]);
		}

	}

});