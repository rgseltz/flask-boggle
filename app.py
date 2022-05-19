from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret21"
DebugToolbarExtension(app)


# app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

boggle_game = Boggle()


@app.route('/')
def show_board():
    """Show the boggle board on the page"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('/index.html', board=board)


@app.route('/check-word')
def check_word_request():
    """Check users input if word exists"""
    guess = request.args["guess"]
    if guess in session.get('words', []):
        return jsonify({"result": "already-handled"})
    board = session["board"]
    response = boggle_game.check_valid_word(board, guess)
    if response == 'ok':
        valid_words = session.get('words', [])
        valid_words.append(guess)
        session['words'] = valid_words
    return jsonify({"result": response})


@app.route('/post-score', methods=['POST'])
def post_score():
    score = request.json['score']
    add_score = session.get('score', [])
    add_score.append(score)
    session['score'] = add_score
    print(f'$$$%%%%%{session["score"]}####$$$$&&&&')
    return jsonify(f'score: {score}')
