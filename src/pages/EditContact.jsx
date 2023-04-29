import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"



const EditContact = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    return (
        <Container maxWidth="sm">
            <Paper sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        mb: 2
                    }}>Edit Contact</Typography>
                <TextField
                    label="firstName"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <TextField
                    label="lastName"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                <TextField
                    label="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    label="phone"
                    variant="outlined"
                    fullWidth value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }} />
                <Button
                    variant="contained"
                    fullWidth
                >
                    Save
                </Button>
                <Button>
                    Cancel
                </Button>
            </Paper>
        </Container>
    )

}

export default EditContact