const Class = require('../model/class')

exports.addClass = async (req, res) => {
    const {name,img} = req.body

    try {
        const classes =new Class({name,img})
        await classes.save()
        res.status(200).json(classes)
    } catch (error) {
        console.log(error)
    }

}

exports.getAllclass = async (req,res)=>{

    const allclass=await Class.find()

    res.status(200).json({data:allclass})
}