const Joi = require('joi')

// const schema = {
//   username: Joi.string().min(2).max(10).error(new Error('用户名错误')),
//   password:Joi.number().min(4).max(10)
// }

// async function run() {
//   try {
//     await Joi.validate({ username: '1' }, schema);
//   } catch (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log('验证通过');
 
// }
const schema = Joi.object({
    username: Joi.string().min(2).max(10).error(new Error('用户名错误')),
    password:Joi.number().min(4).max(10)
})
async function run() {
  try {
    const res = schema.validate({ username: 'adasd' })
    console.log(res);
  } catch (err) {
    console.log(err.message);
    return;
  }
  console.log('验证通过');
}
run()