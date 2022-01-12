const { qna } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  console.log("qna req.body? : ", req.body);
  const accessTokenData = isAuthorized(req);
  const qnaInfo = req.body;

  //카카오로 로그인 시, accesstoken, kakao_userid 같이 받아오기
  //   const kakaoToken = req.body.access_token;
  const kakaoUserid = req.body.kakao_userid;

  //<---- kakao로 로그인 했을 때!---->
  if (kakaoUserid) {
    if (
      qnaInfo.title === "" ||
      qnaInfo.content === "" ||
      qnaInfo.category === ""
    ) {
      // 항목이 비었을때
      res.status(400).send({ message: "Bad Request" });
    } else {
      //항목이 다 적혀있을때
      await qna
        .create({
          title: qnaInfo.title,
          content: qnaInfo.content,
          users_id: kakaoUserid, //kakao userid를 적는다. 한자리 숫자가 아니라 여러개라 섞이지 않을듯?
          category: qnaInfo.category,
        })
        .then(() => {
          res.status(201).send({ message: "QnA Upload Ok" });
        });
    }
    //<---- 일반 로그인 시 ---->
  } else if (!kakaoUserid) {
    //<---- 일반 로그인 시, 토큰이 유효하지 않을 때 ---->

    if (!accessTokenData) {
      res.status(401).send({ data: null, message: "Invalid Token" });
      //<--- 일반 로그인 시, 토큰은 유효, but 항목이 비었을 때 --->
    } else if (accessTokenData) {
      if (
        qnaInfo.title === "" ||
        qnaInfo.content === "" ||
        qnaInfo.category === ""
      ) {
        res.status(400).send({ message: "Bad Request" });
      } else {
        await qna
          .create({
            title: qnaInfo.title,
            content: qnaInfo.content,
            users_id: accessTokenData.id, //kakao userid를 적는다. 한자리 숫자가 아니라 여러개라 섞이지 않을듯?
            category: qnaInfo.category,
          })
          .then(() => {
            res.status(201).send({ message: "QnA Upload Ok" });
          });
      }
    }
  }
};
