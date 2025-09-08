COMPOSE := $(shell command -v docker-compose || echo docker compose)
COMPOSE_FILE=compose.yml

.PHONY: help up down

help:
	@printf "Usage: make <command>\n"
	@grep -hE '^[a-z.A-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

up: ## Start all services
	$(COMPOSE) -f $(COMPOSE_FILE) up -d --build

down: ## Stop all services
	$(COMPOSE) -f $(COMPOSE_FILE) down --remove-orphans