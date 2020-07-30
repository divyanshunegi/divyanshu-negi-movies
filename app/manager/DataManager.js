import generateMovies from '@utils/generate';

class DataManager {
    constructor() {
        this.API_CALL_LATENCY = 300;
        this.FAIL_PROBABILITY = 0.3; //this is the probability of failing mock calls, it could be from 0 - 1
    }

    getMovies = async (movieCount, ratingCount) => {
        const call = await this.simulateAPICall({
            method: 'get',
            movieCount,
            ratingCount,
        });
        return call;
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
        const fail_chance = false; //Math.random() < this.FAIL_PROBABILITY;
        const movies = {};
        if (!fail_chance) {
            movies.data = generateMovies(
                request.movieCount,
                request.ratingCount,
            );
        }
        return movies;
    };
}

export default new DataManager();
