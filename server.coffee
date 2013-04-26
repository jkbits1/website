express = require 'express'
sizlate = require 'sizlate'
mongoose = require 'mongoose'
require 'datejs'
md = require("node-markdown").Markdown

mongoose.connect process.env['MONGOHQ_URL'] || 'mongodb://localhost/lnug'

Schema = mongoose.Schema
ObjectId = Schema.ObjectId

app = express()

app.set('view engine', 'sizlate')
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/"))
app.use(express.bodyParser())

vimeo = require('./lib/vimeo')
vimeo.keyword = 'LNUG'
vimeo.request()

JobSchema = new Schema
  job_title     : { type: String, required: true }
  description   : { type: String, required: true }
  name          : { type: String, required: true }
  email         : { type: String, required: true }
  company_name  : { type: String, required: true }
  company_url   : { type: String, required: true }
  location      : { type: String, required: true }
  type          : { type: String, required: true }
  date          : { type: Date,   default: Date.now }

Job = mongoose.model 'Job', JobSchema

# server routes
app.get "/", (req,res) ->
  Job.where('date').gt(Date.parse('-30days')).sort('date').exec (err, docs) ->
    jobs = docs.map (j) ->
      {
        '.company': {
          href: j.company_url,
          innerHTML: j.company_name
        },
        '.type': j.type
        '.location': j.location,
        '.title': j.job_title,
        '.description': md(j.description, true),
      }
    videos = vimeo.videos[0..3].map (v) ->
      {
        '.title': v.title,
        '.link': {
          href: v.url
        },
        '.thumb': {
          src: v.thumbnail_medium,
          alt: v.title
        }
      }

    res.render 'index',
      layout: 'layout',
      selectors: {
        'ul#videos':{
          partial: 'video',
          data: videos
        }
        'ul#jobs':{
          partial: 'small_job',
          data: jobs
        }
      }

app.get '/jobs', (req,res) ->
  Job.where('date').gt(Date.parse('-30days')).sort('date').exec (err, docs) ->
    if docs
      jobs = docs.map (j) ->
        {
          '.date': j.date.toDateString(),
          '.company': j.company_name
          '.type': j.type
          '.location': j.location,
          '.title': j.job_title,
          '.description': md(j.description, true),
          '.apply': {
            href: "mailto:#{j.email}"
          }
        }
    else
      jobs = []

    res.render 'jobs',
      layout: 'layout',
      selectors: {
        'ul#jobs':{
          partial: 'job',
          data: jobs
        }
      }

app.get '/submit', (req,res) ->
  res.render 'submit',
    layout: 'layout',
    selectors: {}

app.post '/submit', (req,res) ->
  job = new Job(req.body)
  if req.body.password == (process.env['JOB_PASSWORD'] || 'password')
    job.save (err) ->
      if err
        console.log(err)
        res.render 'submit',
          layout: 'layout',
           selectors: {
             '.error': 'Invalid submission, all fields are required'
           }
      else
        res.redirect '/jobs'
  else
    res.render 'submit',
      layout: 'layout',
       selectors: {
         '.error': 'Invalid password'
       }

app.get '/nodecopter', (req,res) ->
  res.render 'nodecopter',
    layout: 'layout'

port = process.env.PORT || 8080
app.listen port
console.log "Listening on Port '#{port}'"