import noteModel from "../models/noteModel.js";
 export const createNote = async (req, res) =>{
    
    const {title, description} = req.body;

    const newNote = new noteModel({
        title: title,
        description : description,
        userId : req.userId
    });

    try {
        
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
    
}

export const updateNote = async (req, res) =>{
    const id = req.params.id;
    const {title, description} = req.body;

    const newNote = {
        title : title,
        description: description,
        userId : req.userId
    }

    try {
        await noteModel.updateOne({_id:id}, newNote);
        res.status(200).json(newNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

 export const deleteNote = async (req, res) =>{

    const id = req.params.id;
    try {
        
        const note = await noteModel.deleteOne({_id:id});
        res.status(202).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getNotes = async (req, res) =>{
    try {
        
        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}
export const getNotesId = async (req, res) =>{
    try {
        
        const notes = await noteModel.findById({_id: req.params.id});
        // const user = await User.findById(request.params.id);
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}