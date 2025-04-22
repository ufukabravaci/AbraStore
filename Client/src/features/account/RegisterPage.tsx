/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function submitForm(data: FieldValues) {
    requests.Account.register(data)
    .then(() => {
      toast.success("user created.");
    navigate("/login")
    }).catch(result => {
      const {data: errors} = result;
      errors.forEach((error : any) => {
        if(error.code == "DuplicateUserName"){
          setError("username", {message: error.description})
        }
        else if(error.code == "DuplicateEmail"){
          setError("email", {message: error.description})
        }
      })
    });
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
        <Avatar
          sx={{
            mx: "auto",
            color: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            {...register("username", { required: "username is required" })}
            label="Enter username"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("name", { required: "name is required" })}
            label="Enter name"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            {...register("email", { required: "email is required" })}
            label="Enter email"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "Min length is 6 characters",
              },
            })}
            label="Enter password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Register
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
