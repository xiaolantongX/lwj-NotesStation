const { Article } = require('../../model/Article')
const pagination = require('mongoose-sex-page')

module.exports =async (req, res) => {
    const page = req.query.page;

    let result = await pagination(Article).find().page(page).size(4).display(4).populate('author').exec();
    result = JSON.parse(JSON.stringify(result))
    // res.send(result)
    res.render('home/default', {
      result:result
    })
}