const Box = require("../models/Box");

class BoxConttroller
{
    async store(req , res){
        const box = await Box.create(req.body.title)
        return res.send(box);

    }
    async list(req, res){
        res.send("list boxxes");
    }
    async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path:'files',
            options:{
                sort:{ createdAt:-1}
            }
        });
        return res.json(box);
    }

}

module.exports = new BoxConttroller();