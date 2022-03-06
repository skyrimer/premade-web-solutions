from flask import Flask, render_template, abort, send_from_directory, request
from os import getcwd
from os.path import isfile
from os.path import join as join_path
app = Flask(__name__)
if app.debug == True:
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


def get_tutorial_title(string: str) -> str:
    return " ".join(string.split("-")).capitalize()


@app.errorhandler(404)
def code_404(error):
    return render_template("404.html", title="Pre-made web solutions"), 404


@app.route("/")
@app.route("/home")
def home():
    title = 'Pre-made web solutions'
    return render_template("index.html", title=title, heading=title)


@app.route("/tutorials")
def tutorials():
    title = "All tutorials"
    return render_template("tutorials.html", title=title, heading=title)


@app.route("/helpful-websites")
def helpful_websites():
    title = "Helpful websites"
    return render_template("helpful_websites.html", title=title, heading=title)


@app.route("/examples/<string:example>")
def examples(example):
    if not isfile(join_path(getcwd(), "templates", "examples", f"{example}.html")):
        abort(404)
    return render_template(f"/examples/{example}.html", title=get_tutorial_title(example))


@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run(debug=True)
