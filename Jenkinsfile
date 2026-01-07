pipeline {
    agent any

    stages {
        stage('Git pull') {
            steps {
                git branch: 'main', url: 'https://github.com/anuragsroy/system-monitor-prometheus.git'
            }
        }
        stage('Docker compse run') {
            steps {
                bat 'docker-compose up -d'
            }
        }
    }
}
