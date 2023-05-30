const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {

  Index: {
    type: String,
  
  },
  Name: {
    type: String,
    required: true
  },

  last_name: {
  type: String,

},

email: {
  type: String,

},
gender: {
  type: String,

},


ip_address: {
  type: String,

},
}


);
        





module.exports =File= mongoose.model("File", FileSchema);

