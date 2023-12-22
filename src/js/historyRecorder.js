const content = d3.select("#popup-content");
const overlay = d3.select("#overlay");
const historyDiv = d3.select("#popup");

const history = {
    init: function() {
        content.selectAll("div").remove();
        overlay.on('click', function(event) {
            event.stopPropagation();
            historyDiv.style("display", 'none');
            overlay.style("display", 'none');
        });
    },
    scrollToLatest: function() {
        content.node().scrollTop = content.node().scrollHeight;
    },
    show: function() {
        overlay.style("display", 'block');
        historyDiv.style("display", 'block');
        this.scrollToLatest();
    },
    add: function(sceneCode, sceneDescription) {
        this.removeViolation(sceneCode);
        var historyScene = content.append("div").attr("id", "scene" + sceneCode);
        
        historyScene.append("p")
            .classed("history-message", true)
            .text(sceneDescription);
    },
    selectedOption: function(scene, option) {
        var optionDiv = content.select("#scene" + scene.code)
            .append("div")
            .classed("history-options", true);

        optionDiv.append("p")
            .classed("history-message", true)
            .classed("option1", true)
            .text(scene.option1);

        optionDiv.append("p")
            .classed("history-message", true)
            .classed("option2", true)
            .text(scene.option2);

        optionDiv.select(".option" + option)
            .style("background-color", "#3498db")
            .style("color", "white");
    },
    badEnding: function(sceneCode) {
        content.select("#scene" + sceneCode)
            .select(".history-message")
            .style("background-color", "#ef4343")
            .style("color", "white");
    },
    removeViolation: function(sceneCode) {    
        var violateScene = content.select("#scene" + sceneCode);

        // 如果找到重複的劇情 刪除它以及在它之後的歷史劇情
        if (!violateScene.empty()) {
            const siblings = violateScene.node().parentNode.children;
            const targetIndex = Array.from(siblings).indexOf(violateScene.node());

            d3.selectAll(siblings)
                .filter((d, i) => i >= targetIndex)
                .remove();
        }
    }
}
