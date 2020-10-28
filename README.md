# n2f-front

Creator MAU

branch : auth

## URL

https://nodedefrais.web.app/
https://nodedefrais.firebaseapp.com/

## TODO

- control doublon insertion and show error on input view
- force format dd/mm/yyyy on screen view. Pb when input 1/10/2020

## RELEASE

v.1.0.0 :
show version in application
v.1.1.0 :
recalculate total after delete/deleteAll action in screen view
v.1.1.1 :
bug correction

## Command execution :

firebase login
firebase init
ng build --prod
firebase deploy

## Command details :

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
