# biz-web-client-demo

## What does this repository do?
This repository serves as a demo/boilerplate for a fully customizable web client for use with Strapi.

## Features

### Component Library
`npm run storybook` runs the component library. Stories are co-located. Components are broken up into a mixture of business logic and atomic design principles. `Core` and `Fields` are essentially atoms in atomic design. 

`Containers` are wrappers which bind and organize content. `Modules` are business logic heavy elements typically using all of the components in the library and manages state and/or makes api calls to populate necessary data. `Box` is likely a heavily used generic wrapper and has preset values for internal spacing, used to enforce spacing uniformity.

A key (very opinionated) component to keep in mind with rich text/content is `Markdown`, using `react-markdown`. This component was designed to output rich text with a specific layout to reduce development time to zero. There's also ad-injection logic if desired.


### Google Adsense & Tag Manager
`AdProvider` injects Google Adsense scripts and is used to populate ad slots. From here, `AdContainers` will contain the element ids and styling rules needed to properly render ads. This ad library currently does not support any prebidding functionality. Tag manager for analytics are typically going to be indicated by the `dataGtmId`, prop in react components. Clicks will use "gtm-click" and section views will use "gtm-section-view", etc. Change these value or configure it with Google tag manager as needed.

### User Authentication
Using next-auth, authentication is set up to log users in using a Google+ account or their email/password credentials. Authentication in the backend comes out-of-the-box for Strapi.

### Nextjs Client & React Apollo
Generates static pages where available or sensible. Otherwise, everything is SSR. Apollo is used to manage api calls to Strapi's GraphQL plugin.

## This runs on
- NextJS
- React
- Apollo
- Storybook
- TailwindCSS

### Build tools
- `Vite` is used to build and run storybook, for speed purposes. Bloated component libraries can cause excessive build times.
- `Babel` is used for `jest`
- `next` builds the client app.


## Upcoming
- Incorporate monitoring with newrelic, etc
- Better tests and a bunch of refactoring...
