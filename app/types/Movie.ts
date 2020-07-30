import type Review from './Review';
import Cast from './Cast';

export default interface Movie {
    id?: string;
    name: string;
    poster: string;
    gender: string;
    description: string;
    reviews?: Array<Review>;
    casts?: Array<Cast>;
}
