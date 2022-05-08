(function ChartUtils() {

    //global에 올릴 변수
    var ChartUtills = {};


    //타입을 변환해주는 함수
    function getType(target) {
        return Object.prototype.toString.call(target).slice(8, -1);
    }
    
    
    //문자열 세자리 수 ',' 생성함수
    function setComma(num) {
        var len, point, str;

        num = num + "";
        point = num.length % 3;
        len = num.length;

        str = num.substring(0, point);
        while (point < len) {
            if (str != "") str += ",";
            str += num.substring(point, point + 3);
            point += 3;
        }

        return str;
    }

    //툴팁 생성 함수
    function initToolTip(){
        
            //ie9 display none 제대로 동작 안함
            //opcacity값으로 조정
            var tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("opcaity", "0").attr("font-size", "3rem");

     return tooltip;

    }

    ChartUtills.getType = getType;
    ChartUtills.setComma = setComma;
    ChartUtills.initTooltip = initToolTip;

    //전역 = 브라우저 window 객체에 ChartTuills객체를 담는다.

    this.ChartUtills = ChartUtills;

})();