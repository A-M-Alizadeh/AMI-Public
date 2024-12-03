import React, { useState } from "react";
import { StyledInput } from "../components/input/Input.styles";
import { Grid, Typography } from "@mui/material";
import RegisterContainer from "../components/registerContainer/RegisterContainer";
import Wrapper from "../components/wrapper/Wrapper";
import { StyledButton } from "../components/button/Button.styles";
import { useNavigate } from "react-router-dom";
import SignupIcons from "../components/icons/SignupIcons";
import { StyledLink } from "../components/link/Link.styles";
import { auth, db } from "../auth/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const email_pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const text_pattern = /^[(a-zA-Z)+(\!\@\#\$\%\^\&\*\(\))+]/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  const navigate = useNavigate();

  const [values, setValues] = useState({
    description: { value: "", isValid: true },
    email: { value: "", isValid: true },
    f_name: { value: "", isValid: true },
    l_name: { value: "", isValid: true },
    speciality: { value: "", isValid: true },
    username: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
  });

  const handleInput = (event) => {
    if (
      values.description.value === "" ||
      !text_pattern.test(values.description.value)
    ) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues({ newObject });
      setErrorMessage("Description cannot be empty!");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (values.email.value === "" || !email_pattern.test(values.email.value)) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues(newObject);
      setErrorMessage("Email is incorrect:(");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (values.f_name.value === "" || !text_pattern.test(values.f_name.value)) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues(newObject);
      setErrorMessage("FirstName cannot be empty!");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (values.l_name.value === "" || !text_pattern.test(values.l_name.value)) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues(newObject);
      setErrorMessage("Last Name cannot be empty!");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (
      values.speciality.value === "" ||
      !text_pattern.test(values.speciality.value)
    ) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues(newObject);
      setErrorMessage("Speciality cannot be empty!");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (
      values.username.value === "" ||
      !text_pattern.test(values.username.value)
    ) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues(newObject);
      setErrorMessage("Username cannot be empty!");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (
      values.password.value === "" ||
      !password_pattern.test(values.password.value)
    ) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setErrorMessage("Password is incorrect:(");
      setValues(newObject);
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }

    if (
      values.confirmPassword.value === "" ||
      !password_pattern.test(values.confirmPassword.value)
    ) {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: false },
      };
      setValues(newObject);
      setErrorMessage("Confirm Password is incorrect:(");
      // return;
    } else {
      const newObject = {
        ...values,
        [event.target.name]: { value: event.target.value, isValid: true },
      };
      setValues(newObject);
      setErrorMessage("");
    }
  };

  const doctorCollectionRef = collection(db, "Doctors");

  const hanldeSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email.value,
        values.password.value
      ).then(() => {
        try {
          addDoc(doctorCollectionRef, {
            description: values.description.value,
            email: values.email.value,
            f_name: values.f_name.value,
            l_name: values.l_name.value,
            speciality: values.speciality.value,
            username: values.username.value,
            password: values.password.value,
          }).then(() => {
            navigate("/login");
          });
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          navigate("/signup");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper alignContent={"center"} justifyContent={"center"}>
      <RegisterContainer
        sx={{
          width: { xs: 400, sm: 440, md: 500 },
          height: { xs: 750, sm: 800, md: 800 },
        }}
      >
        <Grid item sx={{ marginTop: { xs: 1, sm: 2.5, md: 2.5 } }}>
          <Typography variant="h4" component={"h1"} style={{ color: "#fff" }}>
            Signup
          </Typography>
        </Grid>

        {/* <p>{errorMessage}</p> */}
        <Grid
          item
          container
          alignContent={"center"}
          spacing={2}
          sx={{ marginTop: { xs: 1, sm: 1.5, md: 2.5 }, textAlign: "center" }}
        >
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.description.value}
              placeholder="Description"
              type="text"
              name="description"
              style={
                values.description.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.email.value}
              placeholder="Email"
              type="email"
              name="email"
              style={
                values.email.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.f_name.value}
              placeholder="First Name"
              type="text"
              name="f_name"
              style={
                values.f_name.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.l_name.value}
              placeholder="Last Name"
              type="text"
              name="l_name"
              style={
                values.l_name.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.speciality.value}
              placeholder="Speciality"
              type="text"
              name="speciality"
              style={
                values.speciality.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.username.value}
              placeholder="Username"
              type="text"
              name="username"
              style={
                values.username.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>

          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.password.value}
              placeholder="Password"
              type="password"
              name="password"
              style={
                values.password.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              onChange={handleInput}
              value={values.confirmPassword.value}
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              style={
                values.confirmPassword.isValid
                  ? { border: "1px solid #dddddd" }
                  : { border: "1px solid #dddddd" }
              }
            ></StyledInput>
          </Grid>
        </Grid>
        <Grid item xs={11} sx={{ marginTop: { xs: 3, sm: 4, md: 5 } }}>
          <StyledButton
            onClick={hanldeSubmit}
            variant="radius"
            buttons="buttons"
          >
            Signup
          </StyledButton>
        </Grid>
        <Grid
          item
          container
          sx={{ marginTop: { xs: 0, sm: 1 } }}
          spacing={1}
          textAlign={"center"}
          // marginBotto  m={10}
        >
          <SignupIcons />
          <Grid item sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }} xs={12}>
            <StyledLink to="/login" variant="linkhover">
              Already have an account!
            </StyledLink>
          </Grid>
        </Grid>
      </RegisterContainer>
    </Wrapper>
  );
};

export default Signup;
