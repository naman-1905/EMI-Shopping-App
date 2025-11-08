// Root build stage: checkout_scm.groovy
// Handles Git repository checkout

def call(String scmBranch) {
    echo "========== Checking out SCM =========="
    
    checkout([
        $class: 'GitSCM',
        branches: [[name: "${scmBranch}"]],
        userRemoteConfigs: [[
            url: 'https://github.com/naman-1905/EMI-Shopping-App.git',
            credentialsId: 'github_credentials'
        ]]
    ])
    
    echo "✓ Repository checked out successfully"
    echo "Branch: ${scmBranch}"
    sh 'git log --oneline -1'
}

return this
