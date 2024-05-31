// const express = require("express")
// const request = require("request")
// const cors = require("cors")
// const app = express()

// app.use(cors())
// app.use(express.json())

// app.post("/proxy", (req, res) => {
//   const url =
//     "https://docs.google.com/forms/d/e/1FAIpQLScr7qb4fdEuI39_R0rZoFP8AhUizZ__WLXMHMzyXElkct3mSg/formResponse"
//   const formData = {
//     "entry.904886241": req.body.email // Thay đổi ID này thành Entry ID của Google Form
//   }
//   post({ url, form: formData }, (error, response, body) => {
//     if (error) {
//       return res.status(500).send(error)
//     }
//     res.send(body)
//   })
// })

// app.listen(4100, () => {
//   console.log("Proxy server running on port 4000")
// })
