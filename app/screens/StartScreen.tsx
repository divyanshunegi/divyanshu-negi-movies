import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, FlatList} from 'react-native';
import {useValue} from 'react-native-redash';

import Modal from '@components/Modal';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';
import DataManager from 'app/manager/DataManager';

interface ModalState {
    movie: MovieType;
    position: PositionType;
}

type StartParamList = {
    Start: {
        movies: Array<MovieType>;
    };
};

type StartRoute = RouteProp<StartParamList, 'Start'>;

const StartScreen = () => {
    const [movies, setMovies] = useState<Array<MovieType>>([]);
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        const movieResult = await DataManager.getMovies(4, 10, 5);
        if (movieResult.status === 200) {
            setMovies(movieResult.movies);
        } else {
            alert('Failed, to get movies list from Server');
        }
    };

    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({movie, position});
    };

    const close = () => {
        activeMovieId.setValue(-1);
        setModal(null);
    };

    const renderMovies = (movie: MovieType, index: number) => {
        return (
            <Movie
                activeMovieId={activeMovieId}
                key={movie.id}
                index={index}
                movie={movie}
                open={open}
            />
        );
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <FlatList
                    data={movies}
                    renderItem={(movie) =>
                        renderMovies(movie.item, movie.index)
                    }
                />
                {modal !== null && <Modal {...modal} close={close} />}
            </SafeAreaView>
        </>
    );
};

export default StartScreen;
