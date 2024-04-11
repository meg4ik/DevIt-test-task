# Project Name

Short description of the project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


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

