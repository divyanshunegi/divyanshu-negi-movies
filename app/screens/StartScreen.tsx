import {RouteProp} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, FlatList, Alert} from 'react-native';
import {useValue} from 'react-native-redash';

import Modal from '@components/Modal';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';
import DataManager from 'app/manager/DataManager';
import Placeholder from '@components/Placeholder';

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
    const [isLoading, setLoading] = useState<boolean>(false);
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        setLoading(true);
        const movieResult = await DataManager.getMovies(4, 10, 5);
        if (movieResult.status === 200) {
            setMovies(movieResult.movies);
        } else {
            showConfirmDialog();
        }
        setLoading(false);
    };

    const showConfirmDialog = () => {
        Alert.alert(
            'Network Error',
            'Failed to get latest movies, you want to try again ?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Try Again',
                    onPress: () => getMovies(),
                },
            ],
            {cancelable: true},
        );
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

    if (isLoading) {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                  <Placeholder />
                </SafeAreaView>
            </>
        );
    }

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
