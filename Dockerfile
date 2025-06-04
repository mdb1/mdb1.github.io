FROM ruby:latest

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install latest bundler version
RUN gem install bundler

# Copy Gemfile
COPY Gemfile ./

# Install gems
RUN bundle install

# Copy the rest of the application
COPY . .

# Expose port 4000
EXPOSE 4000

# Set environment variable
ENV JEKYLL_ENV=development

# Command to run when container starts
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
