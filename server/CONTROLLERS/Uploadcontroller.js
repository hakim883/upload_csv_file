const File= require("../models/Filemodel");

const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const Uploadc = async (req, res) => {

  console.log(req.file);
  const totalRecords = [];
try{
console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
  fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
    .pipe(fastcsv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => totalRecords.push(row))
    .on('end', async rowCount => {
      try{
        const files= await File.insertMany(totalRecords);
        
        res.json(files);
      }catch(err){
        res.status(400).json(err);
      }
    });

  }catch(error){
    res.status(400).json(error)
  }
};




const getcsv = async(req,res)=>{
  try {
      const data = await File.find({})

      res.json(data)
  } catch (error) {
      res.status(501).json({message:error})

  }
}
const deleatecsv = async(req,res)=>{
  try {
      const data = await File.deleteMany({},)
      
      res.json(data)
  } catch (error) {
      res.status(501).json({message:error})

  }
}


const  changefilerow=async(req,res)=>{
  try {
      //1 find() //2 Edit() // 3 save()
      //findByIdAndUpdte 
      const updatedfile = await File.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.json({msg:'line has been updated successfully!',updatedfile})

  } catch (error) {
      console.log(error);
  }
}

const  Deleatefilerow=async(req,res)=>{
  try {
      
      const deletedfile = await File.findByIdAndDelete(req.params.id)
      res.json({msg:'line has been deleted successfully!',deletedfile})
  } catch (error) {
      console.log(error)
  }
}




const exportcsv=async(req,res)=>{

  try {
    
    const exporteddata = await File.find({}).lean();
    
    const csvStream = fastcsv.format({ headers: true });
    res.setHeader('Content-Disposition', 'attachment; filename="file.csv"');
    res.set('Content-Type', 'text/csv');

    csvStream.pipe(res);

    exporteddata.forEach((item) => {
      csvStream.write(item);
    });

    csvStream.end();
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).send('Error exporting data');
  }
 
}

  module.exports = {Uploadc,getcsv,Deleatefilerow,changefilerow,exportcsv,deleatecsv}


