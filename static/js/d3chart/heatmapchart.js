window.addEventListener("load", function () {

var cohortdata = [

{"signdate":"2022-04-01","retentiondate":"2022-04-02","retentionvalue":"100"},
{"signdate":"2022-04-01","retentiondate":"2022-04-03","retentionvalue":"99"},
{"signdate":"2022-04-01","retentiondate":"2022-04-04","retentionvalue":"98"},
{"signdate":"2022-04-01","retentiondate":"2022-04-05","retentionvalue":"97"},
{"signdate":"2022-04-01","retentiondate":"2022-04-06","retentionvalue":"96"},
{"signdate":"2022-04-01","retentiondate":"2022-04-07","retentionvalue":"88"},
{"signdate":"2022-04-01","retentiondate":"2022-04-08","retentionvalue":"77"},
{"signdate":"2022-04-01","retentiondate":"2022-04-09","retentionvalue":"66"},
{"signdate":"2022-04-01","retentiondate":"2022-04-10","retentionvalue":"45"},
{"signdate":"2022-04-01","retentiondate":"2022-04-11","retentionvalue":"33"},

{"signdate":"2022-04-02","retentiondate":"2022-04-03","retentionvalue":"97"},
{"signdate":"2022-04-02","retentiondate":"2022-04-04","retentionvalue":"96"},
{"signdate":"2022-04-02","retentiondate":"2022-04-05","retentionvalue":"95"},
{"signdate":"2022-04-02","retentiondate":"2022-04-06","retentionvalue":"93"},
{"signdate":"2022-04-02","retentiondate":"2022-04-07","retentionvalue":"92"},
{"signdate":"2022-04-02","retentiondate":"2022-04-08","retentionvalue":"88"},
{"signdate":"2022-04-02","retentiondate":"2022-04-09","retentionvalue":"79"},
{"signdate":"2022-04-02","retentiondate":"2022-04-10","retentionvalue":"77"},
{"signdate":"2022-04-02","retentiondate":"2022-04-11","retentionvalue":"65"},
{"signdate":"2022-04-02","retentiondate":"2022-04-12","retentionvalue":"50"},
{"signdate":"2022-04-02","retentiondate":"2022-04-13","retentionvalue":"42"},
{"signdate":"2022-04-02","retentiondate":"2022-04-14","retentionvalue":"33"},
{"signdate":"2022-04-02","retentiondate":"2022-04-15","retentionvalue":"32"},
{"signdate":"2022-04-02","retentiondate":"2022-04-16","retentionvalue":"30"},
{"signdate":"2022-04-02","retentiondate":"2022-04-17","retentionvalue":"29"},
{"signdate":"2022-04-02","retentiondate":"2022-04-18","retentionvalue":"28"},
{"signdate":"2022-04-02","retentiondate":"2022-04-19","retentionvalue":"25"},
{"signdate":"2022-04-02","retentiondate":"2022-04-20","retentionvalue":"20"},
{"signdate":"2022-04-02","retentiondate":"2022-04-21","retentionvalue":"18"},

{"signdate":"2022-04-02","retentiondate":"2022-04-22","retentionvalue":"15"},
{"signdate":"2022-04-02","retentiondate":"2022-04-23","retentionvalue":"13"},
{"signdate":"2022-04-02","retentiondate":"2022-04-24","retentionvalue":"12"},
{"signdate":"2022-04-02","retentiondate":"2022-04-25","retentionvalue":"11"},
{"signdate":"2022-04-02","retentiondate":"2022-04-26","retentionvalue":"10"},
{"signdate":"2022-04-02","retentiondate":"2022-04-27","retentionvalue":"9"},
{"signdate":"2022-04-02","retentiondate":"2022-04-28","retentionvalue":"8"},
{"signdate":"2022-04-02","retentiondate":"2022-04-29","retentionvalue":"7"},
{"signdate":"2022-04-02","retentiondate":"2022-04-30","retentionvalue":"6"},




{"signdate":"2022-04-03","retentiondate":"2022-04-04","retentionvalue":"98"},
{"signdate":"2022-04-03","retentiondate":"2022-04-05","retentionvalue":"97"},
{"signdate":"2022-04-03","retentiondate":"2022-04-06","retentionvalue":"96"},
{"signdate":"2022-04-03","retentiondate":"2022-04-07","retentionvalue":"94"},
{"signdate":"2022-04-03","retentiondate":"2022-04-08","retentionvalue":"93"},
{"signdate":"2022-04-03","retentiondate":"2022-04-09","retentionvalue":"88"},
{"signdate":"2022-04-03","retentiondate":"2022-04-10","retentionvalue":"79"},
{"signdate":"2022-04-03","retentiondate":"2022-04-11","retentionvalue":"76"},
{"signdate":"2022-04-03","retentiondate":"2022-04-12","retentionvalue":"72"},
{"signdate":"2022-04-03","retentiondate":"2022-04-13","retentionvalue":"70"},
{"signdate":"2022-04-03","retentiondate":"2022-04-14","retentionvalue":"65"},
{"signdate":"2022-04-03","retentiondate":"2022-04-15","retentionvalue":"60"},
{"signdate":"2022-04-03","retentiondate":"2022-04-16","retentionvalue":"55"},
{"signdate":"2022-04-03","retentiondate":"2022-04-17","retentionvalue":"52"},
{"signdate":"2022-04-03","retentiondate":"2022-04-18","retentionvalue":"50"},

{"signdate":"2022-04-03","retentiondate":"2022-04-18","retentionvalue":"50"},


{"signdate":"2022-04-04","retentiondate":"2022-04-05","retentionvalue":"90"},
{"signdate":"2022-04-04","retentiondate":"2022-04-06","retentionvalue":"88"},
{"signdate":"2022-04-04","retentiondate":"2022-04-07","retentionvalue":"86"},
{"signdate":"2022-04-04","retentiondate":"2022-04-08","retentionvalue":"82"},
{"signdate":"2022-04-04","retentiondate":"2022-04-09","retentionvalue":"78"},
{"signdate":"2022-04-04","retentiondate":"2022-04-10","retentionvalue":"66"},
{"signdate":"2022-04-04","retentiondate":"2022-04-11","retentionvalue":"55"},
{"signdate":"2022-04-04","retentiondate":"2022-04-12","retentionvalue":"50"},
{"signdate":"2022-04-04","retentiondate":"2022-04-13","retentionvalue":"35"},
{"signdate":"2022-04-04","retentiondate":"2022-04-14","retentionvalue":"29"},
{"signdate":"2022-04-04","retentiondate":"2022-04-15","retentionvalue":"21"},
{"signdate":"2022-04-04","retentiondate":"2022-04-16","retentionvalue":"19"},
{"signdate":"2022-04-04","retentiondate":"2022-04-17","retentionvalue":"17"},
{"signdate":"2022-04-04","retentiondate":"2022-04-18","retentionvalue":"8"},
{"signdate":"2022-04-04","retentiondate":"2022-04-19","retentionvalue":"1"},


{"signdate":"2022-04-05","retentiondate":"2022-04-06","retentionvalue":"92"},
{"signdate":"2022-04-05","retentiondate":"2022-04-07","retentionvalue":"90"},
{"signdate":"2022-04-05","retentiondate":"2022-04-08","retentionvalue":"88"},
{"signdate":"2022-04-05","retentiondate":"2022-04-09","retentionvalue":"87"},
{"signdate":"2022-04-05","retentiondate":"2022-04-10","retentionvalue":"86"},
{"signdate":"2022-04-05","retentiondate":"2022-04-11","retentionvalue":"80"},
{"signdate":"2022-04-05","retentiondate":"2022-04-12","retentionvalue":"77"},
{"signdate":"2022-04-05","retentiondate":"2022-04-13","retentionvalue":"65"},
{"signdate":"2022-04-05","retentiondate":"2022-04-14","retentionvalue":"35"},
{"signdate":"2022-04-05","retentiondate":"2022-04-15","retentionvalue":"32"},
{"signdate":"2022-04-05","retentiondate":"2022-04-16","retentionvalue":"30"},
{"signdate":"2022-04-05","retentiondate":"2022-04-17","retentionvalue":"24"},
{"signdate":"2022-04-05","retentiondate":"2022-04-18","retentionvalue":"21"},
{"signdate":"2022-04-05","retentiondate":"2022-04-19","retentionvalue":"11"},
{"signdate":"2022-04-05","retentiondate":"2022-04-20","retentionvalue":"10"},



{"signdate":"2022-04-06","retentiondate":"2022-04-07","retentionvalue":"90"},
{"signdate":"2022-04-06","retentiondate":"2022-04-08","retentionvalue":"88"},
{"signdate":"2022-04-06","retentiondate":"2022-04-09","retentionvalue":"87"},
{"signdate":"2022-04-06","retentiondate":"2022-04-10","retentionvalue":"86"},
{"signdate":"2022-04-06","retentiondate":"2022-04-11","retentionvalue":"80"},
{"signdate":"2022-04-06","retentiondate":"2022-04-12","retentionvalue":"77"},
{"signdate":"2022-04-06","retentiondate":"2022-04-13","retentionvalue":"65"},
{"signdate":"2022-04-06","retentiondate":"2022-04-14","retentionvalue":"35"},
{"signdate":"2022-04-06","retentiondate":"2022-04-15","retentionvalue":"32"},
{"signdate":"2022-04-06","retentiondate":"2022-04-16","retentionvalue":"30"},
{"signdate":"2022-04-06","retentiondate":"2022-04-17","retentionvalue":"24"},
{"signdate":"2022-04-06","retentiondate":"2022-04-18","retentionvalue":"21"},
{"signdate":"2022-04-06","retentiondate":"2022-04-19","retentionvalue":"11"},
{"signdate":"2022-04-06","retentiondate":"2022-04-20","retentionvalue":"10"},

{"signdate":"2022-04-05","retentiondate":"2022-04-06","retentionvalue":"92"},
{"signdate":"2022-04-05","retentiondate":"2022-04-07","retentionvalue":"90"},
{"signdate":"2022-04-05","retentiondate":"2022-04-08","retentionvalue":"88"},
{"signdate":"2022-04-05","retentiondate":"2022-04-09","retentionvalue":"87"},
{"signdate":"2022-04-05","retentiondate":"2022-04-10","retentionvalue":"86"},
{"signdate":"2022-04-05","retentiondate":"2022-04-11","retentionvalue":"80"},
{"signdate":"2022-04-05","retentiondate":"2022-04-12","retentionvalue":"77"},
{"signdate":"2022-04-05","retentiondate":"2022-04-13","retentionvalue":"65"},
{"signdate":"2022-04-05","retentiondate":"2022-04-14","retentionvalue":"35"},
{"signdate":"2022-04-05","retentiondate":"2022-04-15","retentionvalue":"32"},
{"signdate":"2022-04-05","retentiondate":"2022-04-16","retentionvalue":"30"},
{"signdate":"2022-04-05","retentiondate":"2022-04-17","retentionvalue":"24"},
{"signdate":"2022-04-05","retentiondate":"2022-04-18","retentionvalue":"21"},
{"signdate":"2022-04-05","retentiondate":"2022-04-19","retentionvalue":"11"},
{"signdate":"2022-04-05","retentiondate":"2022-04-20","retentionvalue":"10"}




];

        var data = JSON.parse(JSON.stringify(cohortdata));

        // set the dimensions and margins of the graph
        var margin5 = { top: 20, right: 20, bottom: 20, left: 70 },
            width5 = 600 - margin5.left - margin5.right,
            height5 = 300 - margin5.top - margin5.bottom;

        // append the svg object to the body of the page
        var svg6 = d3
            .select("#my_dataviz2")
            .append("svg")
            .attr("width", width5 + margin5.left + margin5.right)
            .attr("height", height5 + margin5.top + margin5.bottom)
            .attr("viewBox", "0 0 600 300")
            .attr("prserveAspectRatio", "none")

            .append("g")
            .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

        var signdates = data.map(function (d, i) {
            return d.signdate;
        });

        var preioddates = data.map(function (d, i) {
            //  return moment - new Date(d.retentiondate.toString()) ;
            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            data[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        // Build X scales and axis:
        var x5 = d3.scaleBand().range([0, width5]).domain(preioddates.sort(d3.ascending)).padding(0.05);
        // .padding(0.01);
        svg6
            .append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
            .call(function (g) { g.selectAll(".domain, .tick line").remove() })
            .call(function (g) { g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey") });

        // Build Y scales and axis:
        var y5 = d3.scaleBand().range([height5, 0]).domain(signdates.sort(d3.descending)).padding(0.05);
        // .padding(0.01);
        svg6.append("g")
            .call(d3.axisLeft(y5).tickSize(0))
            .call(function (g) { g.selectAll(".domain, .tick line").remove() })
            .call(function (g) { g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey") });

        // Build color scale
        var myColor = d3
            .scaleSequential()
            .domain([100, 50])
            .interpolator(d3.interpolate("blue", "white"));
        var myColorred = d3.scaleSequential()
            .domain([50, 0])
            .interpolator(d3.interpolate("white", "red"));

        var threshold = d3
            .scaleThreshold()
            .domain([0, , 10, , 13, 15, 20, 25, 30, 40, 45, 50, 55, 70, 75, 80, 85, 88, 90, 95, 100])
            .range(["#418af3", "#4b90f4", "#5998f5", "#68a3f7",
                "#78adf8", "#86b6f9", "#96bffb", "#a5c9fd",
                "#bcd8ff", "#fbd1d1", "#fbc7c8", "#fbbbbb",
                "#fbadac", "#fd9c9d", "#fd8e8e", "#fe7f7f",
                "#fe7172", "#ff6565", "#ff5d5c"].reverse());
        //#418af3 #4b90f4 #5998f5 #68a3f7 #78adf8 #86b6f9 #96bffb #a5c9fd #bcd8ff red #fbd1d1 #fbc7c8 #fbbbbb #fbadac
        //#fd9c9d #fd8e8e #fe7f7f #fe7172 #ff6565 #ff5d5c



        svg6
            .selectAll()
            .data(data, function (d, i) {
                return d;
            })
            .enter()
            .append("rect")
            .style("stroke", "grey")
            .style("stroke-opacity", "0.2")
            .attr("x", function (d, i) {
                d;
                return x5(d.preiod_num);
            })
            .attr("y", function (d, i) {
                return y5(d.signdate);
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", function (d) {
                return x5.bandwidth();
            })
            .attr("height", function (d) {
                return y5.bandwidth();
            })
            .style("fill", function (d) {
                if (d.retentionvalue >= 40) {
                    return myColor(d.retentionvalue);
                }
                else if (d.retentionvalue < 40 && d.retentionvalue > 30) {
                    return "white";
                }
                else {
                    return myColorred(d.retentionvalue);
                }

                return myColorred(d.retentionvalue);
            });

        svg6
            .append("g")

            .attr("font-family", "Noto Sans KR")
            .attr("font-weight", "Regular")
            .attr("font-size", "0.4rem")

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
                if (d.retentionvalue >= 30 && d.retentionvalue < 60) { textcolor = "grey"; }
                else {
                    textcolor = "white";
                }
                return textcolor;

            });
 
});
