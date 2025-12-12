const topfy = require("./topfyInstance")

exports.home = (req, res) => {
  const popularMusics = topfy.getMostPopular(6)

  res.render("home", {
    title: "TOPFY",
    popularMusics: popularMusics,
  })
}
