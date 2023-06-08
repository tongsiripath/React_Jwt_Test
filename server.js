import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";


const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://tongsiripath.mypressonline.com"]
}));
app.use(cookieParser());

app.post("/login", (req,res) => {
    const token = jwt.sign(1,"Tongsiripath");
    //res.json({token});
    res.cookie('token', token);
    //console.log("Success for Login..");
    return res.json({Status: "Success for Login.."});
});

app.listen(8085, () => {
    console.log("เชื่อมต่อ API กำลังรันที่พอร์ท 8085..");
});

