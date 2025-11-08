// Frontend build stage: tag_pipeline.groovy
// Tags the Jenkins pipeline build for tracking

def call(String pipelineTag) {
    echo "========== Tagging Frontend Pipeline =========="
    
    sh '''
        # Tag build with component name for tracking
        echo "Pipeline component: ''' + pipelineTag + '''"
        echo "Build number: ${BUILD_NUMBER}"
        echo "Build tag: ''' + pipelineTag + '''-${BUILD_NUMBER}"
        
        # This can be used for build tracking and notifications
        echo "✓ Pipeline tagged as: ''' + pipelineTag + '''-${BUILD_NUMBER}"
    '''
}

return this
