const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
