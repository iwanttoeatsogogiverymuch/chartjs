var barchart = (function barchart(){


    //비대면 실적
    //대면 실적
    function barchartiife(){


        var svgwidth = 870;
        var svgheight = 500;

        var divid;

        var legend2;

        var keys;

        var daucolor;

        var daucolorpallete;

        var z2;

        var mcgpalette0;

        var y;

        var x1;

        var x0;

        var g2;

        var height2;

        var width2;

        var margin2;

        var svg2;

        var tooltip;


        var parseddata;


        /**
         *  - 3자리수 (숫자, 문자열) 컴마찍는 함수
         * @param num {string || Number} - 3자리수로 ,를 추가할 숫자
         * @returns {string} - 3자리수 단위로 , 를 추가한 string 반환
         */

        function setComma(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        /**
         *  - 차트 그리는 함수
         * @param id {string} - svg 차트를 그릴 div의 id값
         * @param datas {string || Object} - json data 형식
         * {
         * AREA     :   x축 카테고리,
         * CODE     :   그룹 카테고리,
         * value    :    값
         * }
         */
        function draw(id,datas) {

            //div id
            divid = id;

            //json 파싱
            parseddata = JSON.parse(JSON.stringify(datas));

            //툴팁생성
            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("display", "none").attr("font-size", "3rem");

            //svg 생성
            svg2 = d3.select("#"+id)
                .append("svg")
                .attr("width", svgwidth)
                .attr("height", svgheight)
                .attr("viewBox", "0 0 " + svgwidth + " " + svgheight)
                .attr("preserveAspectRatio", "none");

            //마진설정
            //차트를 svg 사이즈에서 조금 여백을 줘야함
            margin2 = {
                top: 30,
                right: 60,
                bottom: 60,
                left: 60
            };
            width2 = +svg2.attr("width") - margin2.left - margin2.right;
            height2 = +svg2.attr("height") - margin2.top - margin2.bottom;

            //positioning the svg g
            g2 = svg2
                .append("g")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

            //도메인 매핑함수 초기화
            x0 = d3.scaleBand()
                .rangeRound([0, width2-30]).paddingInner(0.15);
            x1 = d3.scaleBand()
                .padding(0.1);
            y = d3.scaleLinear()
                .rangeRound([height2, 0]);


            //잔액기준실적 컬러매핑핑
            mcgpalette0 = [
                "#8664cb",
                "#0075CC",
                "#48A0CE",
                "#44C4BE",
                "#36C35D",
                "#6079D6",
            ];


            //컬러 매핑
            z2 = d3
                .scaleOrdinal()
                .range(mcgpalette0);

            //유저통계차트용 컬러스키마
            daucolorpallete = [
                "#8ea7e0",
                "#8ccbd2",
                "#fba597"
            ];

            //유저통계차트용 컬러매핑
            daucolor = d3
                .scaleOrdinal()
                .range(daucolorpallete);


            //json 키값(가장처음칼럼제외)
            keys = Object.keys(parseddata[0]);

            //x축 키값 설정
            x0.domain(
                parseddata.map(function (d) {
                    //날짜
                    var datekey = Object.keys(parseddata[0])[0];
                 //   console.log(datekey);
                    return d[datekey];
                })
            );

            //grouped bar 키값 설정
            x1.domain(
                parseddata.map(function (d) {
                //날짜
                var codekey = Object.keys(parseddata[0])[1];
                //   console.log(datekey);
                return d[codekey];
            }))
                .rangeRound([0, x0.bandwidth()]);

            //y축 도메인 설정
            y.domain([
                0,
                d3.max(parseddata, function (d){
                    return Number(d.value);
                }),
            ]).nice();

            //바차트 사각형 그리는 부분
            g2.append("g")
                .selectAll("g")
                .data(parseddata)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.AREA) + ",0)";
                })
                .append("rect")
                .attr("x", function (d) {
                    return x1(d.CODE);
                })
                .attr("width", x1.bandwidth())
                .attr("y", y(0))
                .on("mouseover", function () {
                    tooltip.style("display", null);
                })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                })
                .on("mousemove", function (d) {

                    // var subgroupName = d3.select(this.parentNode).datum().key;
                    // var subgroupValue = d.data[subgroupName];

                    tooltip.style("left", (d3.event.pageX + 10) + "px");
                    tooltip.style("top", (d3.event.pageY - 10) + "px");
                    tooltip.html(d.CODE.toString() + "<br>" + Math.round(Number(d.value)).toLocaleString("en"));

                })
                .transition()
                .duration(1000)
                .delay(function (d, i) {
                    return i * 10;
                }).ease(d3.easeSin)
                .attr("height", function (d) {

                    return height2 - y(d.value);
                })

                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("rx", 2)
                .attr("fill", function (d) {
                    return z2(d.CODE);
                });


            //tooltip text top
            g2.append("g")
                .selectAll("g")
                .data(parseddata)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.AREA) + ",0)";
                })
                .append("text")
                .attr("dy", "1em")
                .attr("fill", "#3a3a3a")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.7rem")
                .attr("text-anchor", "start")
                .attr("x", function (d) {
                    return x1(d.CODE);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height2 - y(parseInt(d.value));
                })
                .attr("y", function (d) {
                    if( !isNaN((Number(d.value))) ){
                        return y(Number(d.value)) - 18;
                    }
                    else{
                        return 0;
                    }

                })
                .text(function (d) {

                    //전체인경우 데이터라벨추가
                    // 0 인경우 보여지지 않음
                if(d.CODE === "전체" && Math.round(Number(d.value)) !== 0){
                    return Math.round(Number(d.value)).toLocaleString("en");
                }
                });

            //x축 범위표시
            g2.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x0).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove();
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke","#999999");
                })
                .call(function (g) {

                    //텍스트 컬러설정
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838");

                    //30개이상일때 45도 회전시키기
                    if(datas.length >= 30){

                        g.selectAll("text")
                            .attr("transform","rotate(-45)")
                            .attr("text-anchor","end")
                            .attr("dx","-0.8em")
                            .attr("dy","-0.35em");

                    }
                });
            //y축 범위표시
            g2.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s").tickSizeOuter(0))
                .call(function (g) {
                g.selectAll(".tick line").remove()
                 })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke","#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#4b5154")
                })
                .append("text")
                .attr("x", width2 / 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#101010")
                .attr("font-weight", "Regular")
                .attr("font-size", "0.5rem")
                .attr("text-anchor", "middle");


            //범례
            legend2 = svg2
                .append("g")
                .attr("font-size", "0.7rem")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(x1.domain())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(90," + (40 + (i * 16)) + ")";
                });


            //범례 사각형
            legend2
                .append("rect")
                .attr("x", width2 - 18)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", z2);

            //범례 텍스트
            legend2
                .append("text")
                .attr("x", width2 - 20)
                .attr("dy","0.32em")
                .attr("y", 5)
                .text(function (d) {
                    return d;
                });



        }

        /**
         *  - draw 로 초기화한 이후 데이터 갱신시에 쓸 함수
         * @param newdata 새롭게 갱신할 데이터
         */
    function update(newdata){

            d3.select("#"+divid).select("svg").remove();
            draw(divid,newdata);

    }


        return {

            draw:draw,
            update:update

        }

    }


    // 외부로 함수반환

    return barchartiife;

        })();

