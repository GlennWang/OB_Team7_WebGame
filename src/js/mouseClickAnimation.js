document.addEventListener("click", function (event) {
    const ripple = d3.select("body")
      .append("div")
      .classed("ripple", true);
    const rippleDiameter = 20;
    
    ripple.style("width", rippleDiameter + "px") // 這裡可以根據需求調整寬高
      .style("height", rippleDiameter + "px")
      .style("left", event.clientX - rippleDiameter / 2 + "px")
      .style("top", event.clientY - rippleDiameter / 2 + "px")
      .transition()
      .duration(500)
      .style("transform", "scale(4)")
      .style("opacity", 0)
      .remove();
});