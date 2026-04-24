const { MovieRepo } = require("../repositories");

const movieRepo = new MovieRepo()


const createMovie = async (data)=>{
    console.log(data , "data from service")
    // validation of fields main business logic
    const movie = await movieRepo.createMovie(data)
    return movie
}

const getAllMovies = async({query})=>{
    const filter = {}
    const limit = parseInt(query?.limit )|| 10
    const page = parseInt(query?.page )|| 1

    if(query?.name){
         filter.name = query?.name
    }

    console.log(filter , "service filter")

    const movie = await movieRepo.getAllMovies(filter , limit , page)
    return movie
}

module.exports = { 
    createMovie,
    getAllMovies
}