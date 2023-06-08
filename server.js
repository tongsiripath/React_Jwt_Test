import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
//import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { con } from "./db.js";


const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://tongsiripath.mypressonline.com"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const cookies = new Cookies();

app.post("/login", (req,res) => {
    //const token = jwt.sign(1,"Tongsiripath");
    //res.json({token});
    //res.cookie('token', token); //ถ้าอัพขึ้น Hosting จริงจะไม่ทำงาน
    //console.log("Success for Login..");

    const sql = "SELECT * FROM tbl_users Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {      
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.json({token});
            return res.json({Status: "Success for Login.."})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
});

app.listen(8085, () => {
    console.log("เชื่อมต่อ API กำลังรันที่พอร์ท 8085..");
});

