// Frontend build stage: buid_docker_image.groovy
// Builds the frontend Docker image

def call(String imageName, String imageTag) {
    echo "========== Building Frontend Docker Image =========="
    
    sh '''
        cd frontend
        
        echo "Building Docker image: ''' + imageName + ''':''' + imageTag + '''"
        
        docker build \
            -t ''' + imageName + ''':''' + imageTag + ''' \
            -t ''' + imageName + ''':latest \
            -f Dockerfile \
            .
        
        if [ $? -eq 0 ]; then
            echo "✓ Frontend Docker image built successfully"
            docker images | grep ''' + imageName + '''
        else
            echo "✗ Failed to build frontend Docker image"
            exit 1
        fi
    '''
}

return this
