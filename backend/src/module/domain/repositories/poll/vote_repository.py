#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from abc import ABC, abstractmethod
from typing import List

from src.module.domain.entities.poll.vote_entity import Vote


class IVoteRepository(ABC):

    @abstractmethod
    async def get_all_by_poll(self, poll_id: str) -> List[Vote]:
        """
        Get all votes
        :param poll_id: The Poll id
        :return: The list of votes
        """
        pass

    @abstractmethod
    async def find_by_id(self, vote_id: str) -> Vote:
        """
        Find a vote by its id
        :param vote_id: The Vote id
        :return: The Vote
        """
        pass

    @abstractmethod
    async def create(self, vote: Vote) -> Vote:
        """
        Create a new vote
        :param vote: The poll to create
        :return: The created vote
        """
        pass

    @abstractmethod
    async def delete(self, vote_id: str) -> bool:
        """
        Delete a vote
        :param vote_id: The vote id
        :return:
        """
        pass
