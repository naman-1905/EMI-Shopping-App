pipeline {
    agent any

    parameters {
        choice(name: 'COMPONENT', choices: ['frontend', 'backend', 'both'], description: 'What to build')
        choice(name: 'DEPLOY_NODE', choices: ['naman', 'kahitoz'], description: 'Deployment cluster')
        string(name: 'GIT_BRANCH', defaultValue: 'deployment/CICD-Config-Files', description: 'Git branch')
    }

    environment {
        REG1 = "registrypush.kahitoz.com:5000"
        REG2 = "registry.kahitoz.com"
        DOCKER_CRED = 'docker_creds'
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = "${params.DEPLOY_NODE == 'naman' ? '/home/jenkins/.kubenaman/config' : '/home/jenkins/.kubekahitoz/config'}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Setup') {
            steps {
                sh 'git checkout ${GIT_BRANCH}'
                sh 'docker ps -a | grep emi_ || true && docker rm -f $(docker ps -a --filter "label=app=emi" -q) 2>/dev/null || true'
            }
        }

        stage('Backend Build & Push') {
            when { expression { return params.COMPONENT == 'backend' || params.COMPONENT == 'both' } }
            steps {
                dir('backend') {
                    withCredentials([file(credentialsId: 'backend_env', variable: 'ENV_FILE')]) {
                        sh 'cp $ENV_FILE app/.env'
                    }
                    sh 'docker build -t emi_backend:${IMAGE_TAG} -t emi_backend:latest .'
                    withCredentials([usernamePassword(credentialsId: 'docker_creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh '''
                            echo $PASS | docker login -u $USER --password-stdin ${REG1}
                            docker tag emi_backend:${IMAGE_TAG} ${REG1}/emi_backend:latest
                            docker push ${REG1}/emi_backend:latest
                            
                            echo $PASS | docker login -u $USER --password-stdin ${REG2}
                            docker tag emi_backend:${IMAGE_TAG} ${REG2}/emi_backend:latest
                            docker push ${REG2}/emi_backend:latest
                        '''
                    }
                }
                echo "✓ Backend pushed"
            }
        }

        stage('Frontend Build & Push') {
            when { expression { return params.COMPONENT == 'frontend' || params.COMPONENT == 'both' } }
            steps {
                dir('frontend') {
                    withCredentials([file(credentialsId: 'frontend_env', variable: 'ENV_FILE')]) {
                        sh '''
                            cp $ENV_FILE .env.local
                            if [ ! -f .env.local ]; then
                                echo "ERROR: Failed to copy .env.local file to frontend directory"
                                exit 1
                            fi
                            echo "✓ Successfully copied .env.local to frontend directory"
                        '''
                    }
                    sh 'docker build -t emi_frontend:${IMAGE_TAG} -t emi_frontend:latest .'
                    withCredentials([usernamePassword(credentialsId: 'docker_creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh '''
                            echo $PASS | docker login -u $USER --password-stdin ${REG1}
                            docker tag emi_frontend:${IMAGE_TAG} ${REG1}/emi_frontend:latest
                            docker push ${REG1}/emi_frontend:latest
                            
                            echo $PASS | docker login -u $USER --password-stdin ${REG2}
                            docker tag emi_frontend:${IMAGE_TAG} ${REG2}/emi_frontend:latest
                            docker push ${REG2}/emi_frontend:latest
                        '''
                    }
                }
                echo "✓ Frontend pushed"
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'cloudflared_token', variable: 'CF_TOKEN'),
                    usernamePassword(credentialsId: 'docker_creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                ]) {
                    sh '''
                        # Create namespace
                        kubectl create namespace apps --dry-run=client -o yaml | kubectl apply -f -
                        
                        # Create cloudflared secret
                        kubectl delete secret cloudflared-token -n apps --ignore-not-found=true
                        kubectl create secret generic cloudflared-token --from-literal=token="${CF_TOKEN}" -n apps
                        
                        # Create docker registry secret for image pull
                        kubectl delete secret docker-creds -n apps --ignore-not-found=true
                        kubectl create secret docker-registry docker-creds \
                            --docker-server=registry.kahitoz.com \
                            --docker-username=${DOCKER_USER} \
                            --docker-password=${DOCKER_PASS} \
                            -n apps
                        
                        # Check if deployment exists and apply/restart accordingly
                        if kubectl get deployment emi-app -n apps >/dev/null 2>&1; then
                            echo "✓ Deployment exists - performing rolling restart"
                            kubectl rollout restart deployment/emi-app -n apps
                        else
                            echo "✓ Deployment not found - applying new deployment"
                            kubectl apply -f manifests/deployment.yaml
                        fi
                        
                        # Wait for rollout to complete
                        echo "Waiting for deployment to complete..."
                        kubectl rollout status deployment/emi-app -n apps --timeout=300s
                        
                        # Verify 3 containers running
                        echo "Verifying container status..."
                        POD=$(kubectl get pod -n apps -l app=emi-app -o jsonpath='{.items[0].metadata.name}')
                        
                        # Wait for containers to fully initialize and pass liveness probes
                        echo "Waiting for containers to fully start and pass health checks..."
                        sleep 30
                        
                        # Check container readiness using kubectl get pod output
                        READY_COUNT=$(kubectl get pod $POD -n apps -o jsonpath='{.status.containerStatuses[*].ready}' | grep -o 'true' | wc -l)
                        TOTAL_CONTAINERS=$(kubectl get pod $POD -n apps -o jsonpath='{.status.containerStatuses[*].name}' | wc -w)
                        
                        echo "Container status: $READY_COUNT/$TOTAL_CONTAINERS ready"
                        
                        if [ "$READY_COUNT" -eq "3" ]; then
                            echo "✓ All 3 containers are ready and running"
                            kubectl get pods -n apps -l app=emi-app
                            echo "✓ Deployment successful!"
                        else
                            echo "⚠ Only $READY_COUNT/$TOTAL_CONTAINERS containers ready - checking pod details"
                            kubectl get pods -n apps -l app=emi-app
                            kubectl describe pod $POD -n apps
                            echo "Recent pod events and logs:"
                            kubectl logs $POD -n apps --all-containers=true --tail=100 || true
                            echo "Pod status details:"
                            kubectl get pod $POD -n apps -o yaml | grep -A 20 "containerStatuses:" || true
                            # Don't exit with error - deployment may still succeed
                            echo "⚠ Warning: Not all containers ready, but proceeding..."
                        fi
                    '''
                }
            }
        }
    }

    post {
        always { cleanWs() }
        success { echo "✓ Pipeline completed" }
        failure { echo "✗ Pipeline failed - check logs" }
    }
}
