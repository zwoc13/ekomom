const Article = require('../models/article')

const createArticle = (req, res, next) => {
  const props = req.body.article

  Article.create(props)
    .then(article => {
      return res.json({
        ok: true,
        message: 'Article created',
        article
      })
    })
    .catch(next)
}

const getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      return res.json({
        ok: true,
        message: 'Articles found',
        articles
      })
    })
    .catch(next)
}

const getArticle = (req, res, next) => {
  const id = req.params.article_id

  Article.findById(id)
    .then(article => {
      return res.json({
        ok: true,
        message: 'Article found',
        article
      })
    })
    .catch(next)
}

const updateArticle = (req, res, next) => {
  const id = req.params.article_id
  const props = req.body.article

  Article.updateOne(id, props)
    .then(article => {
      return res.json({
        ok: true,
        message: 'Article updated',
        article
      })
    })
    .catch(next)
}

const deleteArticle = (req, res, next) => {
  const id = req.params.article_id

  Article.deleteOne(id)
    .then(deleteCount => {
      return res.json({
        ok: true,
        message: 'Article destroyed',
        deleteCount
      })
    })
    .catch(next)
}

module.exports = {
  createArticle,
  getArticle,
  getArticles,
  updateArticle,
  deleteArticle
}