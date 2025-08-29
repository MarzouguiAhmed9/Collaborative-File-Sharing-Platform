import os
from flask import Flask, jsonify

app = Flask(__name__)

EFS_PATH = "/mnt/efs"

@app.route("/list-files", methods=["GET"])
def list_files():
    try:
        files = os.listdir(EFS_PATH)   # list all files in EFS
        return jsonify({"files": files})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
