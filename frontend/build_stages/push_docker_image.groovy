// Frontend build stage: push_docker_image.groovy
// Pushes the frontend Docker image to registries

def call(String imageName, String imageTag, String reg1, String reg2, String dockerCredId) {
    echo "========== Pushing Frontend Docker Image =========="
    
    withCredentials([usernamePassword(credentialsId: dockerCredId, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
        sh '''
            # Login to both registries
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin ''' + reg1 + '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin ''' + reg2 + '''
            
            # Tag for registry 1 (push registry)
            PUSH_IMAGE1=''' + reg1 + '''/kahichan-frontend:''' + imageTag + '''
            PUSH_IMAGE1_LATEST=''' + reg1 + '''/kahichan-frontend:latest
            
            # Tag for registry 2 (pull registry)
            PUSH_IMAGE2=''' + reg2 + '''/kahichan-frontend:''' + imageTag + '''
            PUSH_IMAGE2_LATEST=''' + reg2 + '''/kahichan-frontend:latest
            
            echo "Tagging and pushing to Registry 1 (Push): ''' + reg1 + '''"
            docker tag ''' + imageName + ''':''' + imageTag + ''' $PUSH_IMAGE1
            docker tag ''' + imageName + ''':latest $PUSH_IMAGE1_LATEST
            docker push $PUSH_IMAGE1
            docker push $PUSH_IMAGE1_LATEST
            
            echo "✓ Successfully pushed to Registry 1"
            
            echo ""
            echo "Tagging and pushing to Registry 2 (Pull): ''' + reg2 + '''"
            docker tag ''' + imageName + ''':''' + imageTag + ''' $PUSH_IMAGE2
            docker tag ''' + imageName + ''':latest $PUSH_IMAGE2_LATEST
            docker push $PUSH_IMAGE2
            docker push $PUSH_IMAGE2_LATEST
            
            echo "✓ Successfully pushed to Registry 2"
            
            # Logout
            docker logout ''' + reg1 + '''
            docker logout ''' + reg2 + '''
            
            echo "✓ Frontend Docker image pushed to both registries"
        '''
    }
}

return this
