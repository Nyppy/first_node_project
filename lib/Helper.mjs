function connectDB(mongo) {
  mongo.then(() => {
    console.log('Db connected success!')
  }, error => {
    console.log('Db connected error!', error)
  })
}

async function validEmail(email, users) {
  const user = await users.findOne({email: email})

  if (user) return false;
  return true
}

export default {
  connectDB,
  validEmail
};