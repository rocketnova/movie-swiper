import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SwiperCore, { A11y, EffectCoverflow, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper imports
import 'swiper/swiper-bundle.min.css';
import { CoverflowEffectOptions } from 'swiper/types/components/effect-coverflow';
import { PaginationOptions } from 'swiper/types/components/pagination';
import FixedContainer from '../../../components/FixedContainer';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { swipeMovie } from '../../../sockets/emitters';
import { AddedMovie } from '../../../types/movies';
import SwipeItem from '../SwipeItem';
import { DislikeButton, DislikeIcon, LikeButton, LikeIcon } from './style';

SwiperCore.use([Pagination, A11y, EffectCoverflow, EffectFade]);

const coverFlowEffectProps: CoverflowEffectOptions = {
    rotate: 50,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
};

const paginationProps: PaginationOptions = {
    clickable: false,
    type: 'progressbar',
    progressbarFillClass: 'swiper-pagination-progressbar-fill',
};

interface MovieToSwipe extends AddedMovie {
    swiped: boolean;
}

const SwipeArea = () => {
    const history = useHistory();
    const { room } = useRoom();
    const { user } = useUser();
    const [swiper, setSwiper] = useState<SwiperCore>();
    const movies = useRef<MovieToSwipe[]>([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        movies.current = room.movies.map((movie) => ({ ...movie, swiped: false }));
    }, [room.movies.length]);

    const enableButtons = () => {
        setDisabled(false);
    };

    const disableButtons = () => {
        setDisabled(true);
    };

    const onLike = () => {
        if (!swiper) {
            return;
        }

        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex);
    };

    const onDislike = () => {
        if (!swiper) {
            return;
        }

        const movieIndex = swiper.activeIndex - 1;
        handleSwipeEmit({ index: movieIndex, liked: false });
        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex, 400);
    };

    const onSlideNextTransitionStart = (swiper: SwiperCore) => {
        disableButtons();

        /* Ignore slideNext on init */
        if (!swiper || swiper.activeIndex === 1) {
            return;
        }

        const movieIndex = swiper.previousIndex - 1;
        handleSwipeEmit({ index: movieIndex, liked: true });

        swiper.updateProgress();
        swiper.update();
    };

    const onSlidePrevTransitionStart = (swiper: SwiperCore) => {
        disableButtons();

        if (!swiper) {
            return;
        }

        const movieIndex = swiper.previousIndex - 1;
        handleSwipeEmit({ index: movieIndex, liked: false });

        const nextIndex = swiper.activeIndex + 2;
        swiper.slideTo(nextIndex, 100);
        swiper.update();
        swiper.updateProgress();
    };

    const onSwiperInit = (swiper: SwiperCore) => {
        const actualProgress = 1 / room.movies.length;
        document.documentElement.style.setProperty('--swipe-progress', actualProgress.toString());
        setSwiper(swiper);
    };

    const onProgress = (swiper: SwiperCore) => {
        const actualProgress = (1 / room.movies.length) * swiper.activeIndex;
        document.documentElement.style.setProperty('--swipe-progress', actualProgress.toString());
    };

    const handleSwipeEmit = ({ index, liked }: { index: number; liked: boolean }) => {
        const movie = movies.current[index];
        if (!movie || movie.swiped) {
            return;
        }

        movies.current = movies.current.map((m) => (m.id === movie.id ? { ...m, swiped: true } : m));
        swipeMovie({ roomId: room.roomId as string, movieId: movie.id, liked, user });
    };

    const onSlideNextTransitionEnd = (swiper: SwiperCore) => {
        enableButtons();

        if (swiper.activeIndex > room.movies.length) {
            history.push(`/results/${room.roomId}`);
        }
    };

    return (
        <>
            {!!room.movies.length && (
                <Swiper
                    onSlidePrevTransitionStart={onSlidePrevTransitionStart}
                    onSlideNextTransitionStart={onSlideNextTransitionStart}
                    onSlidePrevTransitionEnd={enableButtons}
                    onSlideNextTransitionEnd={onSlideNextTransitionEnd}
                    onProgress={onProgress}
                    onInit={onSwiperInit}
                    initialSlide={1}
                    speed={400}
                    observer
                    grabCursor
                    centeredSlides
                    spaceBetween={5000}
                    effect="coverflow"
                    coverflowEffect={coverFlowEffectProps}
                    pagination={paginationProps}
                >
                    <SwiperSlide key="firstSlide"></SwiperSlide>
                    {room.movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <SwipeItem movie={movie} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide key="lastSlide"></SwiperSlide>
                </Swiper>
            )}
            <FixedContainer position="fixed">
                <DislikeButton onClick={onDislike} disabled={disabled}>
                    <DislikeIcon />
                    Dislike
                </DislikeButton>
                <LikeButton onClick={onLike} disabled={disabled}>
                    <LikeIcon />
                    Like
                </LikeButton>
            </FixedContainer>
        </>
    );
};

export default SwipeArea;
