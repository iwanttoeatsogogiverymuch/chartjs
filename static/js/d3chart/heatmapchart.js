
window.addEventListener("load", function () {



    // Read the data
    d3.json("/resource/retention.json", function (err,data) {

        if(err) {
            console.error("error in heatmap json load");
            return;
        }
        console.log(data);

        var local = d3.local();

        // set the dimensions and margins of the graph
        var margin5 = { top: 20, right: 20, bottom: 20, left: 20 },
            width5 = 800 - margin5.left - margin5.right,
            height5 = 800 - margin5.top - margin5.bottom;
    
        // append the svg object to the body of the page
        var svg6 = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width5 + margin5.left + margin5.right)
            .attr("height", height5 + margin5.top + margin5.bottom)
            .attr("viewBox","0 0 800 800")
       
            .append("g")
            .attr("transform",
                "translate(" + margin5.left + "," + margin5.top + ")");
    
        // Labels of row and columns
        var datesettings = moment().format('YYYY-MM-DD');

     //   const cohortDates = Array.from(new d3.InternSet(retentionCohorts.map(d => d.cohort_date))).sort(d3.ascending);
      //  const periodNumbers = Array.from(new Set(retentionCohorts.map(d => d.period_number))).sort(d3.ascending);

      var signdates = data.map(function(d,i) {

        return d.signdate;

      });

      var retentiondates = data.map(function (d,i) {
          return d.retentiondate ;
      });
    
        // Build X scales and axis:
        var x5 = d3.scaleBand()
            .range([0,width5])
            .domain(retentiondates)
            .padding(0.01);
        svg6.append("g")
            .attr("transform", "translate(0," +0 + ")")
            .call(d3.axisTop(x5))
    
        // Build Y scales and axis:
        var y5 = d3.scaleBand()
            .range([height5, 0])
            .domain(signdates)
            .padding(0.01);
        svg6.append("g")
            .call(d3.axisLeft(y5));
    
        // Build color scale
        var myColor = d3.scaleLinear()
            .range(["blue", "white", "red"])
            .domain([1, 100])



        svg6.selectAll()
            .data(data, function (d, i) { return d; })
            .enter()
            .append("rect")
            .attr("x",function ( d, i) 
            { 
    d
                return x5(d.retentiondate);
            })
            .attr("y", function ( d, i) 
            { 
                return y5(d.signdate);
            })
            .attr("width", function (d){
                return x5.bandwidth()
            })
            .attr("height", function (d){
                return y5.bandwidth()
            })
            .style("fill", function (d){
                return myColor(d.retentionvalue);
            });

            svg6.append("g")
            .attr("transform", "translate(0," +0 + ")")
            .selectAll("g")
            .attr("font-family", "Noto Sans KR")
            .data(data)
            .enter()
            .append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d){
                return d.retentionvalue + "%";
            })
            .attr("x", function(d) {
                // return (i * 20) + 40;

                return x5(d.retentiondate);
            })
            .attr("y", function(d) {
                return y5(d.signdate);
                //return (local.get(this) * 20) + 40;
            })
            .attr("dx", x5.bandwidth()/2)
            .attr("dy", y5.bandwidth()/2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("fill","white")
            .attr("font-weight","Light")
            .attr("font-size", "2rem")


    });



});

