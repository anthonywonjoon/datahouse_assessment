# Datahouse Assessment
---

## Specifications
- Input and Output must be in JSON
- Compatibility score for each applicant should fall in a range from [0, 1]
- Use any programming language you wish to develop in

---

## Instructions
The input JSON is stored in the input.json file and imported into the compatibilityScorer.js files for use. Modify the input.json file for different inputs.

To execute, run


---

## Thought Process


During this project, I was initially stuck on how to create my compatibility scorer as the prompt was very open ended. In the beginning stages, I had to ask myself a couple questions:

- What does compatibility mean for an applicant joining a team?
- Do certain attributes matter more than others?
- Does the team want a more well-rounded individual or a specialized one?

Based on these questions, I was able to map out how I wanted to approach this project.


```
node ./compatibilityScorer.js
```


---

## Functions


### generalScoreGenerator(input)

The first function I made was the generalScoreGenerator, which will get all the points accumulated in the attributes section for an individual applicant, and find the average based on the amount of attributes. This would allow the team to see the compatibility score as a metric of overall value - how many "attribute points" is this applicant worth?

It takes in one parameter, the JSON of the teams and applicants.

This returns a JSON of the scored applicants.

### focusedScoreGenerator(input) & focusedScoreGenerator(input, priority)

focusedScoreGenerator will base the compatibility score solely off of one attribute. This will allow the team to focus on one area that the team believes it needs to cover.

There are two uses of the focusedScoreGenerator function: With only an input parameter passed, or with a priority as well.

When no priority parameter is passed, the function will use the lowest average attribute in the current team as the priority. This is found using the findLackingAttribute function

When one is passed, we will use that specific attribute as our main focus, regardless of team presence.

This returns a JSON of the scored applicants.

### findLackingAttribute(input)

This function is for use in the focusedScoreGenerator function, where if a priority is not passed, we will go through the list of team members, find the average of each attribute as a team, and find the lowest score.

This returns a string of the lowest scored attribute.

---

## Sample JSON Input

```json
{
    "team": [
        {
            "name": "Eddie",
            "attributes" : {
                "intelligence": 1,
                "strength": 5,
                "endurance": 3,
                "spicyFoodTolerance": 1
            }
        },
        {
            "name": "Will",
            "attributes" : {
                "intelligence": 9,
                "strength": 4,
                "endurance": 1,
                "spicyFoodTolerance": 6
            }
        },
        {
            "name": "Mike",
            "attributes" : {
                "intelligence": 3,
                "strength": 2,
                "endurance": 9,
                "spicyFoodTolerance": 5
            }
        }
    ],
    "applicants": [
        {
            "name": "John",
            "attributes" : {
                "intelligence": 4,
                "strength": 5,
                "endurance": 2,
                "spicyFoodTolerance": 1
            }
        },
        {
            "name": "Jane",
            "attributes" : {
                "intelligence": 7,
                "strength": 4,
                "endurance": 3,
                "spicyFoodTolerance": 2
            }
        },
        {
            "name": "Joe",
            "attributes" : {
                "intelligence": 1,
                "strength": 1,
                "endurance": 1,
                "spicyFoodTolerance": 10
            }
        },
    ]
}
```
---
## Sample JSON Output

```json
{
  scoredApplicants: [
    { name: 'John', score: 0.4 },
    { name: 'Jane', score: 0.7 },
    { name: 'Joe', score: 0.1 }
  ]
}
```

 
