import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Container } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Doctor_img from "../images/doctor.png";

export const QnaDocContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 0 1rem 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: #9bbbd4;
  width: 71.5rem;
  @media ${({ theme }) => theme.device.ipad} {
    width: 45.8rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 21.4rem;
  }
`;

export const QnaEmptyContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 1rem 2rem;
  padding-right: 30rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: white;
`;

export const QnaListContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  padding: 1rem 2rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const QnaPostContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const QnaWrap = styled.div`
  // display: block;
  // margin-left: 0;
  // margin-right: 0;
  width: 100%;
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    margin-left: 0;
    margin-right: 0;
  }
`;
export const ContentPostWrap = styled.div`
  margin: 1rem 1rem 1rem 1rem;
  .content-info-last {
    display: flex;
    justify-content: space-between;
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.color.button};
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  width: 5rem;
  height: 2rem;
  margin-bottom: auto;
  margin-left: 69.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  @media ${({ theme }) => theme.device.ipad} {
    width: 4rem;
    margin-left: 40rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 4rem;
    margin-left: 16rem;
  }
`;

export const Linked = styled(Link)`
  text-decoration: none;
`;

export const QnaBox = styled.div`
  border: 0.1rem solid #63b5f6;
  float: right;
  color: black;
  border-radius: 10px;
  max-width: 1300px;
  width: 46%;
  height: 50%;
  // margin-bottom: 2rem;
`;

export const EmptyBox = styled.div`
  margin-bottom: 10%;
`;

export const QnaDocBox = styled.div`
  margin-top: 1rem;
  color: black;
  border-radius: 10px;
  background: #ffffff;
  margin-right: 30rem;
  @media ${({ theme }) => theme.device.ipad} {
    margin-right: 20rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 6rem;
  }
`;

export const ContentWrap = styled.div`
  margin: 1rem 1rem 1rem 1rem;
  .content-info-last {
    display: flex;
    justify-content: space-between;
  }
`;

export const ProfileDoc = styled.div`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  & input {
    outline: none;
    border: none;
    width: 7rem;
    height: 1.3rem;
    font-size: 0.8rem;
    padding-left: 0.5rem;
    :disabled {
      background: none;
      color: black;
    }
  }
  .commentFront {
    cursor: pointer;
    margin-left: 18rem;
    @media ${({ theme }) => theme.device.ipad} {
      margin-left: 1.2rem;
      font-size: 0.7rem;
    }
    @media ${({ theme }) => theme.device.mobile} {
      margin-left: 1.5rem;
      font-size: 0.5rem;
    }
  }
  .commentMiddle {
    cursor: pointer;
    margin-left: 0.5rem;
    @media ${({ theme }) => theme.device.ipad} {
      margin-left: 0.8rem;
      font-size: 0.7rem;
    }
    @media ${({ theme }) => theme.device.mobile} {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-size: 0.5rem;
    }
  }
  .commentBack {
    cursor: pointer;
    margin-left: 0.5rem;
    @media ${({ theme }) => theme.device.ipad} {
      margin-left: 0.8rem;
      font-size: 0.7rem;
    }
    @media ${({ theme }) => theme.device.mobile} {
      margin-left: 0;
      font-size: 0.5rem;
    }
  }
  .commentNothing {
    margin-left: 22.3rem;
    @media ${({ theme }) => theme.device.ipad} {
      margin-left: 3.3rem;
      font-size: 0.7rem;
    }
    @media ${({ theme }) => theme.device.mobile} {
      margin-left: 5rem;
      font-size: 0.5rem;
    }
  }
`;

export const ContentTitle = styled.div`
  display: flex;
  float: right;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ContentText = styled.div`
  display: flex;
  height: 2.2rem;
  float: right;
  font-size: 0.8rem;
`;

export const ContentDocText = styled.div`
  display: flex;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 26rem;

  @media ${({ theme }) => theme.device.ipad} {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 12rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 12rem;
  }
`;

export const TagsInput = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 1rem;
  width: 71.6rem;
  padding: 0 0.5rem;
  border: 0.2rem solid #63b5f6;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-left: 0;
    width: 21.5rem;
  }
  > textarea {
    /* whitespace: pre-line; */
    resize: none;
    display: block;
    outline: none;
    border: none;
    width: 100%;
    height: 10rem;
    font-size: 0.8rem;
  }
`;

