import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import { valid } from "../../modules/validator";
import { message } from "../../modules/message";

export const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

export const ModalBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 23rem;
  height: 33rem;
  border-radius: 10px;
  background-color: #fbf3ed;
  overflow: hidden;
`;

export const LoginHeader = styled.div`
  position: relative;
  padding: 0.7rem 3.5rem 1rem 9rem;
  background-color: #fbf3ed;
  font-weight: 500;
  color: black;
  font-size: 1.5rem;

  & > button {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    width: 1.5rem;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    color: ${({ theme }) => theme.color.hamburger};
    border: 0;
    cursor: pointer;
    background-color: #fbf3ed;
  }
`;

export const SelectHeader = styled.div`
  position: relative;
  padding: 0 3.5rem 0 7rem;
  background-color: #fbf3ed;
  font-weight: 500;
  color: black;
  font-size: 1.5rem;
`;

export const LoginBody = styled.div`
  padding: 1rem;
  color: black;
  background-color: #fbf3ed;
  border-radius: 10px;
  &:focus {
    outline: 0.1rem solid #63b5f6;
    border-radius: 10px;
  }

  & > div {
    padding: 0 0.7rem 0.7rem 2rem;
    display: block;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
      border-radius: 10px;
    }
  }
  & > div > input {
    display: block;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    width: 17rem;
    height: 2.5rem;
    font-size: 0.8rem;
    border: 0.1rem solid #dee2e6;
    border-radius: 10px;
    &:focus {
      outline: 0.1rem solid #63b5f6;
      border-radius: 10px;
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const LoginFooter = styled.div`
  padding: 0rem 1rem 0rem 1rem;
  background-color: #fbf3ed;
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: #b5afaf;
    font-size: 0.5rem;
    margin: 0.5rem;
    margin-left: 5.4rem;
  }
`;

export const LoginFoot = styled.div`
  padding: 0.1rem 0rem 0rem 3.8rem;
  background-color: #fbf3ed;
`;

export const SocialLoginHeader = styled.div`
  background-color: #fbf3ed;
`;

export const SocialLogin = styled.a`
  padding: 0.1rem 1rem 1rem 2rem;
`;

export const Button = styled.button`
  margin: 0rem 2rem;
  background: #6ec5ff;
  white-space: nowrap;
  padding: 0.6rem 7rem;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #002171;
  }
`;

export const BtnMenu = styled.button`
  margin: 0.7rem 1.2rem;
  background: #fbf3ed;
  white-space: nowrap;
  color: black;
  outline: none;
  border: none;
`;

export const Msg = styled.span`
  display: block;
  margin: 0 3.3rem;
  color: red;
  margin-top: 0;
  font-size: 0.8rem;
`;

export const LoginFeet = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #b5afaf;
  font-size: 0.8rem;
  margin: 0.5rem;
  background-color: #fbf3ed;
  margin-left: 2.3rem;
  .span {
    margin-left: 0.5rem;
    color: #63b5f6;
    cursor: pointer;
  }
`;

export const LoginFeets = styled.div`
  padding: 0.5rem 0rem 0.47rem 2rem;
  flex-basis: 100%;
  align-items: center;
  color: black;
  font-size: 0.8rem;
  margin: 0.5rem;
  background-color: white;
  margin-left: 3.2rem;
  margin-right: 3.2rem;
  border-radius: 10px;
`;

function SignUpModal({ open, close, handleResponseSuccess, swi }) {
  const [isSelect, setIsSelect] = useState("public");

  // input???, ??????????????? ?????????
  const reset = () => {
    setPublicInfo({
      nickname: "",
      email: "",
      password: "",
    });
    setDoctorInfo({
      email: "",
      name: "",
      password: "",
      hospital: "",
      license: "",
    });
    setErrorMessage({
      nickname: "",
      email: "",
      password: "",
      confirm: "",
      name: "",
      hospital: "",
      license: "",
    });
  };

  // ?????????????????? ????????? ?????????
  const [errorMessage, setErrorMessage] = useState({
    nickname: "",
    email: "",
    password: "",
    confirm: "",
    name: "",
    hospital: "",
    license: "",
  });

  // ???????????? ??????
  const [publicInfo, setPublicInfo] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  // ???????????? onChange ??????
  const publicChange = (key) => (e) => {
    setPublicInfo({
      ...publicInfo,
      [key]: e.target.value,
    });
    const id = e.target.id;
    const value = e.target.value;
    if (valid[id](value)) {
      setErrorMessage((prev) => {
        prev[id] = "";
        return prev;
      });
    } else {
      setErrorMessage((prev) => {
        prev[id] = message[id];
        return prev;
      });
    }
  };

  // ???????????? ??????
  const [doctorInfo, setDoctorInfo] = useState({
    email: "",
    name: "",
    password: "",
    hospital: "",
    license: "",
  });

  // ???????????? onChange ??????
  const doctorChange = (key) => (e) => {
    setDoctorInfo({
      ...doctorInfo,
      [key]: e.target.value,
    });
    const id = e.target.id;
    const value = e.target.value;
    if (id !== "hospital") {
      if (valid[id](value)) {
        setErrorMessage((prev) => {
          prev[id] = "";
          return prev;
        });
      } else {
        setErrorMessage((prev) => {
          prev[id] = message[id];
          return prev;
        });
      }
    }
  };

  // ??????, ?????? ???????????? ????????? ?????????
  const handleClick = (e) => {
    reset();
    setIsSelect(e.target.value);
  };

  // ??????????????????
  const publicSignUp = () => {
    const { nickname, email, password } = publicInfo;
    if (nickname === "" || email === "" || password === "") {
      setErrorMessage({
        ...errorMessage,
        confirm: message.emptyMessage,
      });
      return;
    } else if (
      errorMessage.nickname ||
      errorMessage.password ||
      errorMessage.email
    ) {
      setErrorMessage({
        ...errorMessage,
        confirm: message.rightStyle,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/public/signup`, publicInfo, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log("???????????? ??????");
          if (res.data.error === 2) {
            Swal.fire({
              icon: "warning",
              title: "Apang ????????????",
              text: message.existEmail,
            });
          } else if (res.data.error === 3) {
            Swal.fire({
              icon: "warning",
              title: "Apang ????????????",
              text: message.existNickname,
            });
          } else if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Apang ????????????",
              text: message.signupSuccess,
            });
            delete publicInfo.nickname;
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/common/signin`,
                publicInfo,
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                // console.log("????????? ?????????????");
                handleResponseSuccess(res.data.data.auth);
              });
            close();
          }
          // navigate("/");
        });
    }
  };

  const doctorSignUp = () => {
    const { email, name, password, hospital, license } = doctorInfo;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      hospital === "" ||
      license === ""
    ) {
      setErrorMessage({
        ...errorMessage,
        confirm: message.emptyMessage,
      });
      return;
    } else if (
      errorMessage.name ||
      errorMessage.password ||
      errorMessage.email ||
      errorMessage.hospital ||
      errorMessage.license
    ) {
      setErrorMessage({
        ...errorMessage,
        confirm: message.rightSignup,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/doctor/signup`, doctorInfo, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.status);
          if (res.data.error === 2) {
            Swal.fire({
              icon: "warning",
              title: "Apang ????????????",
              text: message.existEmail,
            });
          } else if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Apang ????????????",
              text: message.doctorSignupSuccess,
            });
            close();
          }
        });
    }
  };

  return open ? (
    <ModalBackGround
      onClick={() => {
        setIsSelect("public");
        reset();
        close();
      }}
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <LoginHeader>
          <button
            onClick={() => {
              setIsSelect("public");
              reset();
              close();
            }}
          >
            &times;
          </button>
        </LoginHeader>
        <SelectHeader>
          <input
            type="radio"
            name="user"
            value="public"
            onChange={handleClick}
            defaultChecked={true}
          />
          <BtnMenu>??????</BtnMenu>
          <input
            type="radio"
            name="user"
            value="doctor"
            onClick={handleClick}
            defaultChecked={false}
          />
          <BtnMenu>??????</BtnMenu>
        </SelectHeader>
        {isSelect === "public" ? (
          <>
            <LoginFeets>
              ?????? ?????? ?????? ??? Q&A ?????? ?????? ????????? <br />
              ?????? ?????? ?????? ????????? ????????? ????????? ??? <br />
              ????????? ???????????? ????????? ??? ????????? <br />
              ????????? ??? ????????? ????????? ???????????????
            </LoginFeets>
            <LoginBody>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="?????????"
                  onChange={publicChange("email")}
                  value={publicInfo.email}
                />
                <Msg>{errorMessage.email}</Msg>
              </div>

              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="????????????"
                  onChange={publicChange("password")}
                  value={publicInfo.password}
                />
                <Msg>{errorMessage.password}</Msg>
              </div>

              <div>
                <input
                  id="nickname"
                  type="text"
                  placeholder="?????????"
                  onChange={publicChange("nickname")}
                  value={publicInfo.nickname}
                />
                <Msg>{errorMessage.nickname}</Msg>
                <Msg>{errorMessage.confirm}</Msg>
              </div>
              <Button onClick={publicSignUp}>????????????</Button>
            </LoginBody>
            <>
              <LoginFooter>
                <LoginFeet>
                  <div>?????? ???????????????????</div>
                  <span className="span" onClick={swi}>
                    ?????????
                  </span>
                </LoginFeet>
              </LoginFooter>
            </>
          </>
        ) : (
          <>
            <LoginBody>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="?????????"
                  onChange={doctorChange("email")}
                />
                <Msg>{errorMessage.email}</Msg>
              </div>

              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="????????????"
                  onChange={doctorChange("password")}
                />
                <Msg>{errorMessage.password}</Msg>
              </div>

              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="??????"
                  onChange={doctorChange("name")}
                />
                <Msg>{errorMessage.name}</Msg>
              </div>

              <div>
                <input
                  id="license"
                  type="number"
                  placeholder="?????? ??????"
                  onChange={doctorChange("license")}
                />
                <Msg>{errorMessage.license}</Msg>
              </div>

              <div>
                <input
                  id="hospital"
                  type="text"
                  placeholder="?????? ??????"
                  onChange={doctorChange("hospital")}
                />
                <Msg>{errorMessage.confirm}</Msg>
              </div>

              <Button onClick={doctorSignUp}>????????????</Button>
            </LoginBody>
            <LoginFooter>
              <LoginFeet>
                <div>?????? ???????????????????</div>
                <span className="span" onClick={swi}>
                  ?????????
                </span>
              </LoginFeet>
            </LoginFooter>
          </>
        )}
      </ModalBox>
    </ModalBackGround>
  ) : null;
}

export default SignUpModal;
