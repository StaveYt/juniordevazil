export const handleError = (err,req,res,next) =>{
    res.status(500).send(`Error occured: ${err}`)

}