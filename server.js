var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

mongoose.connect("mongodb+srv://WendyLee:LyxYdiisJqgfSKug@ftsample-4gokh.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }).then(
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

app.get('/companies/date', (req, res, next) => {
	const query = req.query
	const minDate = Number(query.minDate)
	const maxDate = Number(query.maxDate)
	if (!minDate || ! maxDate){
		return res.status(400).send({ message: 'Bad formatting, must have minimum and maximum year' });
	}
	else{
		Company.find({
				yearFounded:{$gte: minDate, $lte: maxDate}
		})
		.then(companies => {
			res.json({
				confirmation: 'success',
				data: companies
			})
		})
		.catch(err=>{
			next(err)
		})
	}
})

app.get('/companies', (req, res, next) => {
	const query = req.query
	Company.find(query)
	.then(companies => {
		res.json({
			confirmation: 'success',
			data: companies
		})
	})
	.catch(err=>{
		next(err)
	})
})

app.put('/company/:id', (req, res, next) => {
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
        next(err)
    })
})

app.get('/company/:id', (req, res, next) => {
	const id = req.params.id;
	Company.findById(id)
	.then(company => {
		res.json({
			confirmation: 'success',
			data: company
		})
	})
	.catch(err=>{
		next(err)
	})
})

app.post('/company', (req, res, next) => {
	  Company.create(req.body)
	  .then(company=>{
		res.status(204).json({
			confirmation: 'success',
			data: company
		})
	  })
	  .catch(err=> {
		next(err)
	  })
	});

app.delete('/company/:id', (req, res, next) => {
    Company.findByIdAndRemove({_id: req.params.id})
    .then(()=>{
        res.json('Company successfully removed');
	})
	.catch(err => {
		next(err)
	} )
    
})

// Any error
app.use(function(err, req, res, next) {
	if (!err){
		return res.status(404).send({ message: 'Page Not found.' });
	}
	else{
		return res.status(500).send({ error: err });
	}
});

module.exports = app
 