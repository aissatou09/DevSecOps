# SamaSmile

**SamaSmile** est une plateforme web sécurisée de gestion pour les cabinets dentaires au Sénégal. Elle permet aux professionnels de santé de gérer les dossiers patients, les rendez-vous, la messagerie interne, et bien plus.

## Technologies utilisées

- **Frontend**: React.js
- **Backend**: Python (Django)
- **Base de données**: MySQL
- **Sécurité**: HTTPS, AES, 2FA
- **CI/CD**: GitHub Actions

## Installation locale

### Backend

```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
