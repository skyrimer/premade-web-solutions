from flask import Flask, render_template

app = Flask(__name__)
if app.debug == True:
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.errorhandler(404)
def code_404(e):
    return render_template("404.html", title="Pre-made web solutions"), 404


@app.route("/")
def home():
    text = 'Pre-made web solutions'
    return render_template("index.html", title=text, heading=text)


@app.route("/tutorials")
def tutorials():
    text = "All tutorials"
    return render_template("tutorials.html", title=text, heading=text)


@app.route("/helpful-websites")
def helpful_websites():
    text = "Helpful websites"
    return render_template("helpful_websites.html", title=text, heading=text)


@app.route("/examples/<string:example>")
def examples(example):
    return render_template(f"examples/{example}.html", title=example)


if __name__ == "__main__":
    app.run(debug=True)
