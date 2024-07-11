#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from typing import List
from fastapi.routing import APIRouter
from src.module.domain.entities.poll.option_entity import Option
from src.module.application.services.poll.option_service import OptionService


class OptionRouter:
    def __init__(self):
        self.router = APIRouter()
        self.option_service = OptionService()
        self.set_customized_router()

    def set_customized_router(self):
        @self.router.get("/options/poll/{poll_id}", response_model=List[Option])
        async def get_options_by_poll(poll_id: str):
            return await self.option_service.get_options_by_poll(poll_id)

        @self.router.get("/options/{option_id}", response_model=Option)
        async def get_option_by_id(option_id: str):
            return await self.option_service.get_option_by_id(option_id)

        @self.router.post("/options", response_model=Option)
        async def create_option(option: Option):
            return await self.option_service.create_option(option)

        @self.router.delete("/options/{option_id}", response_model=bool)
        async def delete_option(option_id: str):
            return await self.option_service.delete_option(option_id)

    @staticmethod
    def get_router():
        option_router = OptionRouter()
        return option_router.router
