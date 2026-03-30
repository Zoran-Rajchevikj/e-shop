import {useNavigate} from "react-router-dom";
import {useState} from "react";
import userRepository from "../../../api/repository/userRepository.ts";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import useAuth from "../../../api/hooks/useAuth.ts";
import type {LoginUser} from "../../../models/user/LoginUser.ts";

const initialFormData: LoginUser = {
    "username": "",
    "password": "",
};

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginUser>(initialFormData);


    const {login} = useAuth();
    const handleSubmit = () => {
        userRepository
            .login(formData)
            .then((response) => {
                console.log("Logged in successfully");
                login(response.token);
                navigate("/");
            })
            .catch((error) => console.log(error))
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{padding: 4, mt: 8}}>
                <Typography variant="h5" align="center" gutterBottom>Login</Typography>
                <Box>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        margin="normal"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{mt: 2}}
                        onClick={handleSubmit}>
                        Login
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        sx={{mt: 2}}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>

    );
};

export default Login;