import express from "express"
import { engine } from "express-handlebars"
import path from "path"
 
const PORT = process.env.PORT || 3001
const app = express()

app.engine("handlebars", engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))


app.get("/", (req, res) => {
	res.render("home")
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})
