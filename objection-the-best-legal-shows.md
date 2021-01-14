Welcome to the courtroom! Today, we will be hearing the case of the best legal TV shows.

### Getting Started

```no-highlight
et get objection-the-best-legal-shows
cd objection-the-best-legal-shows
createdb legal_shows_development
yarn install
yarn run dev
```

### Core Requirements

#### Step 0

To get started, work as a group to review the provided code. Specifically, your React frontend has been provided. You should not need to make any changes to the provided React code _unless specified in the steps below_.

Take note of what components exist, where they are rendered (what paths), what their responsibilities are, and where they are making `fetch` calls to.

#### Step 1

We need a way to persist the best legal shows out there! We have already created our database, so let's add a migration to create a `shows` table.

Write a Knex migration which adds a table called "shows", with the following columns:
- `title`, string, required and unique
- `network`, string, optional
- `premiereYear`, integer, required
- `description`, string, optional

Remember to also add timestamps to your migration, and to run your new migration once you are done by running `yarn run migrate:latest` from your `server` directory!

#### Step 2

Now that we have a table for our shows, we need to add a corresponding model. Add a `Show` model to your server which is set up to utilize Objection. 

Be sure to add the model into `server/src/models/index.js` so that it is accessible via our console! 

Finally, we have provided a `ShowSeeder` to populate some data. Go ahead and run `yarn run db:seed` from your `server` directory in order to seed this data. This seeder will be able to confirm that you have set your migration and model up successfully. Use your Objection console to double-check that your data has successfully been inserted into the database!

#### Step 3

We have successfully set up our database and ORM model, so we are ready to start building out the necessary API endpoints.

Add an index API endpoint for shows which can receive a GET request at `/api/v1/shows`. This endpoint should query the database for all existing shows, and return the show data in a nested response that looks like the below:

```js
{ shows: [...] }
```

Remember to handle any server errors that may arise should your query fail to execute!

You can navigate to <http://localhost:3000/api/v1/shows> to test that your data is appearing correctly, and navigate to <http://localhost:3000/shows> to confirm that it is loading into our React app properly. Your index page should display the name of all of our favorite shows.

#### Step 4

We need a detail (show) page for our shows! While our `ShowDetail` component has already been built out for us, let's set up the corresponding API endpoint so the component can fetch its necessary data.

Add a "show" API endpoint for shows which can receive a GET request at `/api/v1/shows/:id`. This endpoint should query the database for the specific show based on the `id` provided, and return the show data in a nested response that looks like the below:

```js
{ 
  show: {
    title: "The Good Wife",
    network: "CBS",
    releaseYear: 2009,
    description: "It focuses on Alicia Florrick, the wife of the Cook County State's Attorney who returns to her career in law after the events of a public sex and political corruption scandal involving her husband."
  }
}
```

Remember to handle any server errors that may arise should your query fail to execute!

You can navigate to <http://localhost:3000/api/v1/shows/1> to test that your data is appearing correctly, and navigate to <http://localhost:3000/shows/1> to confirm that it is loading into our React app properly. Your show page should display the title, network, release year, and description of the show.

#### Step 5

We need to be able to add new favorite shows as we discover them! The `NewShowForm` is ready to post new shows to an API endpoint, so we have to build it.

Add an API endpoint that can receive a POST request at `/api/v1/shows` to add a new show. Do not worry about adding any validations here: simply return the created show record with a `201 Created` status if successful, or a `500 Internal Server Error` status if unsuccessful. Test this endpoint by filling in the required fields in your form found at <http://localhost:3000/shows/new> and submitting the form. You should be redirected to the index page on submit, and the newly created show should appear in the list.

#### Step 6

We need to validate our data! Add validations to your model using `jsonSchema`. Add "data type" and "required" model-level validations for the following fields:

- `title`, string, required (do **not** worry about uniqueness just yet)
- `network`, string, optional
- `premiereYear`, integer, required
- `description`, string, optional

Don't worry about updating your API endpoint yet - that will be the next step.

#### Step 7

Now that we have validations set up in our model, we can update our API endpoint to properly return errors if they occur.

Update the POST `/api/v1/shows` endpoint to check for any `ValidationError`s that occurred on submit. If no errors occurred, return the created show record with a `201 Created` status. If there were validation errors, return a `422 Unprocessable Entity` status with the appropriate errors. If any other server error occurs, continue returning a `500 Internal Server Error`.

Remember to use the `cleanUserInput` service to nullify any empty fields before running them through the `jsonSchema` validation!

#### Step 8

Now that our server is returning helpful model-level validation errors, we want to update our form to display those errors. Update the `NewShowForm` React component to add the response errors to the already-provided state so that they will be rendered in the `ErrorList`. Be sure to use the `translateServerErrors` service to translate those errors before adding them in!

Test your validation work by navigating to <http://localhost:3000/shows/new> and submitting an empty form. Make sure you receive the appropriate errors. Then. fill in the form properly and make sure it submits successfully and redirects you to an updated list on the index page.

### Non-Core Requirements

#### Step 9

We need a way to make sure duplicate entries aren't added! Add a unique validation for the "title" to your model. Be sure to use your `uniqueFactory` so that these errors will raise as `ValidationError`s!

Test out your unique validation by trying to add two shows with the same title in your form.

#### Step 10

We've decided that we need a way to rate all of the best shows to give them a fair trial.

Add a new column for "rating" (integer, optional) to your `shows` table. Be sure to add this column using a second, additional migration.

Test your new column by entering a new record through the Objection console, by running `yarn run console` from your `server` directory! (You can also update your `ShowSeeder` if you prefer!)