const  express = require('express')
const router = express.Router()


const {uploadNewsLetter,getLatestNewsLetters,getAllNewsletters,getAlllatestNewsletters} = require("../controllers/newsLetterController")
const upload = require("../middleware/multerMiddleware")

router.post("/upload",
    upload.fields([{ name: "pdf", maxCount: 1 }, { name: "cover", maxCount: 1 }]), 
    uploadNewsLetter
);
  

router.get("/getLatest",getLatestNewsLetters);
router.get("/getAll",getAllNewsletters)
router.get("/getAllNewsLetters",getAlllatestNewsletters)


module.exports = router;