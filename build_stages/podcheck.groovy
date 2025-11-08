// Root build stage: podcheck.groovy
// Verifies that all 3 containers are running

def call(String kubeconfig) {
    echo "========== Pod Health Check =========="
    
    sh '''
        export KUBECONFIG=${KUBECONFIG_VALUE}
        
        # Check if pods are running
        POD_COUNT=$(kubectl get pods -n emi-shopping -l app=emi-app --field-selector=status.phase=Running --no-headers 2>/dev/null | wc -l)
        
        if [ $POD_COUNT -eq 0 ]; then
            echo "✗ CRITICAL: No running pods found"
            exit 1
        fi
        
        # Get pod name
        POD_NAME=$(kubectl get pods -n emi-shopping -l app=emi-app -o jsonpath='{.items[0].metadata.name}')
        
        echo "Pod: $POD_NAME"
        echo ""
        
        # Check all 3 containers
        FRONTEND_STATUS=$(kubectl get pod $POD_NAME -n emi-shopping -o jsonpath='{.status.containerStatuses[?(@.name=="frontend")].ready}')
        BACKEND_STATUS=$(kubectl get pod $POD_NAME -n emi-shopping -o jsonpath='{.status.containerStatuses[?(@.name=="backend")].ready}')
        CLOUDFLARED_STATUS=$(kubectl get pod $POD_NAME -n emi-shopping -o jsonpath='{.status.containerStatuses[?(@.name=="cloudflared")].ready}')
        
        READY_COUNT=0
        
        if [ "$FRONTEND_STATUS" = "true" ]; then
            echo "✓ Frontend container is ready"
            ((READY_COUNT++))
        else
            echo "✗ Frontend container is NOT ready"
        fi
        
        if [ "$BACKEND_STATUS" = "true" ]; then
            echo "✓ Backend container is ready"
            ((READY_COUNT++))
        else
            echo "✗ Backend container is NOT ready"
        fi
        
        if [ "$CLOUDFLARED_STATUS" = "true" ]; then
            echo "✓ Cloudflared container is ready"
            ((READY_COUNT++))
        else
            echo "✗ Cloudflared container is NOT ready"
        fi
        
        echo ""
        echo "Ready containers: $READY_COUNT/3"
        
        if [ $READY_COUNT -eq 3 ]; then
            echo "✓ All containers are running successfully"
        else
            echo "✗ Not all containers are ready. Waiting and retrying..."
            sleep 5
            kubectl get pod $POD_NAME -n emi-shopping -o wide
            exit 1
        fi
        
        echo ""
        echo "Container Details:"
        kubectl get pod $POD_NAME -n emi-shopping -o wide
        kubectl describe pod $POD_NAME -n emi-shopping | grep -A 20 "Containers:"
    '''
}

return this
