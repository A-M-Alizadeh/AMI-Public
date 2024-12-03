const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = (app) => {

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
}