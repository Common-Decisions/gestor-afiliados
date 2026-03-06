pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    COMPOSE_PROJECT_NAME = "gestor-afiliados"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Inject Backend Env') {
      steps {
        withCredentials([file(credentialsId: 'gestor-afiliados-backend-env', variable: 'BACKEND_ENV_FILE')]) {
          sh '''
            set -eu
            cp "$BACKEND_ENV_FILE" backend/.env
          '''
        }
      }
    }

    stage('Build and Deploy') {
      steps {
        sh '''
          set -eu
          docker compose down --remove-orphans || true
          docker compose build --no-cache
          docker compose up -d
          docker compose ps
        '''
      }
    }
  }

  post {
    always {
      sh '''
        set +e
        rm -f backend/.env
      '''
    }
    failure {
      sh 'docker compose logs --tail=200 || true'
    }
  }
}
