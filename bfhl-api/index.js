const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("BFHL API is running!");
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array.",
      });
    }

    const fullName = "shubham_pandey"; 
    const dob = "06112004"; 
    const email = "shubham.pandey2022@vitstudent.ac.in";
    const rollNumber = "22BCE1934";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));
    const specialChars = data.filter(item => !/^[A-Za-z0-9]+$/.test(item));

    const evenNumbers = numbers.filter(num => parseInt(num) % 2 === 0).map(String);
    const oddNumbers = numbers.filter(num => parseInt(num) % 2 !== 0).map(String);
    const upperAlphabets = alphabets.map(a => a.toUpperCase());

    const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0).toString();

    const concatString = alphabets
      .reverse()
      .join("")
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: upperAlphabets,
      special_characters: specialChars,
      sum,
      concat_string: concatString,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
