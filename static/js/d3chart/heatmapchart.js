
window.addEventListener("load", function () {

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
    var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

    // Build X scales and axis:
    var x5 = d3.scaleBand()
        .range([0, width5])
        .domain(myGroups)
        .padding(0.01);
    svg6.append("g")
        .attr("transform", "translate(0," +0 + ")")
        .call(d3.axisTop(x5))

    // Build X scales and axis:
    var y5 = d3.scaleBand()
        .range([height5, 0])
        .domain(myVars)
        .padding(0.01);
    svg6.append("g")
        .call(d3.axisLeft(y5));

    // Build color scale
    var myColor = d3.scaleLinear()
        .range(["white", "#69b3a2"])
        .domain([1, 100])
       

        var jquerycallback = function(data) {

            svg6.selectAll()
            .data(data, function (d) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x5(d.group) })
            .attr("y", function (d) { return y5(d.variable) })
            .attr("width", x5.bandwidth())
            .attr("height", y5.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })


        };
        // $.ajax({
        //     url: 'http://127.0.0.1:5500/resource/heatmap_data.csv',
        //     contentType:"text/csv; charset=utf-8",
        //     success: function(dt) {

        //         console.log(dt);
        //     svg6.selectAll()
        //         .data(dt, function (dt) { return dt.group + ':' + dt.variable; })
        //         .enter()
        //         .append("rect")
        //         .attr("x", function (dt) { return x5(dt.group) })
        //         .attr("y", function (dt) { return y5(dt.variable) })
        //         .attr("width", x5.bandwidth())
        //         .attr("height", y5.bandwidth())
        //         .style("fill", function (dt) { return myColor(dt.value) })
        //     },
        //     error: function(d){
        //         alert('error');
        //     }
        //  });

    // Read the data
    d3.csv("/resource/heatmap_data.csv", function (data) {

        svg6.selectAll()
            .data(data, function (d) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x5(d.group) })
            .attr("y", function (d) { return y5(d.variable) })
            .attr("width", x5.bandwidth())
            .attr("height", y5.bandwidth())
            .style("fill", function (d) { return myColor(d.value) });

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
                return d.value.toString();
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
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")


    });



});

