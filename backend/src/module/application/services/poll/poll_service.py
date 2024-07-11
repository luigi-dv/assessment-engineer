#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from typing import List
from src.module.domain.entities.poll.poll_entity import Poll
from src.module.infrastructure.interfaces.poll.poll_repository import PollRepository


class PollService:

    def __init__(self):
        self.poll_repository = PollRepository()

    async def get_all_polls(self) -> List[Poll]:
        return await self.poll_repository.get_all()

    async def get_poll_by_id(self, poll_id: str) -> Poll:
        return await self.poll_repository.find_by_id(poll_id)

    async def create_poll(self, poll: Poll) -> Poll:
        return await self.poll_repository.create(poll)

    async def delete_poll(self, poll_id: str) -> bool:
        return await self.poll_repository.delete(poll_id)
