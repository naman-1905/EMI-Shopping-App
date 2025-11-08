// Backend build stage: build_docker_image.groovy
// Builds the backend Docker image

def call(String imageName, String imageTag) {
    echo "========== Building Backend Docker Image =========="
    
    sh '''
        cd backend
        
        echo "Building Docker image: ''' + imageName + ''':''' + imageTag + '''"
        
        docker build \
            -t ''' + imageName + ''':''' + imageTag + ''' \
            -t ''' + imageName + ''':latest \
            -f Dockerfile \
            .
        
        if [ $? -eq 0 ]; then
            echo "✓ Backend Docker image built successfully"
            docker images | grep ''' + imageName + '''
        else
            echo "✗ Failed to build backend Docker image"
            exit 1
        fi
    '''
}

return this
