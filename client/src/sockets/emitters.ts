import { socket } from '.';
import { AddedMovie } from '../types/movies';
import { SocketResponse } from '../types/socket';
import { Participant } from './../../../server/src/types/index';

export const createRoom = (
    data: { roomId: string | null },
    callback: (res: SocketResponse<{ roomId: string }>) => void,
) => {
    socket.emit('room:create', data, callback);
};

export const checkRoom = (data: { roomId: string }, callback: (res: SocketResponse<{ roomId: string }>) => void) => {
    socket.emit('room:check', data, callback);
};

export const joinRoom = (
    data: { roomId: string; user: Participant },
    callback: (res: SocketResponse<{ roomId: string }>) => void,
) => {
    socket.emit('room:join', data, callback);
};

export const changeRoomOwner = (data: { roomId: string; userId: string }) => {
    socket.emit('room:owner-change', data);
};

export const addMovie = (
    data: { roomId: string; movie: AddedMovie },
    callback: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:add', data, callback);
};

export const removeMovie = (
    data: { roomId: string; movieId: number },
    callback: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:remove', data, callback);
};

export const swipeMovie = (
    data: { roomId: string; movieId: number; liked: boolean; user: Participant },
    callback?: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:swipe', data, callback);
};

export const toggleReady = (
    data: { roomId: string; userId: string },
    callback?: (res: SocketResponse<{ userId: string }>) => void,
) => {
    socket.emit('user:ready', data, callback);
};

export const changeName = (data: { roomId: string; userId: string; name: string }) => {
    socket.emit('user:name-change', data);
};

export const startSwiper = (data: { roomId: string }, callback?: (res: SocketResponse<{ roomId: string }>) => void) => {
    socket.emit('swiper:start', data, callback);
};
