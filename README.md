# This is a social media website(i-book)

- This is just normal project where I have tried cloning a social media website and adding some new ideas.
- I have thought of making the user anonymous in his/her friends circle and posting and enjoying.
- This will also feature uploading photos videos and locations with friends
- You can form groups as well as see what is trending around you

![Screenshot_1](https://user-images.githubusercontent.com/78680046/197323291-7bbfd05b-1398-4ff4-8a1b-e4dbb4bbf823.png)


# To contribute follow the followings guidelines.

## To access this fork and then clone it:-

- Fork it and star it , then clone with <code> git clone <repo_link> </code> command.
- Make your new branch with your username easy to identifiable. Use command <code> git branch <your_branch_name></code> and then <code> git checkout <your_branch_name></code>.
- Just update the UI of the code which is in client folder, no need to change anything in the API folder (much appreciated).
- <code>cd client</code>
- <code> npm install </code>
- Create ```.env``` file in the client folder and add these lines
- <code>REACT_APP_PUBLIC_FOLDER=http://localhost:8000/images/
    GENERATE_SOURCEMAP=false
    PATH=http://localhost:8000
    REACT_APP_PATH_TO_BACKEND=http://localhost:8000
  </code>
- Then <code>npm run start</code> to start working on the frontend.
- <code>cd api</code> in new terminal.
- <code> npm install </code>
- Then <code>npm run start</code> to start backend.


# This project also support docker development

## To start both the frontend and backend service at the same time

- <code>docker-compose up</code>

## To start the server side development locally in docker container

- <code> cd api </code>

### Building the docker image

- <code> docker build -t 'docker-image-name' . </code>

### Running the docker container

- <code> docker run -p 8000:8000 'image ID' </code>

## To start the client side development locally in docker container

- <code> cd client </code>

- <code> docker build -t 'docker-image-name' . </code>

- <code> docker run -p 3000:3000 'image ID' </code>

## PR Creating guidelines
- Create PR for develop branch only, otherwise it will be rejected
