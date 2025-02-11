import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMoviePreview } from '../../../context/MoviePreviewContext';
import useMovieManager from '../../../hooks/useMovieManager';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { genres as genreObjects } from '../MovieSearch/genres';
import {
    ButtonContainer,
    GenreContainer,
    Image,
    InfoContainer,
    InfoIcon,
    Item,
    MinusIcon,
    Overview,
    PlusIcon,
    SeeMoreButton,
    SmallGenre,
    Title,
} from './styled';

interface Props {
    movie: AddedMovie;
    allowActions: boolean;
}

const MovieListItem = ({ movie, allowActions }: Props) => {
    const { setMoviePreview } = useMoviePreview();
    const history = useHistory();
    const { movieInList, movieActionHandler, buttonBackgroundColor } = useMovieManager(movie);
    const genres = movie.genre_ids.map((genreId) => genreObjects.find((g) => g.id === genreId));

    const onMovieAction = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        movieActionHandler();
    };

    const onMovieClick = () => {
        const { pathname } = history.location;
        if (pathname.includes(movie.id.toString())) {
            setMoviePreview(null);
        } else {
            setMoviePreview(movie);
        }
    };

    return (
        <Item onClick={onMovieClick} role="button">
            {allowActions && (
                <ButtonContainer onClick={onMovieAction} backgroundColor={buttonBackgroundColor}>
                    {!movieInList && <PlusIcon />}
                    {movieInList && <MinusIcon />}
                </ButtonContainer>
            )}
            <Image src={generateImageUrl(movie.poster_path, 'w342')} alt={movie.title} />{' '}
            <InfoContainer>
                <Title>{movie.title}</Title>
                <GenreContainer>
                    {genres?.slice(0, 2).map((genre) => (
                        <SmallGenre key={genre?.id}>{genre?.name}</SmallGenre>
                    ))}
                </GenreContainer>
                <Overview>{movie.overview}</Overview>
                <SeeMoreButton onClick={onMovieClick}>
                    <InfoIcon />
                    See More
                </SeeMoreButton>
            </InfoContainer>
        </Item>
    );
};

export default MovieListItem;
