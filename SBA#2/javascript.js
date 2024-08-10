// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  const Agent = {
    assignments: AssignmentGroup.assignments,
    course_id: AssignmentGroup.course_id
  };
  try {
    if (Agent.course_id !== CourseInfo.id) {
      throw new Error("Invalid course id in AssignmentGroup");
    }
    let learnerData = {};
    LearnerSubmissions.forEach(submission => {
      const learnerId = submission.learner_id;
          console.log("learnerdata", learnerData)
      const assignmentId = submission.assignment_id;
      const assignment = Agent.assignments.find(assignment => assignment.id === assignmentId);
      if (!assignment) {
        console.warn(`Assignment with ID ${assignmentId} not found. Skipping submission.`);
        return; 
      }
      if (submission.submission) {
        const score = submission.submission.score;
        const submissionDate = new Date(submission.submission.submitted_at);
        const dueAt = new Date(assignment.due_at);
        const pointsPossible = assignment.points_possible;
        let finalscore = score;
        if (submissionDate > dueAt) {
          finalscore -= pointsPossible * 0.1 * (AssignmentGroup.group_weight / 100); 
          finalscore = Math.max(finalscore, 0);
        }
        if (!learnerData[learnerId]) {
          learnerData[learnerId] = {
            id: learnerId,
            avg: 0,
            totalPoints: 0,
            totalPossiblePoints: 0,
            assignments: {}
          };
        }
        learnerData[learnerId].totalPoints += finalscore;
        learnerData[learnerId].totalPossiblePoints += pointsPossible;
        learnerData[learnerId].assignments[assignmentId] = {
          score: finalscore,
          pointsPossible: pointsPossible
        };
      }
    });
    Object.keys(learnerData).forEach(learnerId => {
      const learner = learnerData[learnerId];
      if (learner.totalPossiblePoints > 0) {
        learner.avg = (learner.totalPoints / learner.totalPossiblePoints) * 100;
      } else {
        learner.avg = 0; 
      }
      delete learner.totalPoints;
      delete learner.totalPossiblePoints;
    });
    return Object.values(learnerData);
  } catch (error) {
    console.error("An error has occurred: " + error.message);
    return [];
  }
  function renderResultToHTML(result) {
    const container = document.getElementById("result");
    container.innerHTML = "";
    result.forEach(learner => {
      const learnerDiv = document.createElement("div");
      learnerDiv.className = "learner";
      let assignmentsHTML = "";
      Object.keys(learner.assignments).forEach(assignmentId => {
        const assignment = learner.assignments[assignmentId];
        assignmentsHTML += `<p>Assignment ${assignmentId}: ${assignment.score}/${assignment.pointsPossible}</p>`;
      });
      learnerDiv.innerHTML = `
        <h2>${learner.id}</h2>
        <p>Average Score: ${learner.avg.toFixed(2)}</p>
        ${assignmentsHTML}
      `;
      container.appendChild(learnerDiv);
    });
  }
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);