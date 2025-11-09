# Multi-stage build for Next.js frontend
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Ensure an env file exists (Jenkins will copy `.env.local` into the build context when provided)
# This avoids failing later when the final stage tries to copy the file from the builder image.
RUN [ -f .env.local ] || touch .env.local

# Build the application
RUN npm run build

# Final stage
FROM node:22-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy .next directory from builder
COPY --from=builder /app/.next ./.next

# Copy public directory
COPY --from=builder /app/public ./public

# Copy environment file produced by CI (if any). Jenkins copies credentials to `.env.local` before building.
# We copy it from the builder image so runtime `next start` can read it if needed.
COPY --from=builder /app/.env.local ./.env.local

# Copy necessary config files
COPY package.json next.config.mjs ./

# Expose frontend port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["node_modules/.bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]