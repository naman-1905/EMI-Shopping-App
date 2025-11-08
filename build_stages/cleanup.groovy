// Root build stage: cleanup.groovy
// Handles cleanup and workspace removal

def call() {
    echo "========== Cleaning up workspace =========="
    
    try {
        // Remove all containers
        sh '''
            docker ps -a | grep emi_ || true
            docker rm -f $(docker ps -a --filter "label=app=emi" -q) || true
        '''
        
        // Clean workspace
        cleanWs()
        
        echo "✓ Workspace cleaned successfully"
    } catch (Exception e) {
        echo "⚠ Cleanup warning: ${e.message}"
    }
}

return this
