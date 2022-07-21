# vue-firebase-1

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

## Firebase settings

### Sign-in methods:

```
Email/Password
Anonymous
```

### Storage rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

### Firestore rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2022, 8, 20);
    }
  }
}
```
