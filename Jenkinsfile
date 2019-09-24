@Library('fuego-libraries') _
def dockerUrl = 'docker.artifactory.a.intuit.com'
// Switch back to latest once fully tested
def nodeImage = 'app/uicomponents/web-player/service/vulcan:1'
def jenkinsRole = 'arn:aws:iam::733536204770:role/design-systems-prd-jenkins'
def uploadRole = 'arn:aws:iam::646158002977:role/ibp-cicd-core-s3-bucket-access'

pipeline {
  agent {
    kubernetes {
        // Use a dynamic pod name because static labels are known to cause pod creation errors.
        label "node-pod-${UUID.randomUUID().toString()}"
        defaultContainer "nodejs"
        yaml """
        apiVersion: v1
        kind: Pod
        metadata:
          annotations:
            iam.amazonaws.com/role: ${jenkinsRole}
        spec:
            containers:
            - name: nodejs
              image: '${dockerUrl}/${nodeImage}'
              command:
              - cat
              tty: true
        """
    }
  }
  options {
    timestamps()
    buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '50', artifactNumToKeepStr: '30'))
  }
  environment {
    PATH = "node_modules/.bin/:$PATH"
    S3_BUCKET_ACCESS_ROLE = "${uploadRole}"
    APPLITOOLS_API_KEY = credentials('APPLITOOLS_API_KEY')
    NPMRC_IBP_AUTH = credentials('NPMRC_ARTIFACTORY_IBP')
    
    GIT_PR_REPO = 'design-systems'
    GIT_PR_USER = 'proof'
    GH_TOKEN = credentials('NATIVE_APPS_GH_TOKEN')
    GITHUB_CREDENTIALS = credentials("NATIVE_APPS_GH_LOGIN")
    GITHUB_USER = "${env.GITHUB_CREDENTIALS_USR}"
    GITHUB_TOKEN = "${env.GITHUB_CREDENTIALS_PSW}"
  }
  stages {
    stage('Check Skip CI') {
      steps {
        script { 
          checkout scm
          result = sh (script: "git log -1 | grep '.*\\[skip ci\\].*'", returnStatus: true)
          if (result == 0) {
              echo ("'Skip CI' spotted in git commit. Aborting.")
              currentBuild.result = 'ABORTED'
              error('Exiting job');
          }
        }
      }
    }
    stage('Auth') {
      steps {
        s3Auth("${S3_BUCKET_ACCESS_ROLE}")
        sh '''
          echo "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.intuit.com" >> /tmp/gitcredfile
          git config --global user.name "${GITHUB_USER}"
          git config --global user.email "Adam_Dierkens@intuit.com"
          git config --global credential.helper "store --file=/tmp/gitcredfile"
          '''
        sh "cp -f $NPMRC_IBP_AUTH ~/.npmrc"
      }
    }
    stage('Install') {
      steps {
        sh 'yarn install --frozen-lockfile'
      }
    }
    stage('Build') {
      steps {
          sh 'yarn build'
      }
    }
    stage('Test') {
      failFast true
      parallel {
        stage('PR Version Check') {
          when { changeRequest() }
          steps {
            sh 'auto pr-check --pr $CHANGE_ID --url $BUILD_URL'
          }
        }
        stage('Unit Tests') {
          steps {
            sh 'yarn test'
          }
        }
        stage('Lint') {
          steps {
            sh 'yarn lint'
          }
        }
      }
    //   post {
    //     always {
    //       junit '**/target/surefire-reports/*.xml'
    //     }
    //   }
    }
    stage('NPM Release') {
      stages {
        stage('Canary') {
          when { changeRequest() }
          steps {
            sh 'git stash'
            sh 'git checkout -B tmp'
            sh 'git fetch origin --tags'
            sh "auto shipit -w"
          }
        }
        stage('Latest') {
          when { branch 'master' }
          steps {
            sh 'git stash'
            sh 'git fetch origin --tags'
            sh 'git checkout master'
            sh 'auto shipit -w'
            sh 'yarn lerna run deploy --scope @proof/docs --stream'
          }
        }
      }
    }
  }
}
