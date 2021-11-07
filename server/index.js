const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.



app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["Tough love only works when there is as much love as there is tough.",
  "If you want the rainbow, you gotta put up with the rain!",
  "It is never too late to be what you might have been.",
  "You are your best thing.",
  "It takes courage to grow up and become who you really are."
];

  // choose random fortune
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
  
});
///////////////////////////////////////

///////////////////////////////////////
app.listen(4000, () => console.log("Server running on 4000"));
