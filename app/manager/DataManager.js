const Realm = require('realm');
import generateMovies from '@utils/generate';

const ReviewSchema = {
    name: 'Review',
    properties: {
        id: {type: 'string', indexed: true},
        body: 'string',
    },
};

const CastSchema = {
    name: 'Cast',
    properties: {
        id: {type: 'string', indexed: true},
        name: 'string',
        picture: 'string',
        gender: 'string',
        role: 'string?',
    },
};

const MovieSchema = {
    name: 'Movie',
    properties: {
        id: {type: 'string', indexed: true},
        poster: 'string',
        name: 'string',
        gender: 'string',
        description: 'string',
        reviews: 'Review[]',
        casts: 'Cast[]',
    },
};

// 1- get local movies
// 2- if no movie locally make API call
// 3- make request on pagination to API and fill local DB
// 4- once local DB is updated callback makes the state refresh for flatlist
class DataManager {
    constructor() {
        this.API_CALL_LATENCY = 2000;
        this.FAIL_PROBABILITY = 0.3; //this is the probability of failing mock calls, it could be from 0 - 1
    }

    getMovies = async () => {
        let movies = await this.getLocalMovies();
        if (movies?.length > 0) {
            return movies;
        }
        const call = await this.simulateAPICall({
            method: 'get',
            castPerMovie: 5,
            movieCount: 10,
            ratingCount: 5,
        });
        if (call.status === 200) {
            let localMovies = await this.saveMovieInDB(call.movies);
            return localMovies;
        }
        return [];
    };

    getLocalMovies = async () => {
        let realm = await Realm.open({
            schema: [CastSchema, ReviewSchema, MovieSchema],
        });
        return realm.objects('Movie');
    };

    getMoreMovies = async () => {
        const call = await this.simulateAPICall({
            method: 'get',
            castPerMovie: 5,
            movieCount: 10,
            ratingCount: 5,
        });
        if (call.status === 200) {
            let localMovies = await this.saveMovieInDB(call.movies);
            return {error: false, movies: localMovies};
        }
        return {error: true};
    };

    saveMovieInDB = async (movies) => {
        let realm = await Realm.open({
            schema: [CastSchema, ReviewSchema, MovieSchema],
        });
        movies.forEach((movie) => {
            realm.write(() => {
                realm.create('Movie', {
                    id: movie.id,
                    name: movie.name,
                    poster: movie.poster,
                    gender: movie.gender,
                    description: movie.description,
                    reviews: movie.reviews,
                    casts: movie.casts,
                });
            });
        });
        let localMovies = [];
        localMovies = [...realm.objects('Movie')];
        return localMovies;
    };

    simulateAPICall = async (request) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (request.method) {
                    case 'get':
                        const movies = this.makeMovies(request);
                        if (movies.data) {
                            resolve({status: 200, movies: movies.data});
                        } else {
                            resolve({status: 404, message: 'Not Found'});
                        }
                        break;
                    case 'post':
                        //TODO handle post mock querries
                        break;
                    default:
                        resolve({status: 400, message: 'Bad Request'});
                }
            }, this.API_CALL_LATENCY);
        });
    };

    makeMovies = (request) => {
        const fail_chance = Math.random() < this.FAIL_PROBABILITY;
        const movies = {};
        if (!fail_chance) {
            movies.data = generateMovies(
                request.movieCount,
                request.ratingCount,
                request.castPerMovie,
            );
        }
        return movies;
    };
}

export default new DataManager();
