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


# @app.route('/input-guess')
# def input_guess():
#     """inputs guess into server"""
#     guess = request.args['guess']
#     session["guess"] = guess
#     return redirect('/')


@app.route('/check-word', methods=['POST'])
def check_word_request():
    """Check users input if word exists"""
    guess = request.json["guess"]
    if guess in session.get('words', []):
        return jsonify({"result": "already-handled"})
    board = session["board"]

    print(f"**********{board}***********")
    print(f"THIS IS GUESS**********{guess}***********")
    response = boggle_game.check_valid_word(board, guess)
    if response == 'ok':
        valid_words = session.get('words', [])
        valid_words.append(guess)
        session['words'] = valid_words
    return jsonify({"result": response})
