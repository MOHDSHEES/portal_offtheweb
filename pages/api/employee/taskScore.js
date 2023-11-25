import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const score = req.body.score;
    const taskNo = req.body.taskNo;
    // console.log(req.body.status);
    // console.log(req.body.taskNo);
    // console.log(res.locals.data._id);
    // let date = new Date().toJSON().slice(0, 10);
    // console.log(date);
    const resu = await employeeModel.findOneAndUpdate(
      {
        email: req.body.email,
        "tasks.taskNo": taskNo,
      },
      {
        // "score.overall": score,
        $set: {
          "tasks.$.score": score,
        },
      },
      {
        new: true,
      }
    );

    const date = new Date(resu.tasks[0].assignDate);
    const currentDayOfWeek = date.getDay();
    const daysSincePreviousSunday =
      currentDayOfWeek === 0 ? 0 : currentDayOfWeek;
    const previousSunday = new Date(date);
    previousSunday.setDate(date.getDate() - daysSincePreviousSunday);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(previousSunday);
      currentDate.setDate(previousSunday.getDate() + i);
      weekDates.push(currentDate.toISOString().slice(0, 10));
    }
    // console.log(new Date().getDate() - date.getDate());
    let week = 0;
    let noTasks = 0;
    if (weekDates.includes(req.body.date)) {
      resu.tasks.map((task) => {
        if (weekDates.includes(task.assignDate)) {
          if (task.score) {
            noTasks = noTasks + 1;
            week = week + task.score;
          } else week = week;
        }
      });
      const r = await employeeModel.findOneAndUpdate(
        {
          email: req.body.email,
          // "tasks.taskNo": taskNo,
        },
        {
          "score.weekly": (week / noTasks).toFixed(1),
          // "score.overall": resu.score.overall
          //   ? resu.score.overall + score
          //   : score,
        }
      );
    }
    if (resu)
      res.json({
        status: 200,
        data: resu,
        msg: "Successfully updated",
      });
    else
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, msg: error });
  }
}
