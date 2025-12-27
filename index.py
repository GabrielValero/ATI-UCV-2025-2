import os
import json
import traceback
from urllib.parse import parse_qs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def application(environ, start_response):
    path = environ.get("PATH_INFO", "/")
    query = parse_qs(environ.get("QUERY_STRING", ""))
    try:
        # Vistas
        if path.rstrip("/") == "/ATI/index.py":
            return serve_html("index.html", start_response)

        # API
        if path.rstrip("/") == "/api/data":
            json_path = os.path.join(BASE_DIR, "static/datos/index.json")
            language = query.get("lang", ["ES"])[0]

            if language not in ["ES", "EN", "PT"]:
                language = "ES"

            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            start_response(
                "200 OK",
                [("Content-Type", "application/json")]
            )
            response_body = {"data": data,
                             "config": get_language_data(language)}
            return [json.dumps(response_body).encode("utf-8")]

        if path.rstrip("/") == "/api/perfil":
            user_id = query.get("ci", [""])[0]
            return serve_profile_json(user_id, start_response)

        start_response(
            "404 Not Found",
            [("Content-Type", "text/plain")]
        )
        return [b"Not Found"]

    except Exception:
        start_response(
            "500 Internal Server Error",
            [("Content-Type", "text/plain")]
        )
        return [traceback.format_exc().encode("utf-8")]


def serve_html(filename, start_response):
    path = os.path.join(BASE_DIR, "static/"+filename)

    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    start_response(
        "200 OK",
        [("Content-Type", "text/html; charset=utf-8")]
    )
    return [html.encode("utf-8")]


def serve_profile_json(user_id, start_response):
    json_path = os.path.join(BASE_DIR, f"static/{user_id}/perfil.json")

    with open(json_path, "r", encoding="utf-8") as f:
        user = json.load(f)

    if not user:
        start_response(
            "404 Not Found",
            [("Content-Type", "application/json")]
        )
        return [b'{"error": "User not found"}']

    start_response(
        "200 OK",
        [("Content-Type", "application/json")]
    )
    return [json.dumps(user).encode("utf-8")]


def get_language_data(language):
    language_path = os.path.join(
        BASE_DIR, f"static/conf/config{language}.json")
    with open(language_path, "r", encoding="utf-8") as f:
        return json.load(f)
