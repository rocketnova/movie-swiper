import { Server } from 'socket.io';
import { Participant, SocketCallback } from '../types';
import { AddedMovie } from '../types/movies';

module.exports = (io: Server) => {
    const addMovie = function (
        data: { roomId: string; movie: AddedMovie },
        callback: SocketCallback
    ) {
        try {
            io.in(data.roomId).emit('movie:add', {
                movie: data.movie,
            });

            callback({
                success: true,
                data: { movieId: data.movie.id },
            });
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: `Failed to add movie: ${data.movie.title}`,
            });
        }
    };

    const removeMovie = function (
        data: { roomId: string; movieId: number },
        callback: SocketCallback
    ) {
        try {
            console.log('removed movie: ', data.movieId);

            io.in(data.roomId).emit('movie:remove', {
                movieId: data.movieId,
            });

            callback({
                success: true,
                data: { movieId: data.movieId },
            });
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: `Failed to add movie: ${data.movieId}`,
            });
        }
    };

    const swipeMovie = function (data: {
        roomId: string;
        movieId: number;
        liked: boolean;
        user: Participant;
    }) {
        try {
            console.log('swiped', data.liked, data.user.name);
            io.in(data.roomId).emit('movie:swipe', {
                movieId: data.movieId,
                liked: data.liked,
                user: data.user,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return { addMovie, removeMovie, swipeMovie };
};
