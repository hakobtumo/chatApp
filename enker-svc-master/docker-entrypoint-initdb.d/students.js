db.students.remove({});
db.students.insertMany([{
  "email": "mesrobk@gmail.com",
  "firstName": "Mesrob",
  "lastName": "Kyurkchyan",
  "password": "password",
  "learningTargets": [
    "Animation",
    "Game Development",
    "Filmmaking"
  ],
  "location": "Yerevan"
}, {
  "email": "mesrobk2@gmail.com",
  "firstName": "Martin",
  "lastName": "Kyurkchyan",
  "password": "password",
  "learningTargets": [
    "Game Development",
  ],
  "location": "Gyumri"
}, {
  "email": "hakob.hakobyan@tumo.org",
  "firstName": "Hakob",
  "lastName": "Hakobyan",
  "password": "123456789",
  "learningTargets": [
    "Game Development",
  ],
  "location": "Yerevan"
},{
  "email": "lol@gmail.com",
  "firstName": "Geghvard",
  "lastName": "Chubinghanyan",
  "password": "123456789",
  "learningTargets": [
    "Game Development",
  ],
  "location": "Yerevan"
}
])

db.students.createIndex({ lastName: "text", firstName: "text", location: "text" })
db.students.createIndex({ learningTargets: 1 })
