# manu.show

- Live site: [manu.show](https://manu.show)

## Development Setup

### Using mise (recommended)

This site uses [mise](https://mise.jdx.dev/) to manage Ruby versions and a Gemfile for dependencies.

1. **Install mise** (if not already installed):
   ```bash
   brew install mise
   ```

2. **Install the dependencies**:
   ```bash
   mise i
   ```

3. **Run the Jekyll server**:
   ```bash
   mise serve
   ```

## Resources

Thumbnail images should use `webp` extension to improve loading times.

To convert images to webp, run the following command:

`cwebp -q 80 input-image.png -o output-image.webp`