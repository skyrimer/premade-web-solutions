from flask import Flask, render_template, abort, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import select
from flask_view_counter import ViewCounter
from os import getcwd, environ
from os.path import isfile
from os.path import join as join_path
from typing import Counter
from json import load as json_load
app = Flask(__name__)
app.config["SECRET_KEY"] = environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
with app.app_context():
    view_counter = ViewCounter(app, db)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


class FeedbackModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    feedback = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"FeedbackModel(id={self.name}, name={self.name}, email={self.email})"


def get_views_table(db: SQLAlchemy, view_counter: ViewCounter):
    return db.engine.execute(select([view_counter.requests]))


def get_tutorial_title(string: str) -> str:
    return " ".join(string.split("-")).capitalize()


def getDataFromJson(path="static/tutorials.json"):
    with open(path, "r") as tutorials:
        return json_load(tutorials)


def getTutorials(path="static/tutorials.json"):
    return getDataFromJson(path)


def getHelpfulWebsites(path="static/helpful-websites.json"):
    return getDataFromJson(path)


@app.errorhandler(404)
def code_404(error):
    return render_template("404.html", title="PreWeb - Not Found"), 404


@app.route("/")
@app.route("/home")
@view_counter.count
def home():
    return render_template("index.html", title="Pre-made web")


@app.route('/about')
@view_counter.count
def about():
    tutorials = getTutorials()
    return render_template("about.html", tutorials=tutorials, title="PreWeb - About")


@app.route("/tutorials")
@view_counter.count
def tutorials():
    tutorials = getTutorials()
    return render_template("tutorials.html", tutorials=tutorials, title="PreWeb - Tutorials")


@app.route("/helpful-websites")
@view_counter.count
def helpful_websites():
    websiteList = getHelpfulWebsites()
    return render_template("helpful_websites.html", websiteList=websiteList, title="PreWeb - Helpful websites")


@app.route("/contact", methods=["GET", "POST"])
@view_counter.count
def contact():
    title = "PreWeb - Feedback page"
    if request.method == "GET":
        return render_template("contact.html", title=title)
    data = request.get_json(force=True)
    db.session.add(FeedbackModel(name=data["name"],
                                 email=data["email"],
                                 feedback=data["feedback"]))
    db.session.commit()
    return render_template("contact.html", title=title)


@app.route("/examples/<string:example>")
@view_counter.count
def examples(example):
    if not isfile(join_path(getcwd(), "templates", "examples", f"{example}.html")):
        abort(404)
    return render_template(f"/examples/{example}.html",
                           title=f"PreWeb - {get_tutorial_title(example)}")


@app.route('/robots.txt')
@app.route('/sitemap.xml')
@app.route('/serviceworker.js')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/admin')
def admin():
    total_views = len({view.ip for view in get_views_table(db, view_counter)})
    views_per_page = Counter(
        view.path for view in get_views_table(db, view_counter))
    feedback = FeedbackModel.query.all()
    return render_template("admin.html", total_views=total_views,
                           views_per_page=views_per_page, feedback=feedback, title="PreWeb - Admin Panel")


if __name__ == "__main__":
    app.run(debug=True)
