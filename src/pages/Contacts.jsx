import { Avatar, Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Md5 } from "ts-md5/dist/md5";
import { deepPurple } from '@mui/material/colors';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useMemo, useState } from "react";
const CONTACTS = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        phone: "123-456-7890",
        initials: "JD",
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        phone: "555-555-5555",
        initials: "JD",
    },
    {
        id: 3,
        firstName: "Bob",
        lastName: "Smith",
        email: "bobsmith@yahoo.com",
        phone: "222-222-2222",
        initials: "BS",
    },
    {
        id: 4,
        firstName: "Alice",
        lastName: "Johnson",
        email: "alicej@gmail.com",
        phone: "333-333-3333",
        initials: "AJ",
    },
    {
        id: 5,
        firstName: "Michael",
        lastName: "Brown",
        email: "mbrown@hotmail.com",
        phone: "444-444-4444",
        initials: "MB",
    },
    {
        id: 6,
        firstName: "Sarah",
        lastName: "Lee",
        email: "sarahlee@gmail.com",
        phone: "777-777-7777",
        initials: "SL",
    },
    {
        id: 7,
        firstName: "David",
        lastName: "Wilson",
        email: "dwilson@gmail.com",
        phone: "888-888-8888",
        initials: "DW",
    },
    {
        id: 8,
        firstName: "Karen",
        lastName: "Nguyen",
        email: "karennguyen@yahoo.com",
        phone: "999-999-9999",
        initials: "KN",
    },
    {
        id: 9,
        firstName: "Peter",
        lastName: "Wong",
        email: "pwong@hotmail.com",
        phone: "111-111-1111",
        initials: "PW",
    },
    {
        id: 10,
        firstName: "Emily",
        lastName: "Chen",
        email: "emilychen@gmail.com",
        phone: "666-666-6666",
        initials: "EC",
    },
    {
        id: 11,
        firstName: "Mark",
        lastName: "Taylor",
        email: "marktaylor@gmail.com",
        phone: "444-555-6666",
        initials: "MT",
    }
]

const getGravatar = (email) => {
    const trimmedEmail = email?.trim()?.toLowerCase();
    const hash = Md5.hashStr(trimmedEmail);
    const avatar = `https://www.gravatar.com/avatar/${hash}?d=retro`;
    return avatar;
}

const Contacts = () => {
    const [query, setQuery] = useState("");

    const filtredContacts = useMemo(() => {
        if (query === "") {
            return CONTACTS;
        }

        const filtred = CONTACTS.filter((contact) => {
            return contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
                contact.lastName.toLowerCase().includes(query.toLowerCase()) ||
                contact.email.toLowerCase().includes(query.toLowerCase()) ||
                contact.phone.toLowerCase().includes(query.toLowerCase());
        });

        return filtred;
    }, [query]);

    return (
        <Container maxWidth="lg" sx={{
            p: 2,
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{
                    mb: 2,
                }}>
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "flex-end",
                    }}>
                        <TextField
                            variant="outlined"
                            label="Search"
                            size="small"
                            InputProps={{
                                endAdornment: <SearchSharpIcon sx={{
                                    color: "action.active",
                                }} />,
                            }}
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                            value={query}
                        />
                        <Button sx={{
                            fontSize: "0.8rem",
                            pr: 4,
                            pl: 4,
                        }} size="small" variant="contained" color="primary">
                            Add Contact
                        </Button>
                    </Box>
                </Grid>
                {filtredContacts.map((contact) => (
                    <Grid item xs={12} sm={6} md={4} key={contact.id}>
                        <Paper sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                            <ContactLine
                                icon={<Avatar
                                    sx={{
                                        bgcolor: deepPurple[500],
                                    }}
                                >{contact.initials}</Avatar>}
                                value={`${contact.firstName} ${contact.lastName}`}
                            />
                            <ContactLine icon={<EmailSharpIcon />} value={contact.email} />
                            <ContactLine icon={<CallSharpIcon />} value={contact.phone} />

                            <Box sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "center",
                            }}>
                                <Button variant="outlined" fullWidth >
                                    Edit
                                </Button>
                                <Button color={"error"} variant="outlined" fullWidth>
                                    Delete
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Contacts;

const ContactLine = ({ icon, value }) => {
    return (
        <Box sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "start",
        }}>
            <Box>
                {icon}
            </Box>
            <Box>
                {value}
            </Box>
        </Box>
    )
}