export const Ren = styled.div`
  > textarea {
    resize: none;
    outline: none;
    border: hidden;
    width: 100%;
    height: 5rem;
    font-size: 0.8rem;
    @media ${({ theme }) => theme.device.mobile} {
      margin-: auto;
    }
    :enabled {
      border: 0.1rem solid #dee2e6;
      border-radius: 10px;
      &:focus {
        outline: 0.1rem solid #63b5f6;
      }
    }
    :disabled {
      background: none;
      color: black;
    }
  }
`;

export const Shu = styled.div`
  > textarea {
    resize: none;
    outline: none;
    border: hidden;
    width: 100%;
    height: 5rem;
    font-size: 0.8rem;
    @media ${({ theme }) => theme.device.mobile} {
      margin-: auto;
    }
    :enabled {
      border: 0.1rem solid #dee2e6;
      border-radius: 10px;
      &:focus {
        outline: 0.1rem solid #63b5f6;
      }
    }
    :disabled {
      background: none;
      color: black;
    }
  }
`;

export const ShuOut = styled.div`
  > textarea {
    resize: none;
    outline: none;
    border: hidden;
    width: 100%;
    height: 5rem;
    font-size: 0.8rem;
    filter: blur(0.3rem);
    -webkit-filter: blur(0.3rem);
    @media ${({ theme }) => theme.device.mobile} {
      margin-: auto;
    }
    :enabled {
      border: 0.1rem solid #dee2e6;
      border-radius: 10px;
      &:focus {
        outline: 0.1rem solid #63b5f6;
      }
    }
    :disabled {
      background: none;
      color: black;
    }
  }
`;

