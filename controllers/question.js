const Question = require('../model/question')

exports.addQuestion = async (req, res) => {
    const {owner,questions} = req.body

    try {
        const question =new Question({owner:owner,englishData:questions})
        await question.save()
        res.status(200).json(question.englishData)
    } catch (error) {
        console.log(error)
    }

}

exports.getQuestion = async (req,res)=>{
    const {owner} =req.body
   try {
    console.log(owner)
    const question=await Question.findOne({owner:owner})
    res.json(question)
   } catch (error) {
    res.json({msg:'comming soon'})
   }
}
exports.insertQuestion = async (req,res)=>{
    const {owner,englishData} =req.body
   try {
    console.log(englishData,owner)
    const question=await Question.findOne({_id:owner})
    question.insertMany([{englishData}])
    res.json(question)
   } catch (error) {
    res.json(error)
   }
}