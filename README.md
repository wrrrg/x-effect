# X-Effect

This is a streamlined, minimalist app designed to help users track their progress to form new habits.

---

You must have the following installed globally on your machine to successfully install this project:

## Server-Side Pre-Requirements

- Python 3.6.5
- Pip 10.0.0


virtualenvwrapper is recommended to manage dependencies

## Client-Side Pre-Requirements

- Node.js
- Yarn

## Setup

From project root:

```
yarn install
pip install -r requirements.txt
aws configure
```

Then type in these values to configure aws:

`AWS Access Key ID:` Get key from config file  
`AWS Secret Access Key:` Get secret from config file  
`Default region name:` us-west-2  
`Default output format [json]:` keep as json  

---

There are some shell scripts to easily start things up:

## Running Locally

```
yarn start
```
View the app on `http://localhost:8080/`

## Deploying to Production

```
yarn deploy
```
