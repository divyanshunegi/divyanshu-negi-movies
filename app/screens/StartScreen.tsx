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
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        setLoading(true);
        const movieResult = await DataManager.getMovies();
        if (movieResult.length > 0) {
            setMovies(movieResult);
        } else {
            showConfirmDialog(
                'Failed to get latest movies, you want to try again ?',
                getMovies,
            );
        }
        setLoading(false);
    };

    const showConfirmDialog = (message: string, fn: any) => {
        Alert.alert(
            'Network Error',
            message,
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Try Again',
                    onPress: () => fn(),
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

    const loadMoreMovies = async () => {
        const movieResult = await DataManager.getMoreMovies();
        if (movieResult.error) {
            showConfirmDialog(
                'Failed to load more content from server, try again',
                loadMoreMovies,
            );
        } else {
            setMovies(movieResult.movies);
        }
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
                    onEndReachedThreshold={2}
                    onEndReached={loadMoreMovies}
                />
                {modal !== null && <Modal {...modal} close={close} />}
            </SafeAreaView>
        </>
    );
};

export default StartScreen;
