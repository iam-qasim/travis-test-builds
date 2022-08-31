var http = require('http')

var server = http.createServer(function (req, res) {
  req.on('data', function (chunk) {
    console.log('server req data: %s', chunk)
  })
  req.on('end', function () {
    console.log('server req end')
    res.end('pong')
  })
})

// Listen on IPv4 address.
var theHost = '127.0.0.1'
server.listen(3000, theHost, function (_err) {
  console.log('server listening: %s', server.address())

  // GET from localhost.
  var theUrl = 'http://localhost:3000/ping'
  console.log('client req: GET %s', theUrl)
  http.get(theUrl, function (res) {
    console.log('client res:', res.statusCode, res.headers)
    res.on('data', (chunk) => {
      console.log('client data: %s', chunk)
    })
    res.on('end', () => {
      console.log('client end')
      server.close()
    })
  })
})
