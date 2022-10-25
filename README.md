# This is a social media website(i-book)
- This is just normal project where I have tried cloning a social media website and adding some new ideas.
- I have thought of making the user anonymous in his/her friends circle and posting and enjoying.
- This will also feature uploading photos videos and locations with friends
- You can form groups as well as see what is trending around you

![Screenshot_1](https://user-images.githubusercontent.com/78680046/197323291-7bbfd05b-1398-4ff4-8a1b-e4dbb4bbf823.png)


# Run it with Docker
```
docker build -t i-book-social-media-web .
docker run -ti --rm -p 3000:3000 i-book-social-media-web
```

# To contribute follow the followings guidelines.
## To access this fork and then clone it:-
- Fork it and star it , then clone with <code> git clone <repo_link> </code> command. 
- Make your new branch with your username easy to identifiable. Use command <code> git branch <your_branch_name></code> and then <code> git checkout <your_branch_name></code>.
- Just update the UI of the code which is in client folder, no need to change anything in the API folder (much appreciated).
- <code>cd client</code>
- <code> npm install </code>
- Then <code>npm run start</code> to start working on the frontend.
