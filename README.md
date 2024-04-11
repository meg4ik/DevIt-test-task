# Project Name

Article Management

## Getting Started

Task:
'mplement an article management project. Articles should be parsed on schedule form RSS feeds (any of your choice). Articles are managed (CRUD) in the admin panel, access to the admin panel must be closed by authorization. There should also be a public route that displays a list of articles with pagination/sorting/search.'

Languages: TypeScript(JS) and Python
Backend framework: Django, DRF
DB: PostgreSQL, Redis
API Protocol: REST
Auth: JWT
Additional: Celery, Celery Beat

Backend framework: NextJS
Forms: Formik
UI: Tailwind CSS

Environment: Docker, Docker Compose


### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your_username/your_project.git
    ```

2. Change directory to the project folder:

    ```bash
    cd your_project
    ```

3. Create .env file based on .env_example in /BACK directory

4. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

### Usage

1. Access the shell of the Django container:

    ```bash
    docker exec -it <container_id> sh
    ```

2. Create a superuser for Django:

    ```bash
    python manage.py createsuperuser
    ```

3. Follow the prompts to enter a username, email address, and password for the superuser to access admin panel.

