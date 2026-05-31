# ==========================================
# STAGE 1: Build TypeScript Code
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root and package configuration files
COPY package*.json ./
COPY tsconfig*.json ./

# Install absolute devDependencies
RUN npm ci

# Copy full monorepo source files
COPY . .

# Compile TypeScript to JavaScript distribution folder
RUN npm run build --workspace=services/express-api

# ==========================================
# STAGE 2: Run Production Service
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /app

# Enforce environment mode to production
ENV NODE_ENV=production

# Copy built artifacts from Stage 1
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript distribution
COPY --from=builder /app/services/express-api/dist ./dist

# Expose standard PORT environment variable
EXPOSE 5000

# Execute server bootstrapper script
CMD ["node", "dist/server.js"]
