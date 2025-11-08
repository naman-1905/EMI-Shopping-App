// Root build stage: cloudflared_token.groovy
// Injects cloudflared token into the deployment

def call(String kubeconfig, String deploymentName) {
    echo "========== Configuring Cloudflared Token =========="
    
    withCredentials([string(credentialsId: 'cloudflared_token', variable: 'CLOUDFLARED_TOKEN')]) {
        sh '''
            export KUBECONFIG=${KUBECONFIG_VALUE}
            
            # Create or update the secret for cloudflared token
            kubectl delete secret cloudflared-token -n emi-shopping --ignore-not-found=true
            
            kubectl create secret generic cloudflared-token \
                --from-literal=token="${CLOUDFLARED_TOKEN}" \
                -n emi-shopping \
                --dry-run=client -o yaml | kubectl apply -f -
            
            echo "✓ Cloudflared token secret updated"
            
            # Verify secret creation
            kubectl get secret cloudflared-token -n emi-shopping -o jsonpath='{.data.token}' | base64 -d | head -c 20
            echo "... (token masked)"
        '''
    }
}

return this