function QnaPost({ isLogin, userInfo, auth }) {
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(false);
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  let url = document.location.href;
  let qna_id = url.split("/");
  qna_id = qna_id[qna_id.length - 1];
  // console.log(qna_id);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/info`,
        { qna_id: qna_id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCommentList(res.data.comments);
        // console.log("QnaPost : ", res.data.comments.length);
      });
  }, []);

  const handleKakuninClick = () => {
    Swal.fire({
      icon: "info",
      title: "?????? ??????????????????????",
      text: "???????????? ???????????? ??? ?????????",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleClick = (e) => {
    if (!inputRef.current.value) {
      Swal.fire({
        icon: "info",
        text: "????????? ??????????????????",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    } else if (auth === 1) {
      // console.log("content???????", contentInfo);
      let payload = { content: inputRef.current.value, qna_id: qna_id };
      axios
        .post(`${process.env.REACT_APP_API_URL}/comments/upload`, payload, {
          withCredentials: true,
        })
        .then((res) => {
          navigate("/qna");
          navigate(`/qna/detail/${qna_id}`);
        });
      Swal.fire({
        icon: "success",
        text: "????????? ??????????????? ?????????????????????",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "?????? ??????????????????????",
        text: "???????????? ???????????? ??? ?????????",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleDelete = (commentid) => {
    Swal.fire({
      icon: "info",
      text: "????????? ????????? ?????? ??? ??? ?????????",
      showCancelButton: true,
      confirmButtonColor: "#63b5f6",
      cancelButtonColor: "#dd3333",
      confirmButtonText: "??????",
      cancelButtonText: "??????",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/comments`, {
            data: {
              comment_id: commentid,
            },
            withCredentials: true,
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "????????? ??????????????? ?????????????????????",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .then(() => {
            navigate("/qna");
            navigate(`/qna/detail/${qna_id}`);
          });
      }
    });
  };

  useEffect(() => {
    if (commentId) {
      editInputRef.current.focus();
    }
  }, [commentId]);

  const onClickEditButton = (commentid) => {
    setCommentId(commentid);
  };

  const onClickSubmitButton = (commentid, doctorid) => {
    let payload = {
      // content: editContent.edittingcontent,
      content: editInputRef.current.value,
      comment_id: commentid,
      doctor_id: doctorid,
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/comments/modify`, payload, {
        withCredentials: true,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "????????? ??????????????? ?????????????????????",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .then(() => {
        navigate("/qna");
        navigate(`/qna/detail/${qna_id}`);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "???????????? ???????????? ??? ?????????",
        });
      });
    setCommentId(null);
  };

  return (
    <>
      {/* ?????? ?????? ??? */}
      {commentList.map((comment, index) => {
        // console.log(comment);
        return (
          <QnaDocContainer key={index}>
            <QnaDocBox>
              <ContentWrap>
                {/* userInfo o, ????????? o, ??????, ?????? ??????????????? */}
                {userInfo &&
                isLogin &&
                auth === 1 &&
                comment.doctors_id === userInfo.id ? (
                  <>
                    <ProfileDoc>
                      <img
                        src={require(`../../public/uploads/${comment.doctor.profile_img}`)}
                        width="20rem"
                        alt="doctor"
                      />
                      <input
                        disabled
                        type="text"
                        defaultValue={`${comment.doctor.name} ?????????`}
                      ></input>
                      {comment.id === commentId ? (
                        <>
                          <span
                            value="??????"
                            className="commentFront"
                            onClick={() =>
                              onClickSubmitButton(
                                comment.id,
                                comment.doctors_id
                              )
                            }
                          >
                            ??????
                          </span>
                        </>
                      ) : (
                        <span
                          value="??????"
                          className="commentFront"
                          onClick={() => onClickEditButton(comment.id)}
                        >
                          ??????
                        </span>
                      )}
                      <span className="commentMiddle">|</span>
                      <span
                        className="commentBack"
                        onClick={() => handleDelete(comment.id)}
                      >
                        ??????
                      </span>
                      {/* </div> */}
                    </ProfileDoc>
                    {comment.id === commentId ? (
                      <Ren>
                        <textarea
                          type="text"
                          defaultValue={comment.content}
                          ref={editInputRef}
                        />
                      </Ren>
                    ) : (
                      <Ren>
                        <textarea
                          disabled
                          type="text"
                          defaultValue={comment.content}
                        />
                      </Ren>
                    )}
                  </>
                ) : userInfo && isLogin && auth === 0 ? (
                  <>
                    <ProfileDoc>
                      <img
                        src={require(`../../public/uploads/${comment.doctor.profile_img}`)}
                        width="20rem"
                        alt="doctor"
                      />
                      <div className="Id">
                        {`${comment.doctor.name} ?????????`}
                        <span className="commentNothing"></span>
                        <span
                          className="commentBack"
                          onClick={() => handleDelete(comment.id)}
                        >
                          ??????
                        </span>
                      </div>
                    </ProfileDoc>
                    <Shu>
                      <textarea
                        disabled
                        type="text"
                        defaultValue={comment.content}
                      />
                    </Shu>
                  </>
                ) : (
                  //userInfo x || ????????? x || ?????? x || ?????? ?????? x
                  <>
                    <ProfileDoc>
                      <img
                        src={
                          comment.doctor
                            ? require(`../../public/uploads/${comment.doctor.profile_img}`)
                            : Doctor_img
                        }
                        width="20rem"
                        alt="doctor"
                      />
                      <input
                        disabled
                        type="text"
                        defaultValue={
                          comment.doctor
                            ? `${comment.doctor.name} ?????????`
                            : "?????? ?????????"
                        }
                      ></input>
                      <span className="commentNothing"></span>
                    </ProfileDoc>
                    {!isLogin ? (
                      <ShuOut>
                        <textarea
                          disabled
                          type="text"
                          defaultValue={comment.content}
                        />
                      </ShuOut>
                    ) : (
                      <Shu>
                        <textarea
                          disabled
                          type="text"
                          defaultValue={comment.content}
                        />
                      </Shu>
                    )}
                  </>
                )}
              </ContentWrap>
            </QnaDocBox>
          </QnaDocContainer>
        );
      })}
      {/* ?????? ??? */}
      {/* ????????? ?????? */}
      {isLogin && auth === 1 ? (
        <QnaPostContainer>
          <TagsInput>
            <textarea
              className="textarea"
              type="textarea"
              ref={inputRef}
              maxLength="177"
              placeholder={"???????????? ????????? ???????????? ?????????"}
            />
          </TagsInput>
        </QnaPostContainer>
      ) : (
        <QnaPostContainer>
          <TagsInput>
            <textarea
              className="textarea"
              type="textarea"
              ref={inputRef}
              onClick={handleKakuninClick}
              placeholder={"???????????? ???????????? ??? ?????????"}
            />
          </TagsInput>
        </QnaPostContainer>
      )}
      <QnaListContainer>
        <QnaWrap>
          <QnaWrap>
            <Button onClick={handleClick}>????????????</Button>
          </QnaWrap>
        </QnaWrap>
      </QnaListContainer>
      {/* ????????? ??? */}
    </>
  );
}

export default QnaPost;
