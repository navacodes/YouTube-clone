import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import GoogleLogo from "../../svgs/GoogleIcon.svg";
import loginUserIcon from "../../svgs/googleLoginUser.svg";
import { useTheme } from "@mui/material/styles";
import FlexBetween from "../../components/FlexBetween";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../state";
import { useLoginUserMutation } from "../../state/api";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailSection = useRef(null);
  const passwordSection = useRef(null);
  const finalFormRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [login, { isLoading }] = useLoginUserMutation();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const LoginFunction = async (email, password) => {
    try {
      // console.log(email, password);
      const data = await login({ email, password }).unwrap();
      // console.log(data);
      dispatch(setCredentials({ accessToken: data.token }));

      if (data.token) alert("Logged in, redirecting to Youtube");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (!error.status) {
        alert("No Server Response");
      } else if (error.status === 400) {
        alert("Email and Password do not match.");
      } else if (error.status === 401) {
        alert("Unauthorized");
      } else {
        console.log(error);
        alert(error.data?.message);
      }
    }
  };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const nextButtonClicked = () => {
    if (emailRegex.test(details.email)) {
      emailSection.current.classList.add("fadeOutLeft");
      passwordSection.current.classList.add("fadeInLeft");
      document.querySelector(".loginForEmailAndPass").style.display = "flex";
    } else {
      alert("Please enter a valid email !");
    }
  };

  const showPassword = () => {
    if (checked) {
      passwordInputRef.current.type = "text";
    } else {
      passwordInputRef.current.type = "password";
    }
  };
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    showPassword();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    LoginFunction(details.email, details.password);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <Box
      className="loginPage"
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        alignContent: "center",
      }}>
      <Box
        className="loginFormContainer"
        sx={{
          border: "1px solid #dadce0",
          height: "500px",
          width: "448px",
          margin: "auto auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px 40px 36px",
          flexDirection: "column",
        }}>
        <img
          src={GoogleLogo}
          style={{ height: "24px", width: "75px" }}
          alt={`GoogleLogo`}
        />
        <Box
          sx={{
            width: "100%",
            height: "400px",
            marginX: "40px",
          }}>
          <Box
            ref={emailSection}
            className="loginFormEmail"
            sx={{
              width: "366px",
              height: "345.41px",
            }}>
            <form
              action=""
              style={{
                width: "100%",
                paddingTop: "16px",
              }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#202124",
                  textAlign: "center",
                }}>
                Sign in
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#202124",
                  textAlign: "center",
                  paddingTop: "7px",
                }}>
                to continue to YouTube
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    paddingTop: "24px",
                  }}>
                  <Box className="textFieldBox" sx={{ width: "100%" }}>
                    <TextField
                      type="email"
                      required
                      fullWidth
                      label="Email"
                      id="fullWidth-uncontrolled"
                      variant="outlined"
                      size="normal"
                      value={details.email}
                      onChange={(e) => {
                        setDetails({
                          email: e.target.value,
                          password: details.password,
                        });
                      }}
                      sx={{
                        "& .MuiFormLabel-root": {
                          color: theme.palette.loginPlaceholder,
                          fontSize: "16px",
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: theme.palette.loginBlue,
                        },
                        "& .MuiInputBase-input": {
                          color: theme.palette.loginText,
                          fontSize: "16px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.loginBorder,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        paddingTop: "11px",
                        paddingBottom: "5px",
                        color: theme.palette.loginBlue,
                        fontWeight: 600,
                        letterSpacing: 0.25,
                      }}>
                      Forgot email ?
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <span>
                <Box mt="32px">
                  <Box
                    sx={{
                      fontSize: "14px",
                      paddingTop: "9px",
                      paddingBottom: "3px",
                    }}>
                    Not your computer? Use Guest mode to sign in privately.{` `}
                    <span
                      style={{
                        color: theme.palette.loginBlue,
                        fontWeight: 600,
                        letterSpacing: 0.25,
                      }}>
                      Learn more
                    </span>
                  </Box>
                </Box>
              </span>
              <Box mt="32px" ml="-8px">
                <FlexBetween>
                  <Button size="large">Create account</Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => nextButtonClicked()}>
                    Next
                  </Button>
                </FlexBetween>
              </Box>
            </form>
          </Box>

          <Box
            ref={passwordSection}
            className="loginForEmailAndPass"
            sx={{ width: "366px", height: "345.41px" }}>
            <form
              ref={finalFormRef}
              action=""
              onSubmit={(e) => handleFormSubmit(e)}
              style={{
                width: "100%",
                paddingTop: "16px",
              }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#202124",
                  textAlign: "center",
                }}>
                Welcome
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "7px",
                }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "16px",
                    border: "1px solid #dadce0",
                    padding: "5px 15px 5px 10px",
                    maxWidth: "100%",
                  }}>
                  <img
                    src={loginUserIcon}
                    style={{
                      marginRight: "8px",
                      height: "20px",
                      width: "20px",
                    }}
                    alt="userIcon"
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#3c4043",
                      textAlign: "center",
                    }}>
                    {details.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    paddingTop: "24px",
                  }}>
                  <Box className="textFieldBox" sx={{ width: "100%" }}>
                    <TextField
                      ref={passwordInputRef}
                      fullWidth
                      id="outlined-password-input"
                      variant="outlined"
                      size="normal"
                      label="Password"
                      type={checked ? "text" : "password"}
                      value={details.password}
                      onChange={(e) => {
                        setDetails({
                          password: e.target.value,
                          email: details.email,
                        });
                      }}
                      sx={{
                        "& .MuiFormLabel-root": {
                          color: theme.palette.loginPlaceholder,
                          fontSize: "16px",
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: theme.palette.loginBlue,
                        },
                        "& .MuiInputBase-input": {
                          color: theme.palette.loginText,
                          fontSize: "16px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.loginBorder,
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "11px",
                        paddingBottom: "5px",
                      }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={handleCheckChange}
                            sx={{
                              height: "14px",
                              width: "14px",
                              "& .MuiButtonBase-root": {
                                height: "40px",
                                width: "40px",
                              },
                              "& .MuiButtonBase-root.Mui-checked": {
                                backgroundColor: theme.palette.loginBlue,
                              },
                              "& .PrivateSwitchBase-input": {
                                opacity: 1,
                              },
                            }}
                          />
                        }
                        label="Show password"
                        sx={{
                          marginRight: "0px",
                          marginLeft: "2px",
                          "& .MuiFormControlLabel-label": {
                            color: theme.palette.loginBlue,
                            fontWeight: 600,
                            letterSpacing: 0.25,
                            marginLeft: "16px",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box mt="32px" ml="-8px" width="100%">
                <FlexBetween>
                  <Button size="large">Forgot password</Button>
                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </FlexBetween>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
