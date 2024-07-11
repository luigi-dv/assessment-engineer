#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from fastapi import FastAPI
from src.service_config import serviceConfig
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware


def get_application() -> FastAPI:
    # FastAPI
    app = __initialize_application()
    # OpenAPI
    app.openapi = __custom_openapi(app)
    return app


def __initialize_application() -> FastAPI:
    # FastAPI
    app = FastAPI(
        title=serviceConfig.SERVICE_NAME,
        description=serviceConfig.SERVICE_DESCRIPTION,
        version=serviceConfig.SERVICE_VERSION,
    )
    origins = [
        "http://localhost",
        "http://localhost:3000",
        serviceConfig.APP_CONSUMER_ORIGIN
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # Return FastAPI
    return app


# OpenAPI
def __custom_openapi(custom_app: FastAPI):
    def wrapper():
        if custom_app.openapi_schema:
            return custom_app.openapi_schema
        openapi_schema = get_openapi(
            title=custom_app.title,
            description=custom_app.description,
            version=custom_app.version,
            routes=custom_app.routes,
        )
        http_methods = ["post", "get", "put", "delete"]
        for method in openapi_schema["paths"]:
            for m in http_methods:
                try:
                    del openapi_schema["paths"][method][m]["responses"]["422"]
                except KeyError:
                    pass
        for schema in list(openapi_schema["components"]["schemas"]):
            if schema in ["HTTPValidationError", "ValidationError"]:
                del openapi_schema["components"]["schemas"][schema]
        custom_app.openapi_schema = openapi_schema
        return custom_app.openapi_schema

    return wrapper
