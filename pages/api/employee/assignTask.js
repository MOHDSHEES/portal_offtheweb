import dbConnect from "@/lib/mongoose";
import employeeModel from "@/models/employeeModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();
    const emp = await employeeModel.findOne({
      email: req.body.email,
    });

    let date = new Date().toJSON().slice(0, 10);

    const dat = new Date(date);
    const currentDayOfWeek = dat.getDay();
    const daysSincePreviousSunday =
      currentDayOfWeek === 0 ? 0 : currentDayOfWeek;
    const previousSunday = new Date(dat);
    previousSunday.setDate(dat.getDate() - daysSincePreviousSunday);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(previousSunday);
      currentDate.setDate(previousSunday.getDate() + i);
      weekDates.push(currentDate.toISOString().slice(0, 10));
    }

    let resu;
    if (emp) {
      if (
        !weekDates.includes(
          emp.tasks && emp.tasks[0] && emp.tasks[0].assignDate
        )
      ) {
        resu = await employeeModel.findOneAndUpdate(
          {
            email: req.body.email,
          },
          {
            $push: {
              tasks: {
                $each: [
                  {
                    task: req.body.task,
                    assignDate: date,
                    taskNo: req.body.taskNo,
                    status: 0,
                  },
                ],
                $position: 0,
              },
            },

            "score.preWeek": emp.score.weekly && emp.score.weekly,
            "score.weekly": 10,
            // "score.overall": resu.score.overall
            //   ? resu.score.overall + score
            //   : score,
          },
          {
            new: true,
          }
        );
      } else {
        resu = await employeeModel.findOneAndUpdate(
          {
            email: req.body.email,
          },
          {
            $push: {
              tasks: {
                $each: [
                  {
                    task: req.body.task,
                    assignDate: date,
                    taskNo: req.body.taskNo,
                    status: 0,
                  },
                ],
                $position: 0,
              },
            },
          },
          {
            new: true,
          }
        );
        // console.log(resu);
      }
      // console.log(resu);
      if (resu)
        res.json({
          status: 200,
          msg: "Task assigned successfully",
          data: resu,
        });
      else
        res.json({ status: 500, msg: "Something went wrong, Try again later" });
    } else {
      res.json({ status: 500, msg: "Something went wrong, Try again later" });
    }
    // console.log(user);
    // let trending = resu.map((a) => a.title);
    // console.log(resu);
  } catch (error) {
    // console.log(error);
    res.json({ status: 500, msg: error });
  }
}
