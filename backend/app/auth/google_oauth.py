import requests

def verify_google_token(token: str):
    response = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}")
    if response.status_code != 200:
        return None
    return response.json()
