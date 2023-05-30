const express = require('express');
const multer = require('multer');
const UploadController = require('../CONTROLLERS/Uploadcontroller');
const upload = require("../middleware/upload");


const router = express.Router();

router.post("/create",upload.single('file'),UploadController.Uploadc);
 router.get("/read",UploadController.getcsv)
 router.delete('/:id',UploadController.Deleatefilerow  )
 router.put('/update/:id',UploadController.changefilerow )
 router.get('/export',UploadController.exportcsv)
router.delete('/',UploadController.deleatecsv)
module.exports = router;


