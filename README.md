# Atlas

Welcome to Atlas, a comprehensive fitness and nutrition tracking application designed specifically for Department of Defense personnel.

## API Switching Feature

Atlas supports switching between a mock API and a live backend API. This feature allows for easy development and testing without relying on a live backend.

### Configuration

1. In the project root, create a `.env` file with the following content:

   ```
   VITE_API_ENDPOINT=https://api.dodfitness.mil/v1
   VITE_USE_LIVE_API=false
   ```

2. Set `VITE_API_ENDPOINT` to the URL of your live backend API.
3. Set `VITE_USE_LIVE_API` to `true` to use the live API by default, or `false` to use the mock API.

### Usage

- The current API mode (live or mock) is displayed in the footer of the application.
- You can toggle between live and mock API modes using the switch in the footer.
- The application will automatically fall back to the mock API if the live API fails repeatedly.

### Development

When developing new features or testing, you can easily switch between the mock and live APIs without needing to restart the application. This allows for rapid development and testing of features that depend on backend data.

## Installation and Setup

(Include your existing installation and setup instructions here)

## Contributing

(Include your existing contribution guidelines here)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.