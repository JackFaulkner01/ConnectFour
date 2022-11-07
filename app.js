const express = require('express')

const app = express()
const httpPort = 8080

app.set('view engine', 'ejs')

app.use('/images', express.static('./images'))
app.use('/js', express.static('./js'))
app.use('/styles', express.static('./styles'))

app.listen(httpPort, () => {
    console.log(`App listening on port ${httpPort}`)
})

app.get('/connectfour', (req, res) => {
    res.render('connectfour', {
        server: 'jackjf'
    })
})