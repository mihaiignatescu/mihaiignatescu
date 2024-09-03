function resizeContentForMobile() {
    // Get the width of the window
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Define breakpoints for mobile devices
    const isMobile = screenWidth <= 768; // Typical breakpoint for mobile devices

    // Adjust the width and height based on the device
    const newWidth = isMobile ? screenWidth - 40 : 800; // 40px padding
    const newHeight = isMobile ? screenHeight * 0.6 : 500;

    // Update SVG dimensions or any other content element
    d3.select("svg")
        .attr("width", newWidth)
        .attr("height", newHeight);

    // Adjust the content within the container (like scales or other SVG elements)
    // For example, updating scales (if you are using D3.js)
    x.range([0, newWidth]);
    y.range([newHeight, 0]);

    // Update any elements that depend on these scales
    d3.selectAll("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y));

    // Update axes if applicable
    d3.select(".x.axis")
        .attr("transform", `translate(0,${newHeight})`)
        .call(d3.axisBottom(x));

    d3.select(".y.axis")
        .call(d3.axisLeft(y));

    // Adjust the clip path dimensions if necessary
    d3.select("#clip rect")
        .attr("width", newWidth)
        .attr("height", newHeight);
}

// Call the function on page load and on window resize
window.addEventListener("resize", resizeContentForMobile);
resizeContentForMobile();
