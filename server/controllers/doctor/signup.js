const { doctors } = require("../../models");

module.exports = async (req, res) => {
  // console.log(req.body);
  // req.body에 회원가입 할 정보가 담겨있음.
  const doctorInfo = req.body;
  try {
    if (
      doctorInfo.email === "" ||
      doctorInfo.name === "" ||
      doctorInfo.password === "" ||
      doctorInfo.hospital === "" ||
      doctorInfo.license === ""
    ) {
      // 항목이 비었을때 400코드에 bad request메세지를 보내주고 클라이언트에서는 항목이비었다는 메세지.

      res.send({ error: 1, message: "Bad Request" });
    } else {
      doctors
        .findOrCreate({
          where: { email: doctorInfo.email },
          defaults: {
            password: doctorInfo.password,
            name: doctorInfo.name,
            hospital: doctorInfo.hospital,
            license: doctorInfo.license,
            auth: 1,
            agree: "false",
<<<<<<< HEAD
            profile_img: "doctorprofile.png",
=======
            profile_img: "doctorprofile.jpeg",
>>>>>>> ef38d8fdc0af17123e7d34b3f27092d4a04ef9ec
          },
        })
        .then(([doctors, created]) => {
          // create => true : 중복되는 이메일이 없어서 새로 만들어줌.
          // create => false : 중복되는 이메일이 있어서 새로 만들 수 없음.

          // 중복되는 이메일이 없을 때 201상태코드와 SignUp Ok메세지를 보내줌.
          if (created) {
            res.status(201).send({ message: "SignUp Ok" });
          }
          // 중복되는 이메일이 있을때 409상태코드와 Eamil Exist메세지를 보내줌.
          else {
            res.send({ error: 2, message: "Email Exist" });
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
};
