import { TimeTable } from "../models/timeTable.model.js";

export const addTimeTable=async(req,res)=>{
    const timeTable=req.body;
    const newTimeTable=new TimeTable(timeTable);
    try {
        await newTimeTable.save();
        res.status(201).json({ message: "Time Table Added Successfully" });
        } catch (error) { 
            res.status(500).json({ message: "Failed to add Time Table" });
            }
}

export const getTimeTable = async (req, res) => {
  const { department, section, day } = req.query;
  console.log(req.query);
  try {
    const timeTable = await TimeTable.findOne({ department, section, day });

    if (!timeTable) {
      return res.status(404).json({ message: "Time table not found for the given parameters." });
    }

    res.status(200).json(timeTable);
  } catch (error) {
    res.status(500).json({ message: "Error fetching time table." });
  }
};
