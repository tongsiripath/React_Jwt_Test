import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(8085, () => {
    console.log("เชื่อมต่อ API กำลังรันที่พอร์ท 8085..");
});

