// Frontend build stage: load_frontend_env.groovy
// Loads frontend environment variables from Jenkins credentials

def call() {
    echo "========== Loading Frontend Environment =========="
    
    withCredentials([file(credentialsId: 'frontend_env', variable: 'FRONTEND_ENV_FILE')]) {
        sh '''
            cd frontend
            
            # Copy .env file
            cp $FRONTEND_ENV_FILE .env.local
            
            if [ -f .env.local ]; then
                echo "✓ Frontend .env.local file loaded"
                echo "Environment variables configured:"
                grep -v "^#" .env.local | grep -v "^$" | sed 's/=.*/=***/' | head -5
                echo "..."
            else
                echo "✗ Failed to load frontend .env.local file"
                exit 1
            fi
        '''
    }
}

return this
