const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { url } = require('inspector')

dotenv.config()

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const password = process.env.MONGO_PW
const mongoUrl = `mongodb+srv://maxikrug2004:${password}@practice.mgc46.mongodb.net/?retryWrites=true&w=majority&appName=Practice`

mongoose.connect(mongoUrl)
mongoose.set('strictQuery', false)

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})