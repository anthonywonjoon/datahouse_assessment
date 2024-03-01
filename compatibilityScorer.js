// Import input from input.json
let input = require("./input.json");

/** Function: Creates a score for a group of applicants based on a prioritized attribute
 *  Param - input: JSON of current team and applicants
 *  Param - priority (optional): An attribute to prioritize in compatibility. If undefined, the most lacking attribute will be used
 *  Returns a JSON of the scored applicants
**/
function focusedScoreGenerator(input, priority) {
    let applicants = input.applicants;
    let output = { "scoredApplicants": [] };

    // If no priority parameter passed, find the most lacking attribute (findLackingAttribute function)
    if (!priority) { priority = findLackingAttribute(input); }

    // Loop through all the applicants
    applicants.forEach(applicant => {
        let { name, attributes } = applicant;

        // Get the score based off of the most needed attribute
        let score = attributes[priority] / 10;

        // Push the scored applicant to output
        output.scoredApplicants.push({ name, score });
    })

    return output;
}

/** Function: Creates a score for a group of applicants based on an average of all their attributes
 *  Param - input: JSON of current team and applicants
 *  Returns a JSON of the scored applicants
**/
function generalScoreGenerator(input) {
    let applicants = input.applicants;
    let output = { "scoredApplicants": [] };
    let length = Object.keys(applicants[0].attributes).length;

    // Loop through all applicants
    applicants.forEach(applicant => {
        let { name, attributes} = applicant;

        // Keep track of total attribute points
        let totalPoints = 0;

        // Loop through all the attributes
        for (let attribute in attributes) {
            // Get the total of all the attributes combined
            totalPoints += (attributes[attribute]) / 10;
        }

        // Find the average amount of points for the score
        let score = totalPoints / length;
        score = parseFloat(score.toFixed(1));

        // Push the scored applicant to output
        output.scoredApplicants.push({ name, score });
    })

    return output;
}

/** Function: Finds the most lacking (lowest) attribute within the current team
 *  Param - input: JSON of current team and applicants
 *  Returns a string of the attribute with the lowest average amount
**/
function findLackingAttribute(input) {
    let team = input.team;

    // Create a map that contains key-value pairs of all the attributes
    let attributes = team[0].attributes;
    let attributeMap = {};
    for (let key in attributes) {
        attributeMap[key] = 0;
    }

    // Loop through the list of the team
    team.forEach(team => {
        // Add up the score for each attribute into the map
        let { attributes } = team;
        for (let attribute in attributes) {
            attributeMap[attribute] += attributes[attribute];
        }
    })

    // Loop through our map and change the raw totals into averages
    for (let attribute in attributeMap) {
        attributeMap[attribute] = attributeMap[attribute] / team.length;
    }

    // Convert the map into an array in order to use sort library
    let attributeArray = Object.entries(attributeMap);

    // Sort the array in order to easily access the lowest value
    attributeArray.sort((a, b) => a[1] - b[1]);

    return attributeArray[0][0];
}

console.log("General Score Generator Output: ");
console.log(generalScoreGenerator(input));
console.log("\nfocusedScoreGenerator w/ undefined priority parameter Output: ");
console.log(focusedScoreGenerator(input));
console.log("\nfocusedScoreGenerator w/ intelligence priority Output: ");
console.log(focusedScoreGenerator(input, "intelligence"));