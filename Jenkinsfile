pipeline {
	agent any
	tools {
		nodejs 'NodeJs'
	}
	environment {
		DOCKER_HUB_REPO = 
		DOCKER_HUB_CREDENTIALS_ID = 
	}
	stages {
		stage('Checkout Github'){
			steps {
			git branch: 'main', credentialsId: 'GitOps', url: 'https://github.com/bom254/Jenkins-ArgoCD-GitOps.git' 
			}
		}	
		stage('Install node dependencies'){
			steps {
				sh '''
				echo 'installing node dependencies...'
				'''
				sh 'npm install'
			}
		}
		stage('Build Docker Image'){
			steps {
				script {
					echo 'building docker image...'
					dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
				}
			}
		}
		stage('Trivy Scan'){
			steps {
				//sh 'trivy image --severity HIGH,CRITICAL --no-progress --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'	
				sh 'trivy image --severity HIGH,CRITICAL --no-progress --skip-update --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'		
			}
		}
		stage('Push Image to DockerHub'){
			steps {
				script {
					echo 'pushing docker image to DockerHub...'
					docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_HUB_CREDENTIALS_ID}"){
						dockerImage.push('latest')
					}
				}
			}
		}
		stage('Install ArgoCD CLI'){
			steps {
				sh '''
				echo 'installing ArgoCD cli...'
				curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
				chmod +x /usr/local/bin/argocd
				'''
			}
		}
		stage('Apply Kubernetes Manifests & Sync App with ArgoCD'){
			steps {
				script {
					kubeconfig(credentialsId: 'kubeconfig', serverUrl: 
'
					sh '''
					argocd login 
				}
			}
		}
	}

	post {
		success {
			echo 'Build&Deploy completed succesfully!'
		}
		failure {
			echo 'Build&Deploy failed. Check logs.'
		}
	}
}
