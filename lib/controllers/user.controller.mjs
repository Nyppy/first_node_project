import User from '../models/user.mjs';
import {genSalt, hash, compare} from 'bcrypt';
import Helper from '../Helper.mjs';

User.watch().on('change', (data) => {
  console.log(`DB add new user ${data.fullDocument.name}!`)
})

async function create(req, res) {
  const validEmail = await Helper.validEmail(req.body.email, User)

  if (validEmail) {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  
    const salt = genSalt(10)
    user.password = hash(user.password, salt)

    user.save((err) => {
      if (err) {
        res.status(400)
          .json({
            data: {
              error: {
                message: `Created user ${req.body.name} not performed!`
              }
            }
          })
        console.log(err)
      } else {
        res.status(200)
          .json({
            data: {
              success: {
                user: {
                  name: user.name,
                  id: user._id
                }
              }              
            }
        })
      }
    })
  } else {
    res.status(400)
      .json({
        data: {
          error: {
            message: `Email ${req.body.email} is already in use!`
          }
        }
    })
  }
}

async function get(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400)
        .json({
          data: {
            error: {
              message: `Not found request!`
            }
          }
        })
    } else {
      res.status(200)
        .json({
          data: {
            success: {
              users: {
                data: users,
                count_users: users.length
              },
            }
          }
      })
    }
  })
}

async function login(req, res) {
  const user = await User.findOne({email: req.body.email})

  if (user) {
    const validPass = await compare(req.body.password, user.password)

    if (validPass) {
      res.status(200)
        .json({
          data: {
            success: {
              user: {
                name: user.name,
                email: user.email
              }
            }
          }
        })
    } else {
      res.status(400)
        .json({
          data: {
            error: {
              message: `Wrong password!`
            }
          }
        })
    }
  } else {
    res.status(400)
      .json({
        data: {
          error: {
            message: `User ${req.body.email} is not found!`
          }
        }
      })
  }
}

export default {create, get, login}