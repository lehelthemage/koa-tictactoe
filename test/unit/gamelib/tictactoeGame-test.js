"use strict";

import {expect} from 'chai';
import TicTacToeGame from '../../../src/gamelib/tictactoeGame';
import Persistence from '../../../src/gamelib/base/persistence';


var getNewGame = ()=> {
    try {
        return new TicTacToeGame(new Persistence('mongodb://blah'));
    } catch(err) { throw err; }
};

describe('TicTacToeGame', function() {
    describe('constructor', function () {
        it('should return a TicTacToeGame object', function() {
            expect(getNewGame().constructor.name).to.equal('TicTacToeGame');
        });

        it('should not be able to create more than one game', function () {
            expect(getNewGame).to.throw(Error);
        });

        it('should have two players', function() {
            let game = TicTacToeGame.gameInstance;
            expect(game.Players.length).to.equal(2);
        });
    });

    describe('getPlayerByIndex', function() {
        it('should return a Player object for Player id of 0 or 1', function() {
            let game = TicTacToeGame.gameInstance;
            let player1 = game.getPlayerByIndex(0);
            expect(player1).to.exist;
            expect(player1.constructor.name).to.equal('Player');
        });
    });

    describe('registerPlayer', function() {
        it('should register first ip address as player 1', function() {
            let game = TicTacToeGame.gameInstance;
            let ip = "1.1.1.1";
            game.registerPlayer(ip);
            expect(game.getPlayerByIndex(TicTacToeGame.PLAYER_ONE)).to.exist;
            expect(game.getPlayerByIndex(TicTacToeGame.PLAYER_ONE).ipAddress).to.equal(ip);
        });
    });
});
