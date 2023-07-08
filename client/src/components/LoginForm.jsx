import { useForm } from "react-hook-form";
import {
  TextField,
  Typography,
  Link,
  Button,
  Box,
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";
import React, {useState} from "react";
import {AnimatePresence, motion} from 'framer-motion';

const WelcomeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f4f6f8'
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="https://github.com/Rashevskyyy">
        Created by Alexey Rashevskyi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginForm = ({ onSubmit }) => {
  const [showLogin, setShowLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: '#f4f6f8',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={StyledPaper} elevation={6} square>
          <AnimatePresence mode={'wait'}>
            {!showLogin ? (
                <WelcomeContainer>
                  <Typography variant="h3">Welcome to CNotes</Typography>
                  <Button variant="contained" color="primary" onClick={() => setShowLogin(true)}>
                    Continue
                  </Button>
                </WelcomeContainer>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1 }}
                >
                  <Box
                      sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box
                        component="form"
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                      <TextField
                          margin="normal"
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          {...register("email", { required: true })}
                          error={!!errors.email}
                          helperText={errors.email && "Email is required"}
                      />
                      <TextField
                          margin="normal"
                          fullWidth
                          id="password"
                          label="Password"
                          name="password"
                          type="password"
                          {...register("password", { required: true })}
                          error={!!errors.password}
                          helperText={errors.password && "Password is required"}
                      />
                      <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                      />
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="register" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Copyright/>
                </motion.div>
            )}
          </AnimatePresence>
        </Grid>
      </Grid>
    </>
  );
};
export default LoginForm;
