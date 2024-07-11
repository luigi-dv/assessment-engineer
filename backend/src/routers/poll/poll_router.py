#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from typing import List
from fastapi.routing import APIRouter
from src.module.domain.entities.poll.poll_entity import Poll
from src.module.application.services.poll.poll_service import PollService


class PollRouter:
    def __init__(self):
        self.router = APIRouter()
        self.poll_service = PollService()
        self.set_customized_router()

    def set_customized_router(self):
        @self.router.get("/polls", response_model=List[Poll])
        async def get_all_polls():
            return await self.poll_service.get_all_polls()

        @self.router.get("/polls/{poll_id}", response_model=Poll)
        async def get_poll_by_id(poll_id: str):
            return await self.poll_service.get_poll_by_id(poll_id)

        @self.router.post("/polls", response_model=Poll)
        async def create_poll(poll: Poll):
            return await self.poll_service.create_poll(poll)

        @self.router.delete("/polls/{poll_id}", response_model=bool)
        async def delete_poll(poll_id: str):
            return await self.poll_service.delete_poll(poll_id)

    @staticmethod
    def get_router():
        poll_router = PollRouter()
        return poll_router.router
