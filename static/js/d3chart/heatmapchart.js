
window.addEventListener("load", function () {



    // Read the data
    d3.json("/resource/tableConvert.json", function (err,data) {

        if(err) {
            console.error("error in heatmap json load");
            return;
        }
        console.log(data);

        var local = d3.local();

        // set the dimensions and margins of the graph
        var margin5 = { top: 20, right: 20, bottom: 20, left: 20 },
            width5 = 400 - margin5.left - margin5.right,
            height5 = 400 - margin5.top - margin5.bottom;
    
        // append the svg object to the body of the page
        var svg6 = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width5 + margin5.left + margin5.right)
            .attr("height", height5 + margin5.top + margin5.bottom)
            .attr("viewBox","0 0 800 800")
            .attr("preserveAspectRatio","none")
            .append("g")
            .attr("transform",
                "translate(" + margin5.left + "," + margin5.top + ")");
    
        // Labels of row and columns
        var myGroups = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11","12","13","14","15"];
        var heatmapKeys = Object.keys(data); 
        var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"];
    
        // Build X scales and axis:
        var x5 = d3.scaleBand()
            .range([0,width5])
            .domain(myGroups)
            .padding(0.01);
        svg6.append("g")
            .attr("transform", "translate(0," +0 + ")")
            .call(d3.axisTop(x5))
    
        // Build Y scales and axis:
        var y5 = d3.scaleBand()
            .range([height5, 0])
            .domain(myVars)
            .padding(0.01);
        svg6.append("g")
            .call(d3.axisLeft(y5));
    
        // Build color scale
        var myColor = d3.scaleLinear()
            .range(["blue", "red"])
            .domain([1, 100])



        svg6.selectAll()
            .data(data, function (d, i) { return d; })
            .enter()
            .append("rect")
            .attr("x",function ( d, i) 
            { 
                console.log(d[i]);
                console.log(x5(parseInt(d[i])));
                return x5(i);
            })
            .attr("y", function ( d, i) 
            { 
                return 30;
            })
            .attr("width", 30)
            .attr("height", 30)
            .style("fill", "red");

            svg6.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d){
                return "ㅇㅇ";
            })
            .attr("x", function(d, i, j) {
                // return (i * 20) + 40;
                return x5(d.group);
            })
            .attr("y", function(d) {
                return y5(d.variable);
                //return (local.get(this) * 20) + 40;
            })
            .attr("dx", x5.bandwidth()/2)
            .attr("dy", y5.bandwidth()/2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("fill","green")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")


    });



});

