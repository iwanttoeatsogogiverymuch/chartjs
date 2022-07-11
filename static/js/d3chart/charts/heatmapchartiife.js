
// 이용자현황
// 코호트차트
// 우리WON 저축은행 앱

var heatmapchart = (function heatmap(){


    //차트를 그릴 div id
    var divid;

    //svg 가로값
    var width =1800;
    //svg 세로값
    var height = 250;
    //컬러스케일값 빨간색 부분 지정
    var myColorred;
    //컬러스케일값 파란색 부분 지정
    var myColor;

    //툴팁
    var tooltip;

    //데이터
    var data;

    //차트 마진(빈공간)
    var margin5;

    //차트의 가로값,세로값 (svg값이랑 다름)
    var width5, height5;

    //svg와 그안의 g값을 참조 ( 경우에따라 다를 수 있음, svg값만 참조하는것이아님)
    var svg6;

    //가입일? , retention 측정 기간
    // ex) 4월 20일 가입자 : signdate:2022-04-20  preioddate: 2022-04-23
    var signdates, preioddates;

    //x축 y축 스케일 매핑 (단순값x)
    var x5, y5;

    var usercounts;
    

    //툴팁생성
    function buildTooltip() {

            if(tooltip === undefined){
                tooltip = d3.select("body").append("div")
                    .attr("class", "toolTip")
                    .style("display", "none")
                    .attr("font-size", "3rem")
                    .style("opacity","0");
            }

    }

    //사이즈조절 및 마진설정

    function setSize() {


        if(data.length > 700){
            height = 1200;
        }

        else{
            height = 250;
        }

        margin5 = {top: 20, right: 30, bottom: 30, left: 80};
        width5 = width - margin5.left - margin5.right;
        height5 = height - margin5.top - margin5.bottom;
    }

    /**
     *
     * @param jsondata {string || Object}- json 데이터 (obejct or 문자열
     * @returns {Object} - json object로 변환한 데이터
     */
    function getData(jsondata) {
        return JSON.parse(JSON.stringify(jsondata));
    }

    //svg생성
    function buildSvg() {

        svg6 = d3
            .select("#" + divid)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", "0 0 " + width.toString() + " " + height.toString())
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

    }

    /**
     *
     * @param jsondata
     */
    function initChart (jsondata){

        buildTooltip();
        data = getData(jsondata);
        setSize();
        buildSvg();

    }
    /**
     * - 차트 그리는 함수
     * @param id {string}  :  차트 svg 요소를 담을 부모 div의 id
     * @param jsondata {json}  :  차트에 그릴 json 데이터 JSON.stringify(data) 로 넣어주는것이 안전
     */
    function draw(id,jsondata) {

        divid = id;

        //다시그릴때
        if(svg6 !== undefined){
            d3.select("#"+divid).select("svg").remove();
        }

        initChart(jsondata);

        signdates = data.map(function (d) {
            return d.APP_LOGIN_DT;
        });

        preioddates = data.map(

            function (d) {
                return parseInt(d.PERIOD);
            }
        );

        usercounts = data.filter(function (d) {
            return d.PERIOD === "4";
        });

        // Build X scales and axis:
        x5 = d3.scaleBand()
            .range([50, width5])
            .domain(preioddates.sort(d3.ascending))
            .padding(0.1);


        svg6
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line").remove()
            })
            .call(function (g) {
                g.selectAll("text")
                    .attr("fill", "grey")
                    .attr("font-size","0.7rem");
            });


        y5 = d3.scaleBand()
            .range([height5, 0])
            .domain(signdates.sort(d3.ascending))
            .padding(0.1);


        svg6.append("g")
            .attr("transform", "translate(50," + 0 + ")")
            .call(d3.axisLeft(y5).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line")
                    .remove()
            })
            .call(function (g) {
                g.selectAll("text").attr("x","-5")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
                    .attr("font-size",function (d) {
                    if(usercounts.length < 10){
                        return "0.7rem";
                    }
                    else{
                        return (y5.bandwidth()/3).toString()+"px";
                    }

                })
            });

        // Build color scale
        myColor = d3
            .scaleSequential()
            .domain([1, 0.5])
            .interpolator(d3.interpolate("#418af3", "white"));

        myColorred = d3.scaleSequential()
            .domain([0.5, 0])
            .interpolator(d3.interpolate("white", "#ff5d5c"));


        //유저수 라벨 위치 매핑 함수
        var userXScale = d3.scaleBand()
            .range([height5, 0])
            .domain(usercounts.sort(d3.ascending))
            .padding(0.1);

        //유저수 라벨
        svg6
            .selectAll()
            .append("g")
            .data(usercounts)
            .enter()
            .append("text")
            .attr("transform", "translate(-50," + 0 + ")")
            .attr("y",function (d) {
               return y5(d.APP_LOGIN_DT)+y5.bandwidth()/2;
            })
            .attr("height",y5.bandwidth()/2)
            .attr("dy","0.32em")
            .attr("fill", "grey")
            .attr("font-size",function (d) {
                if(usercounts.length < 10){
                    return "0.7rem";
                }
                else if(usercounts.length >=11 && usercounts.length <=14){
                    return "0.5rem";
                }
                else if (usercounts.length > 15 && usercounts.length <= 50){
                    return "0.7rem";
                }
                else{
                    return (y5.bandwidth()/2).toString()+"px";
                }

            })
            .text(function (d){
                return d.ALL;
            });

       //일자 라벨
        svg6
            .append("g")
            .attr("transform", "translate(-50," + 0 + ")")
            .append("text")
            .attr("x","0")
            .attr("y","-5")
            .attr("dy","0.35em")
            .attr("font-family", "Noto Sans KR")
            .attr("fill", "grey")
            .attr("font-size","0.5rem")
            .text("신규가입자수");

        //전체유저수 라벨
        svg6
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .append("text")
            .attr("x","8")
            .attr("y","-5")
            .attr("dy","0.35em")
            .attr("font-family", "Noto Sans KR")
            .attr("fill", "grey")
            .attr("font-size","0.5rem")
            .text("가입일");

        //cohort 차트
        svg6
            .selectAll()
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .data(data, function (d) {
                return d;
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {

                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
            })
            .attr("width", function () {
                return x5.bandwidth();
            })
            .attr("height", function () {
                return y5.bandwidth();
            })
            .attr("rx", "3")
            .attr("ry", "2")
            .style("fill", function (d) {
                if (d.RETENTION_RATE > 0.5) {
                    return myColor(d.RETENTION_RATE);
                } else {
                    return myColorred(d.RETENTION_RATE);
                }
            })
            .on("mouseover", function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "1");
                tooltip.style("display", null);
                svg6.selectAll("rect")
                    .filter(function (d) {return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT})
                    .style("fill",function () {
                        return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
                    });

            })
            .on("mouseout", function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "0");
                tooltip.style("display", "none");
                svg6.selectAll("rect")
                    .filter(function (d) {return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT})
                    .style("fill",function () {
                        return d3.hsl(d3.select(this).style("fill")).brighter(0.5).toString();
                    });

            })
            .on("mousemove", function (d) {

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d3.format(",.1%")(d.RETENTION_RATE) +"<br>"+d.APP_LOGIN_DT);

            })
        svg6
            .append("g")
            .attr("font-family", "Noto Sans KR")
            .attr("font-weight", "Light")
            .attr("font-size", function (d){
                if(usercounts.length> 21){
                    return (y5.bandwidth()/4).toString() + "px";
                }
               else{
                   return "9px";
                }
            })
            .append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .style("pointer-events","none")
            .text(function (d) {
                return d3.format(",.1%")(d.RETENTION_RATE);
            })
            .attr("x", function (d) {
                // return (i * 20) + 40;

                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
                //return (local.get(this) * 20) + 40;
            })
            .attr("dx", x5.bandwidth() / 2)
            .attr("dy", y5.bandwidth() / 2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", function (d) {

                var textcolor;
                if (d.RETENTION_RATE >= 0.27 && d.RETENTION_RATE < 0.6) {
                    textcolor = "grey";
                } else {
                    textcolor = "white";
                }
                return textcolor;

            })

    }

    //public function
    function update(jsondata) {

        initChart(jsondata);

        signdates = data.map(function (d) {
            return d.APP_LOGIN_DT;
        });

        preioddates = data.map(

            function (d) {
                return parseInt(d.PERIOD);
            }
        );
        // Build X scales and axis:
        x5 = d3.scaleBand()
            .range([50, width5])
            .domain(preioddates.sort(d3.ascending))
            .padding(0.1);


        d3.select("#"+divid).select("svg").remove();

        svg6
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line").remove()
            })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });


        y5 = d3.scaleBand()
            .range([height5, 0])
            .domain(signdates.sort(d3.ascending))
            .padding(0.1);


        svg6.append("g")
            .attr("transform", "translate(50," + 0 + ")")
            .call(d3.axisLeft(y5).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line")
                    .remove()
            })
            .call(function (g) {
                g.selectAll("text").attr("x","-5")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });

        // Build color scale
        myColor = d3
            .scaleSequential()
            .domain([1, 0.5])
            .interpolator(d3.interpolate("#418af3", "white"));

        myColorred = d3.scaleSequential()
            .domain([0.5, 0])
            .interpolator(d3.interpolate("white", "#ff5d5c"));

        usercounts = data.filter(function (d) {
            return d.PERIOD === "4";
        });


        svg6
            .selectAll()
            .append("g")
            .data(usercounts)
            .enter()
            .append("text")
            .attr("transform", "translate(-50," + 0 + ")")
            .attr("y",function (d) {
                return y5(d.APP_LOGIN_DT)+y5.bandwidth()/2;
            })
            .attr("height",y5.bandwidth()/2)
            .attr("dy","0.32em")
            .attr("fill", "grey")
            .attr("font-size","0.7rem")
            .text(function (d){
                return d.ALL;
            });


        //일자 라벨
        svg6
            .append("g")
            .attr("transform", "translate(-50," + 0 + ")")
            .append("text")
            .attr("x","0")
            .attr("y","-5")
            .attr("dy","0.35em")
            .attr("fill", "grey")
            .attr("font-size","0.5rem")
            .text("신규가입자수");


        //전체유저수 라벨
        svg6
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .append("text")
            .attr("x","0")
            .attr("y","-5")
            .attr("dy","0.35em")
            .attr("fill", "grey")
            .attr("font-size","0.5rem")
            .text("가입일");

        svg6
            .selectAll()
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .data(data, function (d) {
                return d;
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {

                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
            })
            .attr("width", function () {
                return x5.bandwidth();
            })
            .attr("height", function () {
                return y5.bandwidth();
            })
            .style("fill", function (d) {
                if (d.RETENTION_RATE > 0.5) {
                    return myColor(d.RETENTION_RATE);
                } else {
                    return myColorred(d.RETENTION_RATE);
                }
            })
            .on("mouseover", function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "1");
                svg6.selectAll("rect")
                    .filter(function (d) {return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT})
                    .style("fill",function () {
                        return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
                    });

            })
            .on("mouseout", function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "0");

                svg6.selectAll("rect")
                    .filter(function (d) {return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT})
                    .style("fill",function () {
                        return d3.hsl(d3.select(this).style("fill")).brighter(0.5).toString();
                    });
                d3.select(this).attr("width",function () {
                    return x5.bandwidth();
                }).attr("height",function () {
                    return y5.bandwidth();
                });

            })
            .on("mousemove", function (d) {

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d3.format(",.1%")(d.RETENTION_RATE) +"<br>"+d.APP_LOGIN_DT);

            })
        svg6
            .append("g")
            .attr("font-family", "Noto Sans KR")
            .attr("font-weight", "Light")
            .attr("font-size", "0.7rem")
            .append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .style("pointer-events","none")
            .text(function (d) {
                return d3.format(",.1%")(d.RETENTION_RATE);
            })
            .attr("x", function (d) {
                // return (i * 20) + 40;

                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
                //return (local.get(this) * 20) + 40;
            })
            .attr("dx", x5.bandwidth() / 2)
            .attr("dy", y5.bandwidth() / 2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", function (d) {

                var textcolor;
                if (d.RETENTION_RATE >= 0.3 && d.RETENTION_RATE < 0.6) {
                    textcolor = "grey";
                } else {
                    textcolor = "white";
                }
                return textcolor;

            })


    }


            //public area
            return {
                update: update,
                draw:draw
            };



})();
       
       
       
       


