#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

"""
    Global Modules
"""
from fastapi import APIRouter, HTTPException

"""
    Routes modules
"""
from src.routers.poll.poll_router import PollRouter
from src.routers.poll.vote_router import VoteRouter
from src.routers.poll.option_router import OptionRouter

"""
    Initialize the Router
"""
router = APIRouter()


@router.get("/")
async def root():
    raise HTTPException(status_code=200, detail="The API is alive")


"""
    Poll Routes
"""
router.include_router(PollRouter.get_router(), prefix="/api/v1", tags=["Polls"])
router.include_router(VoteRouter.get_router(), prefix="/api/v1", tags=["Votes"])
router.include_router(OptionRouter.get_router(), prefix="/api/v1", tags=["Options"])
