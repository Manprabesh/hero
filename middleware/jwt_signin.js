import jwt from 'jsonwebtoken'

const set_cookie=(phn_no,res)=>{
   let token = jwt.sign(phn_no, 'secret');

//    console.log("emaillll",email);

    res.cookie("token",token)
    // console.log(token);

    // next()
    // console.log(next)
}

export default set_cookie