const Subject = require('../model/subject')

exports.addSubject = async (req, res) => {
    const {owner,name} = req.body

    try {
        const subject =new Subject({owner,name})
        await subject.save()
        res.status(200).json(subject)
    } catch (error) {
        console.log(error)
    }

}

exports.getSubject = async (req,res)=>{
    const {owner} =req.body
    console.log(req.body)
    const allsubject=await Subject.find({owner:owner})

    res.status(200).json({data:allsubject})
}