#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from pymongo import MongoClient
from src.service_config import serviceConfig


class DatabaseContext:
    def __init__(self):
        self.client = MongoClient(serviceConfig.MONGO_INITDB_CONNECTION_STRING,  uuidRepresentation='standard')
        self.database = self.client[serviceConfig.MONGODB_DATABASE_NAME]

    def get_client(self):
        return self.client

    def get_database(self):
        return self.database


if __name__ == "__main__":
    db_client = DatabaseContext()
    main_database = db_client.get_database()
