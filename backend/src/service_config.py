#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from pydantic_settings import BaseSettings
from pydantic import Field, field_validator


class ServiceConfig(BaseSettings, object):
    # SERVICE
    SERVICE_NAME: str = Field(default="Default Title", env="SERVICE_NAME")
    SERVICE_DESCRIPTION: str = Field(
        default="Default Description",
        env="SERVICE_DESCRIPTION",
    )
    SERVICE_VERSION: str = Field(default="0.0.1", env="SERVICE_VERSION")
    # MONGODB
    MONGODB_INITDB_ROOT_HOST: str = Field(
        default="localhost", env="MONGODB_INITDB_ROOT_HOST"
    )
    MONGODB_INITDB_ROOT_PORT: int = Field(default=27017, env="MONGODB_INITDB_ROOT_PORT")
    MONGODB_INITDB_ROOT_USERNAME: str = Field(
        default="admin", env="MONGODB_INITDB_ROOT_USERNAME"
    )
    MONGODB_INITDB_ROOT_PASSWORD: str = Field(
        default="root", env="MONGODB_INITDB_ROOT_PASSWORD"
    )
    MONGODB_DATABASE_NAME: str = Field(
        default="my_database", env="MONGODB_DATABASE_NAME"
    )
    MONGO_INITDB_CONNECTION_STRING: str = ""
    # CORS
    APP_CONSUMER_ORIGIN: str = Field(default="http://localhost:3000", env="APP_CONSUMER_ORIGIN")

    @field_validator("MONGO_INITDB_CONNECTION_STRING", check_fields=True)
    def generate_mongo_connection_string(cls, v, values):
        mongodb_init_db_root_host = (
            values.data["MONGODB_INITDB_ROOT_HOST"]
            if "MONGODB_INITDB_ROOT_HOST" in values.data
            else None
        )
        mongodb_init_db_root_port = (
            values.data["MONGODB_INITDB_ROOT_PORT"]
            if "MONGODB_INITDB_ROOT_PORT" in values.data
            else None
        )
        mongodb_init_db_root_username = (
            values.data["MONGODB_INITDB_ROOT_USERNAME"]
            if "MONGODB_INITDB_ROOT_USERNAME" in values.data
            else None
        )
        mongodb_init_db_root_password = (
            values.data["MONGODB_INITDB_ROOT_PASSWORD"]
            if "MONGODB_INITDB_ROOT_PASSWORD" in values.data
            else None
        )

        if all(
            item is not None
            for item in [mongodb_init_db_root_username, mongodb_init_db_root_password]
        ):
            return f"mongodb://{mongodb_init_db_root_username}:{mongodb_init_db_root_password}@{mongodb_init_db_root_host}:{mongodb_init_db_root_port}/"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


serviceConfig = ServiceConfig()
