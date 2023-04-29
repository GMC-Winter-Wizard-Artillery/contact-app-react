import { Button, Container, IconButton, Paper, TextField, Typography, useEventCallback } from "@mui/material";
import { useState } from "react";
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = useEventCallback((e) => {
        e.preventDefault();
        console.log('Submitting: ', email, password);
    })

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
                <Typography variant="h3">Login</Typography >
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
                    sx={{
                        pl: 4,
                        pr: 4,
                    }}
                >
                    Login
                </Button>
                <Typography variant="body2" align="center">
                    Don't have an account? <a href="/register">Register</a>
                </Typography>
            </Paper>
        </Container>
    )
};

export default Login;