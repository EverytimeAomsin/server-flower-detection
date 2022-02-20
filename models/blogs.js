//ชื่อบทความ (title) , เนื้อหาบทความ (content) ,ผู้เขียน (author),slug(url)
const mongoose = require("mongoose")

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:{},
        required:true
    },
    intro:{
        type:String,
        default:"Admin"
    },
    author:{
        type:String,
        default:"Admin"
    },
    properties:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)