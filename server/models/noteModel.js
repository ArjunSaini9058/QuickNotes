import mongoose from "mongoose";
const noteSchema=mongoose.Schema({ 
    title : {
        type : String,
        required: true
    },
    description : {
        type: String,
        required: true
    }, 
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
const noteModel = mongoose.model("note", noteSchema)

export default noteModel