# RxjsChat

For this homework assignment, I followed along in the book to build the rxjs-chat application. After completing rxjs-chat, I added a login component, auth service, and logged-in guard, as well as routes. When the page loads, a Login screen appears with an email and password field. The application is connected to a firebase realtime db to authenticate logging in as chandlergegg@gmail.com / csc436!. However, there is a bug in my authentication where the guard may return a false negative while the auth service completes the login. If the user clicks Submit a second (sometimes third...) time, the user is routed to the chat-page component. If the Login page does not show a form to login, clear your browser history and it will reappear. Open the console to see printouts of login and canActivate calls. Additionally, a toggle button was added to show/hide the chat-window component.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.