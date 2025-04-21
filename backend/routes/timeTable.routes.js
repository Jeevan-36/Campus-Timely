import { Router } from "express";
import {addTimeTable,getTimeTable} from '../controllers/timeTable.contoller.js'
const router=new Router();
router.get('/get-timetable',getTimeTable);
router.post('/add-timetable',addTimeTable);
export default router;