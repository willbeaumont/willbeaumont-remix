# Welcome!

This project utilizes the GitHub API to provide data for a developer portfolio page. I'm open to contributors, feel free to fork, suggest improvements etc!

Link: https://willbeaumont-remix.netlify.app/

## How to look at a different developer

1. Click on the name in the top left corner
2. Enter a GitHub username

## Projects Section

The site displays the 10 most recently pushed _public_ repos for the user with the following data:

- Title
- Description
- Project languages (recreated graphic using [Victory](https://formidable.com/open-source/victory/docs/))
- Last push date
- Number of stars, watchers, and forks

## Enhancements

Here are some ideas for improvements I can think of if you're looking for somewhere to get started!

- [ ] Make it easier for users to understand they can update the page to show different GitHub user data

- [ ] Add a section that totals and displays language percentages for all public repos

- [ ] Allow users to login/auth with their own GitHub account (60 requests/hr for unauth, 5k requests/hr for auth users)

- [ ] ???

---

# Remix Boilerplate

- [Remix Docs](https://remix.run/docs)
- [Netlify Functions](https://www.netlify.com/products/functions/)

## Netlify Setup

1. Install the [Netlify CLI](https://www.netlify.com/products/dev/):

```sh
npm i -g netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
npm i -g netlify-cli@latest
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

3. Create a new site:

```sh
netlify init
```

## Development

The Remix dev server starts your app in development mode, rebuilding assets on file changes. To start the Remix dev server:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

The Netlify CLI builds a production version of your Remix App Server and splits it into Netlify Functions that run locally. This includes any custom Netlify functions you've developed. The Netlify CLI runs all of this in its development mode.

```sh
netlify dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

Note: When running the Netlify CLI, file changes will rebuild assets, but you will not see the changes to the page you are on unless you do a browser refresh of the page. Due to how the Netlify CLI builds the Remix App Server, it does not support hot module reloading.

## Deployment

There are two ways to deploy your app to Netlify, you can either link your app to your git repo and have it auto deploy changes to Netlify, or you can deploy your app manually. If you've followed the setup instructions already, all you need to do is run this:

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```
