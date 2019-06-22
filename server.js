var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ft-db", { useNewUrlParser: true }).then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 4000;


app.listen(port, ()=>{
	console.log('Listening on port ' + port);
});

const Company = require("./models/Company")
//app.get('/', (req, res)=> res.send('Hello World!'));
app.get('/company', (req, res) => {
	const query = req.query
	Company.find(query)
	.then(companies => {
		res.json({
			confirmation: 'success',
			data: companies
		})
	})
	.catch(err=>{
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

app.put('/company/:id', (req, res) => {
    Company.findById(req.params.id)
    .then(company => {
		company.name = req.body.name || company.name
		company.yearFounded = req.body.yearFounded || company.yearFounded
		company.revenue = req.body.revenue || company.revenue
		
        company.save()
        .then( company => {
            res.json('Company updated successfully');
        })
    })
    .catch(err=>{
        res.status(400).send("Error when updating the company");
    })
    
})

app.get('/company/:id', (req, res) =>{
	const id = req.params.id;
	Company.findById(id)
	.then(company => {
		res.json({
			confirmation: 'success',
			data: company
		})
	})
	.catch(err=>{
		res.json({
			confirmation: 'fail',
			message: "Company " + id + " not found"
		})
	})
})

app.post('/company', (req, res)=>{
	  Company.create(req.body)
	  .then(company=>{
		res.json({
			confirmation: 'success',
			data: company
		})
	  })
	  .catch(err=> {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	  })
	});

app.delete('/company/:id', (req, res) => {
    Company.findByIdAndRemove({_id: req.params.id})
    .then(()=>{
        res.json('Company successfully removed');
    })
    .catch(err=>{
        res.json(err);
    })
})

module.exports = app
