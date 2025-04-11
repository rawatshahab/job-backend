const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://mayank2402:Qwe%401234@collegeproject.hu9lxtu.mongodb.net/?retryWrites=true&w=majority&appName=CollegeProject");
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
const jobSchema = mongoose.Schema({
    company:String,
    role:String,
    status:String,
    date:String,
    link:String,
})
const Job = mongoose.model("Job", jobSchema);
    
app.post("/api/addjob",async(req,res)=>{
    const {company, role, status,link,date} = req.body;
    try{
        const job = new Job({company, role, status,date, link});
        await job.save();
        res.status(200).json({message:"Job added successfully"});
    }
    catch{
        res.status(500).json({message:"Error adding job"});
    }
})
app.get("/api/getjobs",async(req,res)=>{
    try{
        const jobs = await Job.find();
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
        await Job.findByIdAndDelete(id);
        res.status(200).json({message:"Job deleted successfully"});
    }
    catch{
        res.status(500).json({message:"Error deleting job"});
    }
}
)
app.put("/api/updatejob/:id",async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    try{
        await Job.findByIdAndUpdate(id,{status});
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