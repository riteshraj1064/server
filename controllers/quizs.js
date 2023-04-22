const Quizs = require('../model/quizs')

exports.addQuiz = async (req, res) => {
    const {owner,name,questions,time} = req.body

    try {
        const quizs =new Quizs({owner,name,questions,time})
        await quizs.save()
        res.status(200).json(quizs)
    } catch (error) {
        console.log(error)
    }

}

exports.getQuiz = async (req,res)=>{
    const {owner} =req.body
    const allQuizs=await Quizs.find({owner:owner})

    res.status(200).json({data:allQuizs})
}