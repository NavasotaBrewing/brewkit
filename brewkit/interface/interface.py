from flask import Flask, render_template, redirect

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='{%',
        block_end_string='%}',
        variable_start_string='%%',
        variable_end_string='%%',
        comment_start_string='<#',
        comment_end_string='#>',
    ))

app = CustomFlask(__name__)

@app.route('/dashboard')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/configure')
def configuration():
    return render_template('configure.html')

@app.route('/procedures')
def procedures():
    return redirect('/')

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', 5000)
