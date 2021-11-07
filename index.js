const express = require('express')
const app = express()
const axios = require('axios')
var cors = require('cors')
const key = require('./data/keys')


app.use(express.json())
app.use(cors())


app.get('/weather',(req,res)=>{
    (async () => {
        try {
          const response = await axios.get(
              `http://api.weatherapi.com/v1/current.json?key=${key.weather}&q=${req.query.lat},${req.query.lon}&aqi=no`
            )
          res.send(response.data.current)
        } catch (error) {
          console.log(error);
          res.send("Erro")
        }
      })();
})

app.get('/autocomplete',(req,res)=>{
  (async () => {
      try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.string}&key=${key.google}`
          )
        res.send(response.data)
      } catch (error) {
        console.log(error);
        res.send("Erro")
      }
    })();
})

app.get('/search',(req,res)=>{
  (async () => {
      try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.id}&fields=name%2Cformatted_address%2Cgeometry&key=${key.google}`
          )
        res.send(response.data)
        console.log(req.query.search)
      } catch (error) {
        console.log(error);
        res.send("Erro")
      }
    })();
})

app.listen('3001')