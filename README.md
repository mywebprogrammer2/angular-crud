
# Angular Project and Invoicing Application

This is an Angular application for managing projects, invoices, customers, and payments. It extends the same boilerplate project used in the Angular chat project, providing a consistent and standardized foundation for development.

For the Angular frontend, we have used a custom boilerplate project that provides a basic structure and configuration to kickstart Angular development. You can find the Angular boilerplate project in the following repository:

[Angular Boilerplate Project](https://github.com/your-username/your-angular-boilerplate-repo)

Please follow the instructions in the repository's README.md file to set up and run the Angular frontend.

## Features

- Angular 15.2.8
- Material Angular 15.2.9
- Basic Authentication & Authorization
- Well-organized project structure
- Modularity
- Routing and Navigation
- Lazy Loading
- HTTP Communication
- Basic Forms and Validation
- Error Handling
- Deployment and Build Process

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node: 18.10.0
- Angular CLI: 15.2.8
- Package Manager: npm 8.19.2

## Getting Started

To get started with this boilerplate project, follow these steps:

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Install the dependencies:

   ```bash
   cd angular-boilerplate
   npm install
   ```

3. Start the development server:

   ```
   ng serve
   ```

   The application will be available at `http://localhost:4200/`.

## Backend Details

**Laravel Backend Integration:**

- Laravel 8.x
- RESTful API endpoints for data interaction
- Authentication and Authorization with Laravel Sanctum

**Laravel Prerequisites:**

Before you begin, ensure you have met the following requirements:

- PHP: 8.1
- Composer: 2.2.18
- Database: MySQL 8.x

**Getting Started:**

To get started with this boilerplate project, follow these steps:

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Install the dependencies:

   ```bash
   cd laravel-boilerplate
   composer install
   php artisan migrate
   ```

3. Start the development server:

   ```
   php artisan serve
   ```

   The application will be available at `http://localhost:8000/`.


## Folder Structure

The folder structure of this boilerplate project is organized as follows:

- `/src`: Contains the application source code.
  - `/app`: Main application module and components.
    - `/auth`: Main dashboard component.
      - `/components`: Components that are part of the auth.
      - `/models`: Custom types.
      - `/services`: Contains All service that are part of auth.
      - `/shared`: Contains shared components for reusability.
    - `/dashboard`: Main dashboard component.
      - `/components`: Components that are part of the dashboard.
      - `/models`: Custom types.
      - `/services`: Contains All service that are part of dashboard.
      - `/shared`: Contains shared components for reusability.
  - `/assets`: Static assets such as images, fonts, etc.
  - `/environments`: Environment configurations.
- `/node_modules`: Third-party dependencies.
- `angular.json`: Angular project configuration.
- `package.json`: Node.js dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.

## Component Creation and Directory Structure

To create a new component, follow these steps:

1. Decide whether the component belongs to the authentication module or the dashboard module.
2. Inside the respective module folder (`/app/auth` or `/app/dashboard`), create a new folder with the component name in lowercase in `/components` folder.
3. Inside the component folder, create the necessary files for the component:
   - `component.ts`: The TypeScript file for the component.
   - `component.html`: The HTML template for the component.
   - `component.css`: The CSS styles for the component.
   - `component.spec.ts`: The unit test file for the component (optional).
4. If the component requires any additional services or models, create them in the respective folders (`/app/auth/services`, `/app/dashboard/services`, `/app/auth/models`, `/app/dashboard/models`).
5. If the component can be reused in other modules, consider placing it in the `/app/shared` folder instead.

Following this directory structure and component creation process will help maintain a well-organized project and make it easier to navigate and manage your Angular application.

## Code scaffolding

Run ```ng generate component component-name``` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Configuration

The Angular project includes environment-specific configuration files located in the `src/environments` folder. Here's how you can configure these files:

### Environment Files

The following environment files are available:

- `environment.ts`: Default environment file used for local development.
- `environment.staging.ts`: Environment file for staging environment.
- `environment.prod.ts`: Environment file for production environment.

Each environment file exports an object with configuration variables specific to that environment. For example, here's the content of `environment.staging.ts`:

```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://staging.example.com/api',
};
```

### Selecting the Environment

By default, the Angular project uses the `environment.ts` file for local development. To use a different environment, you need to specify it during the build process.

For example, to build the project using the staging environment configuration, run the following command:

```bash
ng build --configuration=staging
```

This will use the `environment.staging.ts` file as the configuration for the build. You can replace `staging` with `prod` for production environment builds.

### Accessing Environment Variables

To access the configuration variables defined in the environment files, import the `environment` object from the appropriate file, like this:

```typescript
import { environment } from './environments/environment';

// Access the configuration variables
console.log(environment.production); // true
console.log(environment.apiBaseUrl); // 'https://staging.example.com/api'
```

Use these configuration variables throughout your application to customize behavior based on the selected environment.

### Additional Configuration

If you need to add or modify configuration variables, you can do so by extending the environment files or creating additional environment files for specific environments. Remember to update the `angular.json` file to include any new environment files you create.

Feel free to customize the provided information based on your project's specific needs.

## Development

1. Install the dependencies:

   ```bash
   cd angular-boilerplate
   npm install
   ```

2. Start the development server:

   ```
   ng serve
   ```

   The application will be available at `http://localhost:4200/`.

## Deployment

To deploy the Angular project, follow these steps:

1. Build the project by running the following command for your specific environment:
  - For local:
  ```bash
  ng build
  ```
  - For Staging:
  ```bash
  ng build --configuration=staging
  ```
  - For Live/Production:
  ```bash
  ng build --configuration=staging
  ```

## Screenshots
### PROJECTS
![Alt text](./src/assets/images/screenshots/project.png?raw=true "Projects Screen")

### CUSTOMERS
![Alt text](./src/assets/images/screenshots/customer.png?raw=true "Customers Screen")

### INVOICES
![Alt text](./src/assets/images/screenshots/invoices.png?raw=true "Invoices Screen")

### PAYMENTS
![Alt text](./src/assets/images/screenshots/payments.png?raw=true "Payments Screen")
                                                                                                                  

                                                                                                                  