# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm i
COPY . .
RUN npm run build

# ---- Run stage ----
FROM node:20-alpine
WORKDIR /app
# copy built static files + server + package manifests
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY server.mjs ./
# install only runtime deps
RUN npm ci --omit=dev || npm i --omit=dev
ENV PORT=8080
ENV VERTEX_LOCATION=us-east4
# change model here if you like:
ENV GEMINI_MODEL=gemini-1.5-flash-002
EXPOSE 8080
CMD ["node", "server.mjs"]
