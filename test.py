from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    def setUp(self):
        """Set this up before testing"""
        app.config['TESTING'] = True

    # TODO -- write tests for every view function / feature!
    def test_index(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('board', session)
            # self.assertIn(html, '')

    # def test_submit_word_request(self):
    #     with app.test_client() as client:
    #         res = client.get('/check-word')

    #         self.assertEqual(res.status_code, 200)

    def test_valid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as session:
                session['board'] = [["B", "A", "N", "T", "T"],
                                    ["B", "A", "N", "T", "T"],
                                    ["B", "A", "N", "T", "T"],
                                    ["B", "A", "N", "T", "T"],
                                    ["B", "A", "N", "T", "T"]]
            res = client.get('/check-word?guess=ant')
            self.assertEqual(res.json['result'], 'ok')
