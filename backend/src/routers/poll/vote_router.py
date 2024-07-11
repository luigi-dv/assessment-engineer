#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"


from typing import List
from fastapi.routing import APIRouter
from src.module.domain.entities.poll.vote_entity import Vote
from src.module.application.services.poll.vote_service import VoteService


class VoteRouter:
    def __init__(self):
        self.router = APIRouter()
        self.vote_service = VoteService()
        self.set_customized_router()

    def set_customized_router(self):
        @self.router.get("/votes/poll/{poll_id}", response_model=List[Vote])
        async def get_votes_by_poll(poll_id: str):
            return await self.vote_service.get_votes_by_poll(poll_id)

        @self.router.get("/votes/{vote_id}", response_model=Vote)
        async def get_vote_by_id(vote_id: str):
            return await self.vote_service.get_vote_by_id(vote_id)

        @self.router.post("/votes", response_model=Vote)
        async def create_vote(vote: Vote):
            return await self.vote_service.create_vote(vote)

        @self.router.delete("/votes/{vote_id}", response_model=bool)
        async def delete_vote(vote_id: str):
            return await self.vote_service.delete_vote(vote_id)

    @staticmethod
    def get_router():
        vote_router = VoteRouter()
        return vote_router.router
