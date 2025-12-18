import express from "express";

const app = express();

const Port = process.env.Port || 3000 ;


app.listen(Port , () => {
    console.log(`Server is running on port ${Port}`);
});