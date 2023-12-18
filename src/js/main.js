var current;
var story;

main();

function main() {
    d3.csv("src/csv/story.csv").then(readResult => {
        story = readResult;
        current = story[0];
        playSequentially();
    });
}

function playSequentially() {
    const NULL = "";
    const descriptionText = d3.select("#description");
    if (current == null) {
        descriptionText.text("Unknown state, contact admin to fix the bug");
        return;
    }
    descriptionText.text(current.description);
    d3.select("#option1")
        .style("display", (current.option1 != NULL) ? "inline-block" : "none")
        .text(current.option1);
    d3.select("#option2")
        .style("display", (current.option2 != NULL) ? "inline-block" : "none")
        .text(current.option2);
    if (current.default_next != NULL) {
        current = story.find(line => line.code === current.default_next);
    }
    console.log(current);
}

function descriptionClicked() {
    playSequentially();
}

function optionClicked(option) {
    console.log(story.find(line => line.code == current[`option${option}_next`]));
    current = story.find(line => line.code == current[`option${option}_next`]);
    playSequentially();
}