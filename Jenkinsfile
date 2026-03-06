pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    BACKEND_CONTAINER = "gestor-afiliados-backend"
    FRONTEND_CONTAINER = "gestor-afiliados-frontend"
    BACKEND_IMAGE = "gestor-afiliados/backend:latest"
    FRONTEND_IMAGE = "gestor-afiliados/frontend:latest"
  }

  stages {
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
          docker build --no-cache -t "$BACKEND_IMAGE" ./backend
          docker build --no-cache -t "$FRONTEND_IMAGE" ./frontend

          docker rm -f "$BACKEND_CONTAINER" >/dev/null 2>&1 || true
          docker rm -f "$FRONTEND_CONTAINER" >/dev/null 2>&1 || true

          docker run -d \
            --name "$BACKEND_CONTAINER" \
            --restart unless-stopped \
            --env-file backend/.env \
            -p 3021:3021 \
            "$BACKEND_IMAGE"

          docker run -d \
            --name "$FRONTEND_CONTAINER" \
            --restart unless-stopped \
            --add-host backend:host-gateway \
            -p 3020:3020 \
            "$FRONTEND_IMAGE"

          docker ps --filter "name=$BACKEND_CONTAINER" --filter "name=$FRONTEND_CONTAINER"
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
      sh '''
        set +e
        docker logs --tail=200 "$BACKEND_CONTAINER" || true
        docker logs --tail=200 "$FRONTEND_CONTAINER" || true
      '''
    }
  }
}
