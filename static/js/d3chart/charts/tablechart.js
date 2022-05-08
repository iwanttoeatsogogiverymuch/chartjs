

var tablechart = (function heatmap(){

    var config;
    //지역변수

    //차트를 그릴 div id
    var divid;

    //svg 가로값
    var width = 600;
    //svg 세로값
    var height = 200;
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


    // 코호트 사용자 분석 테스트 데이터 (임의가공분)
    // 차트상 표시되는 x좌표인 period_num은 차트내부에서 계산됨

    var cohortdata2 = [

        {"signdate": "카카오톡이체", "retentiondate": "2022-04-03", "retentionvalue": "99"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-02", "retentionvalue": "99"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-04", "retentionvalue": "98"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-05", "retentionvalue": "97"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-06", "retentionvalue": "96"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-07", "retentionvalue": "88"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-08", "retentionvalue": "77"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-09", "retentionvalue": "66"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-10", "retentionvalue": "45"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-03", "retentionvalue": "97"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-04", "retentionvalue": "96"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-05", "retentionvalue": "95"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-06", "retentionvalue": "93"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-07", "retentionvalue": "92"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-08", "retentionvalue": "88"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-09", "retentionvalue": "79"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-10", "retentionvalue": "77"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-11", "retentionvalue": "65"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-12", "retentionvalue": "50"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-13", "retentionvalue": "42"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-14", "retentionvalue": "33"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-15", "retentionvalue": "32"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-16", "retentionvalue": "30"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-17", "retentionvalue": "29"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-18", "retentionvalue": "28"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-19", "retentionvalue": "25"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-20", "retentionvalue": "20"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-21", "retentionvalue": "18"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-22", "retentionvalue": "15"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-23", "retentionvalue": "13"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-24", "retentionvalue": "12"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-25", "retentionvalue": "11"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-26", "retentionvalue": "10"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-27", "retentionvalue": "9"},
        {"signdate": "카카오톡이체", "retentiondate": "2022-04-28", "retentionvalue": "8"}
    ];


    var cohortdata = [

        {"signdate": "전체", "retentiondate": "1", "retentionvalue": "100"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-02", "retentionvalue": "99"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-03", "retentionvalue": "99"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-04", "retentionvalue": "98"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-05", "retentionvalue": "97"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-06", "retentionvalue": "96"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-07", "retentionvalue": "88"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-08", "retentionvalue": "77"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-09", "retentionvalue": "66"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-10", "retentionvalue": "45"},
        {"signdate": "2022-04-01", "retentiondate": "2022-04-11", "retentionvalue": "33"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-03", "retentionvalue": "97"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-04", "retentionvalue": "96"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-05", "retentionvalue": "95"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-06", "retentionvalue": "93"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-07", "retentionvalue": "92"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-08", "retentionvalue": "88"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-09", "retentionvalue": "79"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-10", "retentionvalue": "77"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-11", "retentionvalue": "65"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-12", "retentionvalue": "50"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-13", "retentionvalue": "42"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-14", "retentionvalue": "33"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-15", "retentionvalue": "32"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-16", "retentionvalue": "30"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-17", "retentionvalue": "29"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-18", "retentionvalue": "28"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-19", "retentionvalue": "25"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-20", "retentionvalue": "20"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-21", "retentionvalue": "18"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-22", "retentionvalue": "15"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-23", "retentionvalue": "13"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-24", "retentionvalue": "12"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-25", "retentionvalue": "11"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-26", "retentionvalue": "10"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-27", "retentionvalue": "9"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-28", "retentionvalue": "8"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-29", "retentionvalue": "7"},
        {"signdate": "2022-04-02", "retentiondate": "2022-04-30", "retentionvalue": "6"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-04", "retentionvalue": "98"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-05", "retentionvalue": "97"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-06", "retentionvalue": "96"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-07", "retentionvalue": "94"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-08", "retentionvalue": "93"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-09", "retentionvalue": "88"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-10", "retentionvalue": "79"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-11", "retentionvalue": "76"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-12", "retentionvalue": "72"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-13", "retentionvalue": "70"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-14", "retentionvalue": "65"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-15", "retentionvalue": "60"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-16", "retentionvalue": "55"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-17", "retentionvalue": "52"},
        {"signdate": "2022-04-03", "retentiondate": "2022-04-18", "retentionvalue": "50"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-05", "retentionvalue": "90"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-06", "retentionvalue": "88"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-07", "retentionvalue": "86"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-08", "retentionvalue": "82"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-09", "retentionvalue": "78"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-10", "retentionvalue": "66"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-11", "retentionvalue": "55"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-12", "retentionvalue": "50"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-13", "retentionvalue": "35"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-14", "retentionvalue": "29"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-15", "retentionvalue": "21"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-16", "retentionvalue": "19"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-17", "retentionvalue": "17"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-18", "retentionvalue": "8"},
        {"signdate": "2022-04-04", "retentiondate": "2022-04-19", "retentionvalue": "1"}

    ];

    function setConfig(){

        if(config === undefined){

            config = {

                isxAxisTitleVisible:true,
                isyAxisTitleVisible:true,
                isTitleVisible: true,
                isLegendVisible : true,
                isTable: true,
                gridline:{
                    x:true,
                    y:false,
                }

            };

        }
        else{

        }

    }

    function onMouseOutRect() {
        return function (d) {
            var mouseoverdata = d;
            tooltip.style("opacity", "0");

            svg6.selectAll("rect")
                .filter(function (d) {
                    return d.signdate === mouseoverdata.signdate
                })
                .style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).brighter(0.5).toString();
                });
            d3.select(this).attr("width", function () {
                return x5.bandwidth();
            }).attr("height", function () {
                return y5.bandwidth();
            });

        };
    }


    //지역함수

    function onMouseMoveRect() {
        return function (d) {

            // var subgroupName = d3.select(this.parentNode).datum().key;
            //  var subgroupValue = d.data.signdate;


            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.html(d.retentionvalue.toString() + "<br>" + d.signdate);

        };
    }

    function onMouseOverRect() {
        return function (d) {
            var mouseoverdata = d;
            tooltip.style("opacity", "1");
            svg6.selectAll("rect")
                .filter(function (d) {
                    return d.signdate === mouseoverdata.signdate
                })
                .style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
                })
            d3.select(this).attr("width", function () {
                return x5.bandwidth() + 5;
            }).attr("height", function () {
                return y5.bandwidth() + 5;
            });


        };
    }


    function buildTooltip() {

        tooltip = d3.select("body").append("div")
            .attr("class", "toolTip")
            .style("opcaity", "0").attr("font-size", "3rem");
    }

    function setSize() {

        margin5 = {top: 10, right: 30, bottom: 30, left: 80};
        width5 = width - margin5.left - margin5.right;
        height5 = height - margin5.top - margin5.bottom;
    }


    function getData(jsondata) {
        return JSON.parse(JSON.stringify(jsondata));
    }

    function buildSvg() {


        // div를 선택하여 svg요소를 붙여넣는다
        // view box, preserveAsepectRatio 를통해 반응형 차트로 제작
        svg6 = d3
            .select("#" + divid)
            .append("svg")
            .attr("width", width5 + margin5.left + margin5.right)
            .attr("height", height5 + margin5.top + margin5.bottom)
            .attr("viewBox", "0 0 700 200")
            .attr("prserveAspectRatio", "none")
            .append("g")
            .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");
    }

    function initChart (jsondata){

        buildTooltip();
        data = getData(jsondata);
        setSize();
        buildSvg();

    }

    //public function
    function draw(id,jsondata) {

        divid = id;

        initChart(jsondata);

        signdates = data.map(function (d) {
            return d.signdate;
        });

        preioddates = data.map(function (d, i) {
            //  return moment - new Date(d.retentiondate.toString()) ;

            if (d.signdate.toString() === "전체") {

                return data[i].preiod_num = d.retentiondate;
            }

            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            data[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        // Build X scales and axis:
        x5 = d3.scaleBand()
            .range([0, width5 + 100])
            .domain(preioddates.sort(d3.ascending)).padding(0.02);


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
            .domain(signdates.sort(d3.ascending)).padding(0.02);



        svg6.append("g")
            .call(d3.axisLeft(y5).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line")
                    .remove()
            })
            .call(function (g) {
                //g.append("rect").attr("fill","white").attr("storke","grey").attr("stroke-width","1");
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("dy","0.32em")
                    .attr("text-anchor","end")
                    .attr("fill", "grey")
            });



        svg6
            .selectAll()
            .append("g")
            .data(data, function (d) {
                return d;
            })
            .enter()
            .append("rect")
            .attr("class","values")
            // .style("stroke", "grey")
            // .style("stroke-opacity", "0.2")
            .attr("x", function (d) {

                return x5(d.preiod_num);
            })
            .attr("y", function (d) {
                return y5(d.signdate);
            })
            .attr("rx","3")
            .style("stroke-width","0.2")
            .style("stroke","lightgrey")
            .attr("width", function () {
                return x5.bandwidth();
            })
            .attr("height", function () {
                return y5.bandwidth();
            })
            .style("fill", "white")
            .on("mouseover", function (d) {

                var mouseoverdata = d;
                tooltip.style("opacity", "1");
                svg6.selectAll("rect")
                    .filter(function (d) {
                        if(d.signdate !== undefined){
                            return  d.signdate === mouseoverdata.signdate;
                        }
                        })

                    .style("fill",function () {
                        return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
                    });


            })
            .on("mouseout", function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "0");

                svg6.selectAll("rect")
                    .filter(function (d) {return d.signdate === mouseoverdata.signdate})
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

                // var subgroupName = d3.select(this.parentNode).datum().key;
                //  var subgroupValue = d.data.signdate;

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d.retentionvalue.toString() +"<br>"+d.signdate);

            })
        svg6
            .append("g")
            .attr("font-family", "Noto Sans KR")
            .attr("font-weight", "Light")
            .attr("font-size", "0.5rem")
            .append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d) {
                return d.retentionvalue + "%";
            })
            .attr("x", function (d) {
                // return (i * 20) + 40;

                return x5(d.preiod_num);
            })
            .attr("y", function (d) {
                return y5(d.signdate);
                //return (local.get(this) * 20) + 40;
            })
            .attr("dx", x5.bandwidth() / 2)
            .attr("dy", y5.bandwidth() / 2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", function (d) {

                var textcolor;
                if (d.retentionvalue >= 30 && d.retentionvalue < 60) {
                    textcolor = "grey";
                } else {
                    textcolor = "grey";
                }
                return textcolor;

            })
            .attr("pointer-events","none");



    }
    function update(newData){

        svg6.selectAll("g").remove().exit();
        svg6.selectAll("rect").remove().exit();

        signdates = newData.map(function (d) {
            return d.signdate;
        });

        preioddates = newData.map(function (d, i) {
            //  return moment - new Date(d.retentiondate.toString()) ;

            if ( d.signdate.toString() === "전체") {

                return newData[i].preiod_num = d.retentiondate;
            }

            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            newData[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        // Build X scales and axis:
        x5 = d3.scaleBand()
            .range([0, width5 + 100])
            .domain(preioddates.sort(d3.ascending));



        svg6
            .append("g")
            .attr("transform", "translate(0,"  + 0 + ")")
            .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line").remove()
            })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });

        // svg6
        //     .append("g")
        //     .attr("transform", "translate(0," + 0 + ")")
        //     .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
        //     .call(function (g) {
        //         g.selectAll(".domain, .tick line").remove()
        //     })
        //     .call(function (g) {
        //         g.selectAll("text")
        //             .attr("font-family", "Noto Sans KR")
        //             .attr("fill", "grey")
        //     });




        // Build Y scales and axis:
        y5 = d3.scaleBand()
            .range([height5, 0])
            .domain(signdates.sort(d3.ascending));




        // .padding(0.01);
        svg6.append("g")
            .call(d3.axisLeft(y5).tickSize(0))
            .call(function (g) {
                g.selectAll(".domain, .tick line")
                    .remove()
            })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });


        svg6
            .selectAll().append("g")
            .data(newData, function (d) {
                return d;
            })
            .enter()
            .append("rect")
            // .attr("x", "0")
            // .attr("y", "0")
            .attr("x", function (d) {

                return x5(d.preiod_num);
            })
            .style("fill", function (d) {
                if (d.retentionvalue > 50) {
                    return myColor(d.retentionvalue);
                } else {
                    return myColorred(d.retentionvalue);
                }
            })
            .on("mouseover", onMouseOverRect())
            .on("mouseout", onMouseOutRect())
            .on("mousemove", onMouseMoveRect())
            .transition().delay(function (d,i) {return  i*15;}).ease(d3.easeSin)

            .attr("y", function (d) {
                return y5(d.signdate);
            })
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", function () {
                return x5.bandwidth();
            })
            .attr("height", function () {
                return y5.bandwidth();
            });


        svg6
            .append("g")
            .attr("font-family", "Noto Sans KR")
            .attr("font-weight", "Light")
            .attr("font-size", "0.3rem")
            .append("g")
            .selectAll("text")
            .data(newData)
            .enter()
            .append("text")
            .text(function (d) {
                return d.retentionvalue + "%";
            })
            .attr("x", function (d) {
                return x5(d.preiod_num);
            })
            .attr("y", function (d) {
                return y5(d.signdate);
            })
            .attr("dx", x5.bandwidth() / 2)
            .attr("dy", y5.bandwidth() / 2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", function (d) {

                var textcolor;
                if (d.retentionvalue >= 30 && d.retentionvalue < 60) {
                    textcolor = "grey";
                } else {
                    textcolor = "grey";
                }
                return textcolor;
            })
            .attr("pointer-events","none");


    }

    var cohortdata2test =  JSON.parse(JSON.stringify(cohortdata2));


    //init inside test

    // setTimeout(function(){
    //
    //     draw();
    // },1000);
    //
    //
    //
    // setTimeout(function(){
    //
    //             update(cohortdata2test);
    //         },3000);
    //

    //public area
    return {
        update: update,
        draw:draw
    };



})();






