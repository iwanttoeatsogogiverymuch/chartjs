(function ChartUtils() {

    //전역변수에 올림
    var ChartUtils = {};

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

    //툴팁
    function initToolTip(){
        
            //ie9 display none 제대로 동작 안함
            //opcacity값으로 조정
            var tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("opcaity", "0").attr("font-size", "3rem");

     return tooltip;

    }

    ChartUtils.setComma = setComma;
    ChartUtils.initTooltip = initToolTip;
    this.ChartTuils = ChartUtils;

})();