import { useNavigate } from "react-router-dom";
import type {CreateUser} from "../../../models/user/CreateUser.ts";
import {useState} from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import userRepository from "../../../api/repository/userRepository.ts";

const initialState : CreateUser={
    username:"",
    password:"",
    repeatPassword:"",
    name:"",
    surname:"",
}
const Register = () => {
    const navigate = useNavigate();
    const [formData,setFormData]=useState<CreateUser>(initialState)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const handleChange = (e ) => {
        const {name , value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = () => {
        userRepository
            .register(formData)
            .then(()=>{
                console.log("user registration successful");
                navigate("/login");
            })
            .catch((error) => console.log(error))
    }
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{padding: 4, mt: 4}}>
                <Typography variant="h5" align="center" gutterBottom>Register</Typography>
                <Box>
                    <TextField
                        fullWidth label="Name"
                        name="name"
                        margin="normal"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth label="Surname"
                        name="surname"
                        margin="normal"
                        required
                        value={formData.surname}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth label="Username"
                        name="username"
                        margin="normal"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth label="Repeat Password"
                        name="repeatPassword"
                        type="password"
                        margin="normal"
                        required
                        value={formData.repeatPassword}
                        onChange={handleChange}
                    />

                    <Button fullWidth variant="contained" type="button" sx={{mt: 2}} onClick={handleSubmit}>
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>

    )

}
export default Register;