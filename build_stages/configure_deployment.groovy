// Root build stage: configure_deployment.groovy
// Handles deployment configuration, creation, or rolling restart

def call(String kubeconfig) {
    echo "========== Configuring Deployment =========="
    
    sh '''
        export KUBECONFIG=${KUBECONFIG_VALUE}
        
        # Check if namespace exists, create if not
        kubectl get namespace emi-shopping || kubectl create namespace emi-shopping
        
        # Check if deployment exists
        if kubectl get deployment emi-app-deployment -n emi-shopping &>/dev/null; then
            echo "✓ Deployment found, performing rolling restart..."
            
            # Perform rolling restart
            kubectl rollout restart deployment/emi-app-deployment -n emi-shopping
            
            # Wait for rollout to complete
            kubectl rollout status deployment/emi-app-deployment -n emi-shopping --timeout=5m
            
            echo "✓ Rolling restart completed"
        else
            echo "✓ Deployment not found, applying manifest..."
            
            # Apply the deployment manifest
            kubectl apply -f manifests/deployment.yaml
            
            # Wait for deployment to be ready
            kubectl rollout status deployment/emi-app-deployment -n emi-shopping --timeout=5m
            
            echo "✓ Deployment applied successfully"
        fi
        
        # Display deployment info
        echo "Deployment Status:"
        kubectl get deployment emi-app-deployment -n emi-shopping
        
        echo "Replica Status:"
        kubectl get pods -n emi-shopping -l app=emi-app
    '''
}

return this
