import axios from 'axios';


export const getUsers = () => {
    return axios.get('/api/user/matched')
}

export const getMe = () => {
    return axios.get('/api/user/me')
}

export const saveMovie = movieData => {
    return axios.post('/api/user',
        movieData);
};


export const getSavedMovies = () => {
    return axios.get('/api/user');
};


export const removeMovie = movieId => {
    return axios.delete(`/api/user/${movieId}`);
};


export const recMovies = movieId => {
    const pageArray = [1, 2, 3];
    const pageArrayRandom = Math.floor(Math.random() * pageArray.length) + 1;
    console.log(movieId);
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
        params: {
            movieId: movieId,
            api_key: "7bc99c9ee75ec56de6b188d9007199dc",
            language: "en-US",
            page: pageArrayRandom
        }
    })
}


export const searchTmdb = query => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=&page=1`, {
        params: {
            query: query,
            api_key: "7bc99c9ee75ec56de6b188d9007199dc"
        }
    });
};

export default {
    saveMovie,
    getSavedMovies,
    removeMovie,
    searchTmdb,
    recMovies,
    getUsers
}