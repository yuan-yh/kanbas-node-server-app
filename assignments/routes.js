import Database from "../Database/index.js";

function AssignmentRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    // console.log(req)
    const { cid } = req.params;
    const assignments = Database.assignments.filter((assignment) => assignment.course === cid);
    res.json(assignments);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = Database.assignments.find((assignment) => assignment._id === aid);
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.json(assignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const index = Database.assignments.findIndex((assignment) => assignment._id === aid);
    if (index === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    Database.assignments.splice(index, 1);
    res.json(200);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      course: req.params.cid,
      _id: new Date().getTime().toString(),
    };
    // console.log(newAssignment)
    Database.assignments.unshift(newAssignment);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const index = Database.assignments.findIndex((assignment) => assignment._id === aid);
    if (index === -1) {
      res.status(404).send("Module not found");
      return;
    }
    Database.assignments[index] = {
      ...Database.assignments[index],
      ...req.body,
    };
    res.json(200);
  });
}
export default AssignmentRoutes;
