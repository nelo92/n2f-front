# n2f-front

Project : N2F / Web App Front Project
Creator :  MAU
Url : https://nodedefrais.web.app/
      https://nodedefrais.firebaseapp.com/

## TODO

+ control doublon insertion and show error on input view
+ force format dd/mm/yyyy on screen view. Pb when input 1/10/2020

## RELEASE

v.1.0.0 : 
show version in application
v.1.1.0 : 
recalculate total after delete/deleteAll action in screen view 

## Build angular project

ng build --prod

## Firebase Hosting

Install Firebase :
npm install -g firebase-tools

Check:
firebase -V

Connect/Init:
firebase login
firebase init

Deploy:
firebase deploy

Open hosting site:
firebase open hosting:site

Details command : 
firebase init
Are you ready to proceed? Yes
Which Firebase CLI features? Hosting 
What do you want to use as your public directory? dist/demo
Configure as a single-page app? No
File dist/demo/index.html already exists. Overwrite ? No

## Command execution : 
firebase login
firebase init
ng build --prod
firebase deploy

## Reference : 
https://www.youtube.com/watch?v=mmmaeHBCTOw&ab_channel=TheNetNinja
https://scotch.io/tutorials/deploying-an-angular-cli-app-to-production-with-firebase