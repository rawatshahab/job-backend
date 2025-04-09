const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://mayank2402:Qwe%401234@collegeproject.hu9lxtu.mongodb.net/?retryWrites=true&w=majority&appName=CollegeProject");

const Jobschema = mongoose.Schema({
    company:String,
    role:String,
    status:String,
    link:String,
    date:String,
})
    
app.post("/api/addjob",async(req,res)=>{
    const {company, role, status,link,date} = req.body;
    try{
        const job = new Jobschema({company, role, status, link, date});
        await job.save();
        res.status(200).json({message:"Job added successfully"});
    }
    catch{
        res.status(500).json({message:"Error adding job"});
    }
})
app.get("/api/getjobs",async(req,res)=>{
    try{
        const jobs = await Jobschema.find();
        res.status(200).json(jobs);
    }
    catch{
        res.status(500).json({message:"Error fetching jobs"});
    }
}
)
app.delete("/api/deletejob/:id",async(req,res)=>{
    const {id} = req.params;
    try{
        await Jobschema.findByIdAndDelete(id);
        res.status(200).json({message:"Job deleted successfully"});
    }
    catch{
        res.status(500).json({message:"Error deleting job"});
    }
}
)
app.put("/api/updatejob/:id",async(req,res)=>{
    const {id} = req.params;
    const {company, role, status, link, date} = req.body;
    try{
        await Jobschema.findByIdAndUpdate(id,{company, role, status, link, date});
        res.status(200).json({message:"Job updated successfully"});
    }
    catch{
        res.status(500).json({message:"Error updating job"});
    }
}
)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})