#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "luigelo@ldvloper.com"

from abc import ABC, abstractmethod
from typing import List

from src.module.domain.entities.poll.poll_entity import Poll


class IPollRepository(ABC):

    @abstractmethod
    async def get_all(self) -> List[Poll]:
        """
        Get all polls
        :return: The list of polls
        """
        pass

    @abstractmethod
    async def find_by_id(self, poll_id: str) -> Poll:
        """
        Find a poll by its id
        :param poll_id: The Poll id
        :return: The poll
        """
        pass

    @abstractmethod
    async def create(self, poll: Poll) -> Poll:
        """
        Create a new poll
        :param poll: The poll to create
        :return: The created poll
        """
        pass

    @abstractmethod
    async def delete(self, poll_id: str) -> bool:
        """
        Delete a poll
        :param poll_id: The poll id
        :return:
        """
        pass
