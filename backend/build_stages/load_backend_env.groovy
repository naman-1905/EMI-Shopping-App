// Backend build stage: load_backend_env.groovy
// Loads backend environment variables from Jenkins credentials

def call() {
    echo "========== Loading Backend Environment =========="
    
    withCredentials([file(credentialsId: 'backend_env', variable: 'BACKEND_ENV_FILE')]) {
        sh '''
            cd backend/app
            
            # Copy .env file
            cp $BACKEND_ENV_FILE .env
            
            if [ -f .env ]; then
                echo "✓ Backend .env file loaded"
                echo "Environment variables configured:"
                grep -v "^#" .env | grep -v "^$" | sed 's/=.*/=***/' | head -5
                echo "..."
            else
                echo "✗ Failed to load backend .env file"
                exit 1
            fi
        '''
    }
}

return this
