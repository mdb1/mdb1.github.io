# mdb1.github.io

- Live site: [mdb1.github.io](https://mdb1.github.io)

## Development Setup

### Using Docker Compose (recommended)

This site can be run using Docker Compose, which eliminates Ruby version and dependency issues:

1. **Install Docker** (if not already installed):
   ```bash
   brew install --cask docker
   brew install docker-compose
   ```

2. Open Docker Desktop

3. **Build and start the Jekyll server**:
   ```bash
   docker-compose up
   ```

4. **Access the site** at http://localhost:4000

## Resources

Thumbnail images should use `webp` extension to improve loading times.

To convert images to webp, run the following command:

`cwebp -q 80 input-image.png -o output-image.webp`