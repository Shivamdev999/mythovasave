# Production-ready static web server for Coolify / VPS Deployment
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website assets
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
