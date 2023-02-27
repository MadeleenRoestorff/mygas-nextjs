# My Utilities Fontend

This repository contains the frontend code for My Utilities, a web application designed to help you track your utility usage, including electricity and gas. The project uses Next.js and MUI for frontend development, and TypeScript for type checking. Axios is used to make API calls to the backend, which is located in a separate repository. The application allows users to log in securely with a username and password, and upon successful verification, receives a JSON web token that is stored in the browser's local storage and used in a context provider. Users can add and edit utility data through the frontend. ESLint and Prettier are used for code formatting and consistency.

## Installation

To install My Utilities Fontend, clone the repository and install the dependencies using npm:

```bash
git clone https://github.com/MadeleenRoestorff/mygas-nextjs.git
cd mygas-nextjs
npm install
```

## Usage Steps

To run the app during development, use the following command:

```bash
npm run dev
```

This will compile the TypeScript code and start the server on http://localhost:3000.

To start the production server, use the following command:

```bash
npm start
```

This will start the server using the pre-compiled (npm run build) JavaScript files.

## Login

The login functionality is provided in the app for authentication purposes. The frontend sends a POST request to the backend with the username and password. If authentication is successful, the backend sends back a json webtoken. This token is stored in the browser's local storage and used in a useContext hook to allow access to restricted endpoints.

## Utility Data

The frontend makes axios calls to the backend to fetch utility data, which is displayed in the frontend. You can add new utility data by making a POST request, and edit existing utility data by making a PUT request. The utility data includes electricity and gas usage and is displayed in a table format.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [MUI](https://mui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)

### Notes

If you want skip the husky validate (ESlint and prettier) hook use --no-verify
git commit -m "yolo!" --no-verify.
Run npm test to ensure that your changes pass all tests.

## Acknowledgements

- [OpenAI](https://openai.com/) for providing the ChatGPT model used to generate this README.
- [Mintlify](https://marketplace.visualstudio.com/items?itemname=mintlify.document) for helping me write code comments.
