const File  = require("../models/File");
const Box = require("../models/Box")

class FileController
{
    async store(req, res){
        //criar arquivo
        const box = await Box.findById(req.params.id);   
        const file = await File.create({
             title: req.file.originalname,
             path: req.file.key
         })
        box.files.push(file)
        await box.save();
        console.log(box)

        req.io.sockets.in(box._id).emit('file',file);
        return res.json(box)
    }
}

module.exports = new FileController();