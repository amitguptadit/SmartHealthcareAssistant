import os
from flask import Flask,  flash,request, redirect, render_template,abort, jsonify, send_from_directory, send_file
from flask_cors import cross_origin, CORS
from flask_crossdomain import crossdomain
from werkzeug.utils import secure_filename

app= Flask(__name__)
CORS(app)
@app.route("/",method=["GET"])
def get_report():
    try:
        print("GET REPORTS")
    except Exception as ex:
        print(ex)
pass




