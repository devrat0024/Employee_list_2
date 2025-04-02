# Employee Management System

## Overview
This is a Flask-based Employee Management System that allows users to manage employee records through a web interface. The system includes features such as adding employees, viewing employee lists, and navigating through different dashboard functionalities.

## Project Structure
```
project-folder/
├── employee.py                # Main Flask application
├── static/                    # Static files (CSS, JavaScript, Images)
│   ├── styles.css             # CSS file for styling
│   ├── script.js              # JavaScript file for client-side operations
├── templates/                 # HTML Templates
│   ├── index.html             # Homepage
│   ├── dashboard.html         # Dashboard page
├── README.md                  # Project documentation
├── requirements.txt           # Dependencies
```

## Features
- Home Page (`index.html`)
- Dashboard Page (`dashboard.html`)
- Employee Registration
- Employee List Viewing
- Frontend: HTML, CSS, JavaScript
- Backend: Flask (Python)

## Setup Instructions
### Prerequisites
Ensure you have Python 3 installed. You also need to install Flask:
```sh
pip install flask
```

### Running the Application
1. Navigate to the project folder:
   ```sh
   cd path/to/project-folder
   ```
2. Run the Flask app:
   ```sh
   python employee.py
   ```
3. Open your browser and go to:
   ```
   http://127.0.0.1:5000/
   ```

## Troubleshooting
### TemplateNotFound Error
If you encounter a `jinja2.exceptions.TemplateNotFound` error, ensure that:
- Your `templates/` folder contains `index.html` and `dashboard.html`.
- You are running Flask from the correct directory.
- Your `employee.py` correctly references the `templates` folder:
  ```python
  app = Flask(__name__, template_folder="templates")
  ```

## License
This project is open-source and free to use under the MIT License.

