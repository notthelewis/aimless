from flask import Flask, request, send_from_directory, render_template
import flask_restful
import flask_sqlalchemy
import flask_jwt_extended
import flask_cors
from needs_auth import needs_auth
from wide_open import wide_open

app = Flask(__name__)

class router:
	def __inint__(self):
		self.load_routes()

	def load_routes(self):
		self.auth = needs_auth()
		self.wide_open = wide_open()

	def get_auth(self):
		return self.auth.auth()

	def get_open(self):
		return self.wide_open.open()


