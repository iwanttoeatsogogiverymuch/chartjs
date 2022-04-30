window.addEventListener("load", function () {
   var margin = { top:20 , bottom:20, left:20, right:20}
   var tablewidth = 400 + margin.left + margin.right;
    var tableheight = 400 + margin.top + margin.bottom;
    
  var tablesvg = d3
    .select("#tablechart")
    .append("g")
    .selectAll("rect")
    .data(data)
    .join()
    .append("rect");
});
