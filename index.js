var express = require('express');
var app = express();

// This should point to wherever the static project lives
app.use(express.static(__dirname));

app.listen(process.env.PORT || 5000);
