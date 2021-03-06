require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person',personSchema);




const createAndSavePerson = (done) => {
  let p = new Person();
  p.name = "test person";
  p.age = 23;
  p.favoriteFoods.push("something to eat");

  p.save(); 
  done(null , p);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) {
       done(err); 
    }
  done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err,data)=>{
    if (err) {
      done(err);
    }
    done(null , data)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({food: food},(err,data)=>{
    if (err) {
      done(err);
    }
    done(null , data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    if (err) {
      done(err);
    }
    done(null , data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId,(err,data)=>{
    if (err) {
      done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save().then(()=>{
      done(null,data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},
    {age:ageToSet},
    {new: true},
    (err,doc)=>{
      if (err) {
        done(err)
      }
      done(null,doc);
    }
   );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,
    {},
    (err,doc)=>{
      if (err) {
        done(err);
      }
      done(null,doc);
    }
   );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name:nameToRemove}, (err,doc)=>{
    if (err) {
      done(err);
    }
    done(null,JSON.stringify(doc));
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
