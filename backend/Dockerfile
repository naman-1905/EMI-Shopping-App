# Multi-stage build for Node.js backend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY app/package.json app/package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Final stage
FROM node:18-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=5000

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY app/ .

# Expose backend port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
