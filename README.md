# Rick and Morty API Consumption

Employee information management is project that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Clone the project from [Github](https://github.com/andela-gike/rick-and-mortycharacterapi.git)
Run the following command with your node package manager to install all the neccessary packages

```bash
yarn install or npm install
```

## Available Scripts

In the project directory, you can run:

### `yarn start or npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test or npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build or npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Architecture

I had a choice of choosing any framework from VueJS/React/Angular. Though I do have some experience with Angular and VueJS, my professional experience is in React. So I chose to use ReactJS. Since the challenge needed a lot of UI components I build most of the UI components from ground up without an external CSS library or package. Although the time spent to complete the project was more as to compare when using a CSS package. For state management, I chose to use react hooks and props inheritance, because the project is small.
Finally, almost all the component are functional components for ease of testing and proper use of React hooks except the `App.tsx` file which is a class component. Finally, I had the option of choosing either `Typescript`/`Flowtype`/`Proptypes` for type checking, so I choose Typescript because it functions not only as type checking for the prop types for the entire project.

## Responsiveness and unit testing

For responsiveness in some components, I practiced fluid design which gives the component the ability to scale based on the screen size. The application is also **Flexbox** based making the components to adjust based on the screen size.

For testing, I made use of the `React-testing-library` to test my component and used coverage to generate the coverage for file and components that have been tested.
