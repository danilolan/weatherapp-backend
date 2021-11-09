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
              `http://api.weatherapi.com/v1/current.json?key=${key.weather}&q=${req.query.lat},${req.query.lng}&aqi=no`
            )
            
          res.send(response.data)
        } catch (error) {
          console.log(error);
          res.send("Erro")
        }
      })();
})

app.get('/autocomplete',(req,res)=>{
  (async () => {
      try {
        const string = req.query.string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${string}&key=${key.google}`
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
      } catch (error) {
        console.log(error);
        res.send("Erro")
      }
    })();
})

app.listen('3001')