import Colors from '../constants/Colors';
import Game from '../models/game';

export const GAMES = [
new Game(
'g1', 
'Swall',
require('../images/gamesIcons/swallIcon.png'),
Colors.Turqiose,
"2-20",
"The ultimate drinking game created to turn a standard night into a wild one, here you can find a range of different cards all with the purpose to get you both incredibly drunk and vulnerable.\n\nWho fancies a swall tonight?"),

new Game(
'g2', 
'Never Have I Ever',
require('../images/gamesIcons/neverIcon.png'),            
Colors.Purple, 
"2-4",
"A game with simple rules and exciting results. If your looking to find out your friends most embarrassing and hidden secrets (whilst getting them drunk) then look no further."),

new Game(
'g3', 
'5 Seconds',
require('../images/gamesIcons/fiveSecondsIcon.png'),            
Colors.Red, 
"2-4",
"Taking turns each Player is asked a question, in which they have only 5 seconds to answer, the player must give 3 legit answers.\n\nCan you handle the pressure?"), 

new Game(
'g4', 
'Kings Cup', 
require('../images/kingsIcons/backIcons/kingIcon.png'), 
Colors.Gold, 
"2-20",           
"A classic drinking game perfect for large groups looking to have fun, be silly and get drunk!\n\nBeware of the King..."),

new Game(
'g5', 
'Most Likely To',
require('../images/gamesIcons/mostLikelyIcon.png'),
Colors.Lime, 
"2-8",
"A fun and silly game perfect for having a laugh or getting to know and tease your friends.\n\n You're most likely to enjoy it."),
]