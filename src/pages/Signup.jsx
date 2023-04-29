import { Container, Paper, Typography, Button, TextField, IconButton } from "@mui/material";
import { useEventCallback } from "@mui/material/utils";
import { useEffect, useState } from "react";
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import { useSelector, useDispatch } from "react-redux";
import { signup } from '../slices/AuthSlice'



const Signup = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = useEventCallback((e) => {
        e.preventDefault();
        dispatch(signup({ name, email, lastName: firstName, password }));
    })
    useEffect(() => {
        console.log(auth);
    }, [auth])
    return (
        <Container sx={{
            margin: 'auto',
        }} maxWidth="sm">
            <Paper
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
                component={"form"}
                onSubmit={handleSubmit}
            >
                <Typography variant="h3">Signup</Typography >
                <TextField
                    label={"name"}
                    type={"text"}
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    label={"last name"}
                    type={"text"}
                    variant="outlined"
                    fullWidth
                    required
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <TextField
                    label={"email"}
                    type={"email"}
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    label={"password"}
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => {
                                setShowPassword(!showPassword);
                            }}>
                                {showPassword ? <VisibilityOffSharpIcon /> : <VisibilitySharpIcon />}
                            </IconButton>
                        )
                    }}
                />
                <Button
                    variant="contained"
                    type="submit"
                >
                    Signup
                </Button>
                <Typography variant="body2">
                    Already have an account? <a href="/login">Login</a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Signup;